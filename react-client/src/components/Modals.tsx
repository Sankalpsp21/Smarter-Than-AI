import {
  Card,
  Flex,
  TextField,
  PasswordField,
  Text,
  Table,
  TableCell,
  TableRow,
} from "@aws-amplify/ui-react";
import { ToggleButton, SubmitButton } from "./Buttons";
import { LoginCard, PinkCard } from "./Cards";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Auth, DataStore, Hub } from "aws-amplify";
import {
  setIsLoggedIn,
  setUserPersistedDataID,
  selectIsLoggedIn,
  selectUserPersistedDataID,
  setUserSessionID,
} from "../redux/GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { UserPersistedData, UserSession } from "../models";

export type StatData = {
  totalScore: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
};

interface ModalProps {
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface StatsProps {
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickSignout?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  // data: StatData;
}

export function Login({ style }: ModalProps) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/account", { state: "Stats" });
    }
  }, []);

  return (
    <>
      <Card
        backgroundColor="#FCFAFD"
        borderRadius="12px"
        color="black"
        padding="5vh"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        style={style}
      >
        <Flex justifyContent="center" marginBottom="5vh">
          <LoginCard />
        </Flex>
        <Card
          backgroundColor="ffffff"
          borderRadius="12px"
          color="black"
          padding="1em"
          boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
          paddingLeft="5vw"
          paddingRight="5vw"
          paddingTop="5vh"
          paddingBottom="5vh"
        >
          <Flex direction="column" gap="1.5">
            <ToggleButton
              color="#FF6DDF"
              onClick={(e) => {
                e.preventDefault();
                navigate("/account", { state: "SignIn" });
              }}
            >
              Sign In
            </ToggleButton>
            <ToggleButton
              color="#62A1FF"
              onClick={(e) => {
                e.preventDefault();
                navigate("/account", { state: "SignUp" });
              }}
            >
              Sign Up
            </ToggleButton>
          </Flex>
        </Card>
      </Card>
    </>
  );
}

export function SignIn({ style }: ModalProps) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isEmailValid(email: string): boolean {
    return emailRegex.test(email);
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    console.log("email", email);
    console.log("password", password);

    if (email.length == 0 || !isEmailValid(email)) {
      alert("Please enter a valid email address");
      return;
    } else if (password.length < 8) {
      alert("Enter a password with at least 8 characters");
      return;
    }

    try {
      const user = await Auth.signIn(email, password);
      console.log("user", user);

      // get user with username
      const retUser = await DataStore.query(UserPersistedData, (g) =>
        g.username.eq(email)
      );

      let currentUserData = retUser[0];

      // if user does not exist, create new user
      if (retUser.length == 0) {
        console.log("user does not exist");
        // create/update user with username
        currentUserData = await DataStore.save(
          new UserPersistedData({
            username: email,
            totalScore: 0,
            totalGames: 0,
            wins: 0,
            losses: 0,
            rank: 0,
          })
        );
      }
      console.log(currentUserData);

      dispatch(setUserPersistedDataID(currentUserData.id));
      dispatch(setIsLoggedIn(true));

      // clear datastore
      await DataStore.clear();

      // start syncing
      await DataStore.start();

      // wait 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // redirect to stats page
      navigate("/account", { state: "Stats" });
      // refresh page
      window.location.reload();
    } catch (error) {
      console.log("error signing in", error);
      alert(error);
    }
  };

  return (
    <>
      <Card
        backgroundColor="#FCFAFD"
        borderRadius="12px"
        color="black"
        padding="5vh"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        style={style}
      >
        <Flex justifyContent="center" marginBottom="5vh">
          <LoginCard />
        </Flex>
        <Card
          backgroundColor="ffffff"
          borderRadius="12px"
          color="black"
          padding="1em"
          boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
          paddingLeft="5vw"
          paddingRight="5vw"
          paddingTop="5vh"
          paddingBottom="5vh"
        >
          <Flex as="form" direction="column" gap="1.5">
            <TextField
              placeholder="Enter your email"
              label="Email"
              fontWeight="500"
              isRequired={true}
              inputStyles={{ color: "black" }}
              onChange={handleEmailChange}
            />
            <PasswordField
              autoComplete="current-password"
              isRequired={true}
              label="Password"
              name="password"
              fontWeight="500"
              placeholder="Enter your password"
              inputStyles={{ color: "black" }}
              onChange={handlePasswordChange}
            />

            <SubmitButton color="#FF6DDF" onClick={submit}>
              Sign In
            </SubmitButton>
          </Flex>
        </Card>
      </Card>
    </>
  );
}

export function SignUp({ style }: ModalProps) {
  const navigate = useNavigate();
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  function isEmailValid(email: string): boolean {
    return emailRegex.test(email);
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    console.log("email", email);
    console.log("password", password);

    if (email.length == 0 || !isEmailValid(email)) {
      alert("Please enter a valid email address");
      return;
    } else if (password.length < 8) {
      alert("Enter a password with at least 8 characters");
      return;
    }

    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);

      // show confirmation code page
      setIsVerifying(true);
    } catch (error) {
      console.log("error signing in", error);
      alert(error);
    }
  };

  return (
    <>
      {!isVerifying ? (
        <>
          <Card
            backgroundColor="#FCFAFD"
            borderRadius="12px"
            color="black"
            padding="5vh"
            boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
            style={style}
          >
            <Flex justifyContent="center" marginBottom="5vh">
              <LoginCard />
            </Flex>
            <Card
              backgroundColor="ffffff"
              borderRadius="12px"
              color="black"
              padding="1em"
              boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
              paddingLeft="5vw"
              paddingRight="5vw"
              paddingTop="5vh"
              paddingBottom="5vh"
            >
              <Flex as="form" direction="column" gap="1.5">
                <TextField
                  placeholder="Enter your email"
                  label="Email"
                  fontWeight="500"
                  isRequired={true}
                  inputStyles={{ color: "black" }}
                  onChange={handleEmailChange}
                />
                <PasswordField
                  autoComplete="new-password"
                  isRequired={true}
                  label="Password"
                  name="password"
                  fontWeight="500"
                  placeholder="Enter your password"
                  inputStyles={{ color: "black" }}
                  onChange={handlePasswordChange}
                />
                <SubmitButton color="#FF6DDF" onClick={submit}>
                  Sign Up
                </SubmitButton>
              </Flex>
            </Card>
          </Card>
        </>
      ) : (
        <Verification email={email} />
      )}
    </>
  );
}

export function Exit({ style }: ModalProps) {
  return (
    <>
      <Card
        backgroundColor="ffffff"
        borderRadius="12px"
        color="black"
        padding="1em"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        paddingLeft="5vw"
        paddingRight="5vw"
        paddingTop="5vh"
        paddingBottom="5vh"
      >
        <Text
          textAlign="center"
          fontSize="1.5em"
          color="black"
          fontWeight="500"
          padding="3vh"
        >
          Do you really want to exit?
        </Text>
        <Flex direction="row" gap="1.5" justifyContent="center">
          <ToggleButton color="#FF6DDF">Yes</ToggleButton>
          <ToggleButton color="#62A1FF">Cancel</ToggleButton>
        </Flex>
      </Card>
    </>
  );
}

export function Stats({ style, onClick, onClickSignout }: StatsProps) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<StatData>({
    totalScore: 0,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
  });
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userPersistedDataID = useSelector(selectUserPersistedDataID);
  const userSessionID = useSelector(setUserSessionID);

  const handleCloseBtn = (e: any) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSignOut = async (e: any) => {
    e.preventDefault();

    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }

    dispatch(setUserPersistedDataID(""));
    dispatch(setIsLoggedIn(false));

    // set userPersistedDataID to null for user
    if (userSessionID != null) {
      const user = await DataStore.query(UserSession, userPersistedDataID);
      if (user) {
        await DataStore.save(
          UserSession.copyOf(user, (updated) => {
            updated.userPersistedDataID = null;
          })
        );
      }
    }

    // clear datastore
    await DataStore.clear();

    // start syncing
    await DataStore.start();

    // wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    navigate("/");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/account", { state: "SignIn" });
      window.location.reload();
    }

    const init = async () => {
      const user = await Auth.currentAuthenticatedUser();
      if (!user) return;

      // set stats
      const userPersistedData = await DataStore.query(
        UserPersistedData,
        userPersistedDataID
      );
      if (!userPersistedData) return;

      setData({
        totalScore: userPersistedData.totalScore,
        gamesPlayed: userPersistedData.totalGames,
        wins: userPersistedData.wins,
        losses: userPersistedData.losses,
      });
    };
    init();
  }, []);

  return (
    <>
      <Card
        backgroundColor="#FCFAFD"
        borderRadius="12px"
        color="black"
        padding="5vh"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        style={style}
      >
        <Flex justifyContent="center" marginBottom="2vh" direction="column">
          <PinkCard style={{ width: "50%", alignSelf: "center" }}>
            Stats
          </PinkCard>
          <LoginCard />
          <Text
            color={"#979797"}
            fontWeight={"500"}
            textDecoration={"underline"}
            style={{ cursor: "pointer" }}
            textAlign={"center"}
            onClick={handleSignOut}
          >
            Sign Out
          </Text>
        </Flex>
        <Card
          backgroundColor="ffffff"
          borderRadius="12px"
          color="black"
          padding="1em"
          boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
          paddingLeft="5vw"
          paddingRight="5vw"
          paddingTop="5vh"
          paddingBottom="5vh"
        >
          <Flex direction="column">
            <Flex direction="row" justifyContent="center">
              <Text color="#000000" fontWeight="500">
                Total Score:
              </Text>
              <Text color="#000000" fontWeight="500">
                {data.totalScore}
              </Text>
            </Flex>
            <Flex direction="row" justifyContent="center">
              <Text color="#000000" fontWeight="500">
                Games Played:
              </Text>
              <Text color="#000000" fontWeight="500">
                {data.gamesPlayed}
              </Text>
            </Flex>
            <Flex direction="row" justifyContent="center">
              <Text color="#000000" fontWeight="500">
                Wins:
              </Text>
              <Text color="#000000" fontWeight="500">
                {data.wins}
              </Text>
            </Flex>
            <Flex direction="row" justifyContent="center">
              <Text color="#000000" fontWeight="500">
                Losses:
              </Text>
              <Text color="#000000" fontWeight="500">
                {data.losses}
              </Text>
            </Flex>

            <ToggleButton color="#62A1FF" onClick={handleCloseBtn}>
              Close
            </ToggleButton>
          </Flex>
        </Card>
      </Card>
    </>
  );
}

export function Verification({
  style,
  onClick,
  email,
}: ModalProps & { email: string }) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [code, setCode] = useState("");

  useEffect(() => {
    console.log("email", email);

    const init = async () => {
      Hub.listen("auth", async ({ payload }) => {
        const { event } = payload;
        if (event === "autoSignIn") {
          console.log("autoSignIn");

          const user = payload.data;

          // get user with username
          const retUser = await DataStore.query(UserPersistedData, (g) =>
            g.username.eq(email)
          );

          let currentUserData = retUser[0];

          // if user does not exist, create new user
          if (retUser.length == 0) {
            console.log("user does not exist");
            // create/update user with username
            currentUserData = await DataStore.save(
              new UserPersistedData({
                username: email,
                totalScore: 0,
                totalGames: 0,
                wins: 0,
                losses: 0,
                rank: 0,
              })
            );
          }
          console.log(currentUserData);

          dispatch(setUserPersistedDataID(currentUserData.id));
          dispatch(setIsLoggedIn(true));

          // clear datastore
          await DataStore.clear();

          // start syncing
          await DataStore.start();

          // wait 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // redirect to stats page
          navigate("/account", { state: "Stats" });
          // refresh page
          window.location.reload();
        } else if (event === "autoSignIn_failure") {
          console.log("autoSignIn_failure");

          // redirect to sign in page
          navigate("/account", { state: "SignIn" });
          // refresh page
          window.location.reload();
        }
      });
    };
    init();
  }, []);

  const handleCodeChange = (e: any) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (code.length == 0) {
      alert("Please enter a valid verification code");
      return;
    }

    try {
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      console.log("error confirming sign up", error);
      alert(error);
    }
  };

  const resetConfirmationCode = async (e: any) => {
    e.preventDefault();

    try {
      await Auth.resendSignUp(email);
      console.log("code resent successfully");
      alert("Code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
      alert(err);
    }
  };

  return (
    <>
      <Card
        backgroundColor="#FCFAFD"
        borderRadius="12px"
        color="black"
        padding="5vh"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        style={style}
      >
        <Card
          backgroundColor="ffffff"
          borderRadius="12px"
          color="black"
          padding="1em"
          boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
          paddingLeft="5vw"
          paddingRight="5vw"
          paddingTop="5vh"
          paddingBottom="5vh"
        >
          <Flex as="form" direction="column" gap="1.5">
            <TextField
              placeholder="Enter your code"
              label="Verification"
              fontWeight="500"
              isRequired={true}
              inputStyles={{ color: "black" }}
              onChange={handleCodeChange}
            />

            <Flex direction={"row"}>
              <Text
                color={"#979797"}
                fontWeight={"500"}
                style={{ cursor: "default" }}
                textAlign={"center"}
                fontSize={"0.8em"}
              >
                Have you missed the code?
              </Text>
              <Text
                color={"#979797"}
                fontWeight={"500"}
                textDecoration={"underline"}
                style={{ cursor: "pointer" }}
                textAlign={"center"}
                onClick={resetConfirmationCode}
                fontSize={"0.8em"}
              >
                Resend Code
              </Text>
            </Flex>

            <SubmitButton color="#FF6DDF" onClick={handleSubmit}>
              Submit
            </SubmitButton>
          </Flex>
        </Card>
      </Card>
    </>
  );
}

export function Help({ style, onClick }: ModalProps) {
  return (
    <>
      <Card
        backgroundColor="#FCFAFD"
        borderRadius="12px"
        color="black"
        padding="5vh"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        style={style}
        minWidth={"500px"}
        width="45vw"
      >
        <Text color={"#000000"} fontSize="1.5em" fontWeight="800">
          What is 'Are you smarter than AI?'
        </Text>
        <Text color={"#000000"} fontSize="1em" fontWeight="400">
          <strong>Are you smarter than AI?</strong> is a web-based multiplayer
          game application.
          <br />
          <br />
          The host needs to create the game room &#40;the host cannot
          participate in the game&#41;. Once at least 2 players joined, the host
          can start their game.
          <br />
          <br />
          After the game starts, a random prompt will come out. The players
          including an AI player will answer the prompt.
          <br />
          <br />
          Your mission is to figure out which answer is generated by AI. If you
          find the AI, you can get 100 points. Otherwise, you will lose the same
          amount of points &#40;100&#41;.
          <br />
          <br />
        </Text>
        <Flex direction={"row"} justifyContent={"center"}>
          <ToggleButton
            color="#FF6DDF"
            style={{ alignSelf: "center" }}
            onClick={onClick}
          >
            Got it!
          </ToggleButton>
        </Flex>
      </Card>
    </>
  );
}

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
import { useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { setIsLoggedIn, setUserPersistedDataID } from "../redux/GameSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { UserPersistedData } from "../models";

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
  data: StatData;
}

export function Login({ style }: ModalProps) {
  const navigate = useNavigate();
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
    } else if (password.length < 8) {
      alert("Enter a password with at least 8 characters");
    }

    try {
      const user = await Auth.signIn(email, password);
      console.log("user", user);

      // get user with username
      const retUser = await DataStore.query(UserPersistedData, (g) =>
        g.username.eq(email)
      );

      dispatch(setUserPersistedDataID(retUser[0].id));
      dispatch(setIsLoggedIn(true));

      // const user = await Auth.currentAuthenticatedUser();

      // TODO: redirect to stats page
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
    } else if (password.length < 8) {
      alert("Enter a password with at least 8 characters");
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

      // TODO: redirect to confirmation code page
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

export function Stats({ style, data, onClick, onClickSignout }: StatsProps) {
  const navigate = useNavigate();
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
            onClick={onClickSignout}
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

            <ToggleButton color="#62A1FF" onClick={onClick}>
              Close
            </ToggleButton>
          </Flex>
        </Card>
      </Card>
    </>
  );
}

export function Verification({ style, onClick }: ModalProps) {
  const navigate = useNavigate();
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
            />

            <SubmitButton color="#FF6DDF" onClick={() => {}}>
              Submit
            </SubmitButton>
          </Flex>
        </Card>
      </Card>
    </>
  );
}

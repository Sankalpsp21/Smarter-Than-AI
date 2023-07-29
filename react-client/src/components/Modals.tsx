import {
  Card,
  Flex,
  TextField,
  PasswordField,
  Text,
} from "@aws-amplify/ui-react";
import { ToggleButton, SubmitButton } from "./Buttons";
import { LoginCard } from "./Cards";
import "../index.css";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  style?: React.CSSProperties;
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
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isEmailValid(email: string): boolean {
    return emailRegex.test(email);
  }

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
            />
            <PasswordField
              autoComplete="current-password"
              isRequired={true}
              label="Password"
              name="password"
              fontWeight="500"
              placeholder="Enter your password"
              inputStyles={{ color: "black" }}
            />

            <SubmitButton
              color="#FF6DDF"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
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
            />
            <PasswordField
              autoComplete="new-password"
              isRequired={true}
              label="Password"
              name="password"
              fontWeight="500"
              placeholder="Enter your password"
              inputStyles={{ color: "black" }}
            />
            <SubmitButton
              color="#FF6DDF"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
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

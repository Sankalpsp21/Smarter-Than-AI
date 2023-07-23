import LoadingSpinner from "../components/LoadingSpinner";
import { Text } from "@aws-amplify/ui-react";

export function Waiting() {
  return (
    <>
      <Text
        marginBottom="1em"
        fontSize="1.2em"
        fontWeight="500"
        alignSelf="center"
      >
        Waiting for Host to Start...
      </Text>
      <Text
        marginBottom="2em"
        fontStyle="normal"
        textDecoration="none"
        alignSelf="center"
      >
        Players joined: currentPlayerNum
      </Text>
    </>
  );
}

export function Generating() {
  return (
    <>
      <Text
        marginBottom="3em"
        fontSize="1.2em"
        fontWeight="500"
        alignSelf="center"
      >
        Generating Prompt...
      </Text>
    </>
  );
}

const Lobby = () => {
  return (
    <>
      <h1>ARE YOU SMARTER THAN AN AI?</h1>
      <LoadingSpinner />
    </>
  );
};

export default Lobby;

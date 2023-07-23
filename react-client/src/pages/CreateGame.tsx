import { Button, Text, Flex } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { GameSession } from "../models";
import { ToggleButton } from "../components/Buttons";

const CreateGame = () => {
  const [currentPlayerNum, setCurrentPlayerNum] = useState(0);
  const [pinCode, setPinCode] = useState(0);
  useEffect(() => {
    const test = async () => {
      try {
        // get all game sessions
        const gameSessions = await DataStore.query(GameSession);
        setCurrentPlayerNum(gameSessions[0].playerCount);
        setPinCode(gameSessions[0].pinCode);
      } catch (error) {
        console.error(error);
      }
    };
    test();
  }, []);

  return (
    <>
      <Button>Profile</Button>
      <div>Tell your friends to join this pin code</div>
      <Flex direction="row">
        <Text fontStyle="normal" textDecoration="none" alignSelf="center">
          {pinCode}
        </Text>
        <Button>Copy</Button>
      </Flex>
      <Text fontStyle="normal" textDecoration="none" alignSelf="center">
        Players joined: {currentPlayerNum}
      </Text>
      <ToggleButton color="#FF6DDF">Start Game</ToggleButton>
    </>
  );
};

export default CreateGame;

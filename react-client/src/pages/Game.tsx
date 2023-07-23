import { Button, Text, TextField, Flex } from "@aws-amplify/ui-react";
import { ToggleButton } from "../components/Buttons";
import { PromptCard, PinkCard } from "../components/Cards";
import GameNavbar from "../components/GameNavbar";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { GameSession } from "../models";

export function PromptGame() {
  const [currentResponededPlayer, setCurrentResponededPlayer] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const gameSessions = await DataStore.query(GameSession);
        setCurrentResponededPlayer(gameSessions[0].playerCount);
        setCurrentResponededPlayer(gameSessions[0].playersResponded);
        setCurrentRound(gameSessions[0].roundNumber);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Text
        variation="primary"
        as="p"
        lineHeight="1.5em"
        fontWeight={500}
        fontSize="1em"
        fontStyle="normal"
        textDecoration="none"
      >
        Players responded ({currentResponededPlayer}/5)
      </Text>
      <PinkCard>Round {currentRound} Prompt</PinkCard>
      <PromptCard>This is a round 1 question</PromptCard>
      <Flex direction="row" justifyContent="center">
        <TextField
          label="Answer"
          labelHidden
          placeholder="Enter your response"
          width="35vw"
          backgroundColor={"transparent"}
          alignSelf={"center"}
          boxShadow={"rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"}
          inputStyles={{
            color: "#000000",
            backgroundColor: "#ffffff",
            border: "none",
            borderRadius: "10px",
          }}
        ></TextField>
        <ToggleButton color="#FF6DDF">Submit</ToggleButton>
      </Flex>
    </>
  );
}

const Game = () => {
  return (
    <>
      <div style={{ width: "100%", position: "fixed", top: "0" }}>
        <GameNavbar />
      </div>
      <PromptGame />
    </>
  );
};

export default Game;

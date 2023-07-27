import React from "react";
import { Button, Text, TextField, Flex } from "@aws-amplify/ui-react";
import { SubmitButton, ToggleButton } from "../components/Buttons";
import { PromptCard, PinkCard, VoteCard } from "../components/Cards";
import GameNavbar from "../components/GameNavbar";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { GameSession, RoundMode, UserSession } from "../models";
import { useSelector } from "react-redux";
import { selectIsHost, selectGameSessionID } from "../redux/GameSlice";
import { useNavigate } from "react-router-dom";

export function Vote() {
  // get values from redux
  const isHost = useSelector(selectIsHost);
  const gameSessionID = useSelector(selectGameSessionID);

  const navigate = useNavigate();

  // For state management
  const [currentResponededPlayer, setCurrentResponededPlayer] = useState(0);
  const [currentRoundNumber, setCurrentRoundNumber] = useState(0);

  const getUserSession = async (gameSessionID: string) => {
    try {
      const userSessions = await DataStore.query(UserSession, (user) =>
        user.gameSessionID.eq(gameSessionID)
      );

      if (userSessions.length === 0) return null;
      return userSessions;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const checkOnlyOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const checkboxes = Array.from(
      document.getElementsByName("vote")
    ) as HTMLInputElement[];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== target) {
        checkboxes[i].checked = false;
        console.log(checkboxes[i]);
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        // Get gameSession data by gameSessionID
        const gameSession = await DataStore.query(GameSession, gameSessionID);

        // Prevent the case when gameSession is undefined
        if (!gameSession) return;

        setCurrentResponededPlayer(gameSession.playersResponded);
        setCurrentRoundNumber(gameSession.roundNumber);

        const subscription = DataStore.observe(
          GameSession,
          gameSessionID
        ).subscribe(async (msg: any) => {
          const item = msg.element;
          console.log(item);

          // If RoundMode is MESSAGE
          if (item.roundMode === RoundMode.PROMPT) {
            navigate("/message", { state: "MESSAGE" });
            let users = await getUserSession(gameSessionID);

            if (users) {
              let randomNum = Math.random() * users.length;

              // Update user's data
              await DataStore.save(
                UserSession.copyOf(users[randomNum], (updated) => {
                  updated.losses += 1;
                  updated.totalScore -= 100;
                  updated.eliminated = true;
                })
              );
            }
          }

          // If RoundMode is WIN
          if (item.roundMode === RoundMode.WIN) {
            navigate("/message", { state: "WIN" });
          }
          // If RoundMode is LOSE (When the case is; playerNum === 2)
          else {
            navigate("/message", { state: "LOSE" });
          }
        });

        // if RoundMode is PROMPT i.e. the game is not ended
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
        style={{ position: "fixed", top: "5vh", cursor: "default" }}
      >
        Players responded ({currentResponededPlayer}/5)
      </Text>
      <PinkCard style={{ position: "fixed", top: "10vh", cursor: "default" }}>
        Round {currentRoundNumber} Voting
      </PinkCard>
      <Flex
        as={"form"}
        id={"vote-form"}
        direction={"column"}
        gap={"0.5em"}
        width={"100%"}
        height={"60vh"}
        alignItems={"center"}
        position={"fixed"}
        bottom={"15vh"}
        overflow={"auto"}
        style={{ overflowX: "hidden" }}
      >
        <VoteCard
          label="something Something"
          onChange={(e) => checkOnlyOne(e)}
        />
        <VoteCard
          label="something Something"
          onChange={(e) => checkOnlyOne(e)}
        />
        <VoteCard label="something Something" />
        <VoteCard label="something Something" />
        <VoteCard label="something Something" />
        <VoteCard label="something Something" />
        <VoteCard label="something Something" />
        <VoteCard label="something Something" />
        <VoteCard label="something Something" />
        <VoteCard label="something Something" />
      </Flex>
      <SubmitButton
        color="#FF6DDF"
        form="vote-form"
        style={{ position: "fixed", bottom: "4vh" }}
      >
        Submit
      </SubmitButton>
    </>
  );
}

const Game = () => {
  return (
    <>
      <div style={{ width: "100%", position: "fixed", top: "0" }}>
        <GameNavbar />
      </div>
      <Vote />
    </>
  );
};

export default Game;

import { TextField, Text } from "@aws-amplify/ui-react";
import { ToggleButton } from "../components/Buttons";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { GameSession, UserSession } from "../models";
import { LoginButton } from "../components/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserSessionID,
  setUserSessionID,
  setGameSessionID,
} from "../redux/GameSlice";
import { AppDispatch } from "../redux/store";

const JoinGame = () => {
  const dispatch: AppDispatch = useDispatch();
  const userSessionID = useSelector(selectUserSessionID);
  const [pinCode, setPinCode] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {}, []);

  const getGameSession = async (pinCode: number) => {
    try {
      // get all game sessions
      const gameSession = await DataStore.query(GameSession, (c) =>
        c.and((c) => [c.pinCode.eq(pinCode)])
      );
      if (gameSession.length === 0) return null;
      return gameSession[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handlePinCodeChange = (e: any) => {
    const pinCode = parseInt(e.target.value.trim(), 10);
    setPinCode(pinCode);
  };

  const handleJoinBtn = async () => {
    console.log(pinCode);
    const gameSession = await getGameSession(pinCode);
    console.log(gameSession);

    if (gameSession == null || gameSession.roundNumber > 0) {
      setError("Invalid pin code or game session has already started");
      return;
    }

    dispatch(setGameSessionID(gameSession.id));

    // TODO: check redux store for user. For now just assuming user is new and needs to be created
    try {
      if (userSessionID === "") {
        const user = await DataStore.save(
          new UserSession({
            eliminated: false,
            currentRoundResponse: "",
            totalScore: 0,
            totalGames: 0,
            wins: 0,
            losses: 0,
            gameSessionID: gameSession.id,
          })
        );

        dispatch(setUserSessionID(user.id));
      } else {
        const user = await DataStore.query(UserSession, userSessionID);

        if (user == null) {
          return;
        }

        await DataStore.save(
          UserSession.copyOf(user, (updated) => {
            updated.eliminated = false;
            updated.currentRoundResponse = "";
            updated.gameSessionID = gameSession.id;
          })
        );
      }

      // update GameSession playerCount by 1
      await DataStore.save(
        GameSession.copyOf(gameSession, (updated) => {
          updated.playerCount = gameSession.playerCount + 1;
        })
      );

      // go to waiting room
      // window.location.href = `/wait`;
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <>
      <LoginButton color="#000000" />
      <h1>ARE YOU SMARTER THAN AN AI?</h1>
      <div>Enter pin code to join</div>
      <TextField
        size="default"
        placeholder="Pin code..."
        onChange={handlePinCodeChange}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <ToggleButton color="#62A1FF" onClick={handleJoinBtn}>
        Join
      </ToggleButton>
    </>
  );
};

export default JoinGame;

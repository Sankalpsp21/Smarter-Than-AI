import { Text } from "@aws-amplify/ui-react";
import GameNavbar from "../components/GameNavbar";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameSession, RoundMode, UserSession } from "../models";
import { useSelector } from "react-redux";
import { selectIsHost, selectGameSessionID } from "../redux/GameSlice";

export function Message() {
  const isHost = useSelector(selectIsHost);
  const gameSessionID = useSelector(selectGameSessionID);
  const navigate = useNavigate();

  const messageSet = {
    WIN: "An AI has been deported....",
    MESSAGE: "A human has been deported....",
    LOSE: "You have been deported....",
  };

  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      // Get a gameSession data
      const gameSession = await DataStore.query(GameSession, gameSessionID);

      // HOST
      if (isHost) {
        if (gameSession == null) {
          return;
        }

        await DataStore.save(
          GameSession.copyOf(gameSession, (item) => {
            item.roundNumber = gameSession.roundNumber + 1;
            item.roundMode = RoundMode.PROMPT;
          })
        );

        setMessage(messageSet.MESSAGE);
        // delay for 10 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000));
        navigate("/prompt");
      }
      // NOT HOST
      else {
        const subscription = DataStore.observe(
          GameSession,
          gameSessionID
        ).subscribe(async (msg: any) => {
          const item = msg.element;
          console.log(item);

          // if RoundMode is PROMPT i.e. the game is not ended
          if (item.roundMode === RoundMode.PROMPT) {
            navigate("/prompt");
          }

          // // If RoundMode is WIN
          // if (item.roundMode === RoundMode.WIN) {
          // 	setMessage(messageSet.WIN);

          // 	try {
          // 		// Get all userSession data of the users who are not eliminated
          // 		const users = await DataStore.query(
          // 			UserSession,
          // 			(user) => user.eliminated.eq(false)
          // 		);

          // 		// Update user's data
          // 		const updatedUsers = users.map((user) => {
          // 			return UserSession.copyOf(user, (updated) => {
          // 				updated.totalScore += 100;
          // 				updated.wins += 1;
          // 			});
          // 		});

          // 		// Save the updated users
          // 		await DataStore.save(updatedUsers);
          // 	} catch (err) {
          // 		console.log('ERROR: ', err);
          // 	}

          // 	// delay for 5 seconds
          // 	await new Promise((resolve) =>
          // 		setTimeout(resolve, 5000)
          // 	);
          // 	navigate('/result', { state: 'WIN' });
          // }
          // // If RoundMode is LOSE (When the case is; playerNum === 2)
          // else {
          // 	setMessage(messageSet.LOSE);
          // 	try {
          // 		// Get all userSession data of the users who are not eliminated (It would be one person)
          // 		const users = await DataStore.query(
          // 			UserSession,
          // 			(user) => user.eliminated.eq(false)
          // 		);

          // 		// Update user's data
          // 		const updatedUsers = users.map((user) => {
          // 			return UserSession.copyOf(user, (updated) => {
          // 				updated.totalScore -= 100;
          // 				updated.losses += 1;
          // 			});
          // 		});

          // 		// Save the updated users
          // 		await DataStore.save(updatedUsers);
          // 	} catch (err) {
          // 		console.log('ERROR: ', err);
          // 	}

          // 	// delay for 5 seconds
          // 	await new Promise((resolve) =>
          // 		setTimeout(resolve, 5000)
          // 	);
          // 	navigate('/result', { state: 'LOSE' });
          // }
        });
        console.log(subscription);
      }
    };
    try {
      init();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Text
        variation="primary"
        as="p"
        lineHeight="1.5em"
        fontWeight={500}
        fontSize="2em"
        fontStyle="normal"
        textDecoration="none"
        style={{ cursor: "default" }}
      >
        {message}
      </Text>
    </>
  );
}

const Game = () => {
  return (
    <>
      <div style={{ width: "100%", position: "fixed", top: "0" }}>
        <GameNavbar />
      </div>
      <Message />
    </>
  );
};

export default Game;

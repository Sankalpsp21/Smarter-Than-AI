import { Text } from "@aws-amplify/ui-react";
import GameNavbar from "../components/GameNavbar";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameSession, RoundMode, UserSession } from "../models";
import { useSelector } from "react-redux";
import {
  selectIsHost,
  selectGameSessionID,
  selectUserSessionID,
} from "../redux/GameSlice";
import { useLocation } from "react-router-dom";

export function Message() {
  const isHost = useSelector(selectIsHost);
  const gameSessionID = useSelector(selectGameSessionID);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTime, setCurrentTime] = useState(10);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const userSessionID = useSelector(selectUserSessionID);

  const messageSet = {
    WIN: "An AI has been deported....",
    MESSAGE: "A human has been deported....",
    LOSE: "You have been deported....",
  };

  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    const init = async () => {
      // Get a gameSession data
      const gameSession = await DataStore.query(GameSession, gameSessionID);

      if (location.state === "MESSAGE") {
        setMessage(messageSet.MESSAGE);
      } else if ((location.state = "WIN")) {
        setMessage(messageSet.WIN);
      } else {
        setMessage(messageSet.LOSE);
      }

      // Prevent the case when gameSession is undefined
      if (!gameSession) return;

      timer = setInterval(async () => {
        const { currentRoundExpiration } = gameSession;
        const date = new Date(currentRoundExpiration);
        const now = new Date();
        const diff = date.getTime() - now.getTime();

        // get time in seconds
        const seconds = Math.floor(diff / 1000) - 10;
        console.log(seconds);
        if (seconds > 0) {
          console.log(seconds);
          setCurrentTime(seconds);
        } else {
          setCurrentTime(0);
          setIsTimeOut(true);
        }
      }, 1000);

      // HOST
      if (isHost && isTimeOut) {
        if (gameSession == null) {
          return;
        }

        await DataStore.save(
          GameSession.copyOf(gameSession, (item) => {
            item.roundNumber = gameSession.roundNumber + 1;
            item.roundMode = RoundMode.PROMPT;
          })
        );
      }
      // NOT HOST
      else {
        // Get the userSession
        const userSession = await DataStore.query(UserSession, userSessionID);

        if (userSession == null) {
          console.log("ERROR: userSession is null");
          return;
        }

        // Reset user response to empty string
        await DataStore.save(
          UserSession.copyOf(userSession, (item) => {
            item.currentRoundResponse = "";
          })
        );

        const subscription = DataStore.observe(
          GameSession,
          gameSessionID
        ).subscribe(async (msg: any) => {
          const item = msg.element;
          console.log(item);

          if (location.state === "WIN") {
            if (userSession) {
              await DataStore.save(
                UserSession.copyOf(userSession, (updated) => {
                  updated.wins += 1;
                  updated.totalScore += 1;
                })
              );
            }
            navigate("/result", { state: "WIN" });
          } else if (location.state === "LOSE") {
            navigate("/result", { state: "LOSE" });
          } else {
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
      <div style={{ width: "100%", position: "fixed", top: "0" }}>
        <GameNavbar time={currentTime} />
      </div>
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
      <Message />
    </>
  );
};

export default Game;

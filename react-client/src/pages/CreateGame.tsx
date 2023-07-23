import { Button, Text, Flex } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { GameSession } from "../models";
import { ToggleButton } from "../components/Buttons";

const CreateGame = () => {
  const [currentPlayerNum, setCurrentPlayerNum] = useState(0);
  const [pinCode, setPinCode] = useState(5123);
  const [gameSessionId, setGameSessionId] = useState('');

  useEffect(() => {
    const initGame = async () => {
      try {
        
        // Create a new GameSession
        const gameSession = new GameSession({
          "pinCode": pinCode,
          "playerCount": 0,
          "roundNumber": 0,
          "roundPrompt": "",
          "currentRoundExpiration": new Date().toISOString(),
          "UserSessions": [],
          "playersResponded": 0,
          "roundMode": "PROMPT",
          "aiResponse": ""
        });
        // Save the GameSession to the database
        await DataStore.save(gameSession);

        // Set the page's gameSessionId from the id of the GameSession we just created
        setGameSessionId(gameSession.id);
        console.log(`GameSession id: ${gameSession.id}`);
 

        // Subscribe to updates to playerCount of the GameSession we just created
        const subscription = DataStore.observeQuery(
          GameSession,
          gameSession => gameSession.and(gameSession => [
            gameSession.id.eq(gameSessionId)
          ]), {}).subscribe(msg => {
          console.log(msg);
        });

        console.log(subscription);

        // TODO: unsubscribe from subscription

      } catch (error) {
        console.error(error);
      }
    };
    initGame();
  }, []);

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

  const handleStartbtn = async () => {
    try {
      // Get game session
      const gameSession = await getGameSession(pinCode);

      // Handle invalid game session
      if (gameSession == null || gameSession.roundNumber > 0) {
        console.error('Invalid pin code or game session has already started');
        return;
      }

      // Increment GameSession roundNumber by 1
      await DataStore.save(
        GameSession.copyOf(gameSession, (updated) => {
          updated.roundNumber = gameSession.roundNumber + 1;
        })
      );
    } catch (error) {
      console.error(error);
    }
    
  }

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
      <ToggleButton color="#FF6DDF" onClick={handleStartbtn}>Start Game</ToggleButton>
    </>
  );
};

export default CreateGame;

import { Button, Text, TextField, Flex } from '@aws-amplify/ui-react';
import { ToggleButton } from '../components/Buttons';
import { PromptCard, PinkCard, VoteCard } from '../components/Cards';
import GameNavbar from '../components/GameNavbar';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { GameSession, UserSession } from '../models';

export function Play() {
	//TODO: Look at SoundConductor for how to use redux store
	const [gameSessionId, setGameSessionId] = useState(''); // TODO: get gameSessionId from redux store
	const [userSessionId, setUserSessionId] = useState(''); // TODO: get userSession from redux store
	const [isHost, setIsHost] = useState(false); // TODO: get isHost from redux store
	const [playersResponded, setPlayersResponded] = useState(0);
	const [playerCount, setPlayerCount] = useState(0);
	const [roundNo, setRoundNo] = useState(0);
	const [currentRoundResponse, setCurrentRoundResponse] = useState('');
	const [roundMode, setRoundMode] = useState(''); // TODO: get roundMode from redux store

	useEffect(() => {
		const setupRound = async () => {
			try {
				const gameSessions = await DataStore.query(GameSession, (c) =>
					c.and((c) => [c.id.eq(gameSessionId)])
				);
				setPlayerCount(gameSessions[0].playerCount);
				setPlayersResponded(gameSessions[0].playersResponded);
				setRoundNo(gameSessions[0].roundNumber);

				// Subscribe to updates to playersResponded
				const subscription = DataStore.observe(
					GameSession,
					gameSessionId
				  ).subscribe((msg: any) => { //TODO: test this
					 const item = msg.element; 
					 setPlayersResponded(item.playersResponded)
					 setRoundMode(item.roundMode);
					}
				);
		  
				console.log(subscription);

				if (isHost) {
					// Generate AI response by fetching from endpoint
					const aiResp = await fetch('/ai/get-answer');
					if(!aiResp.ok) throw new Error('Failed to get response from /ai/get-answer');
					const aiRespText = await aiResp.text();
					
					// Update GameSession with aiResponse
					await DataStore.save(
						GameSession.copyOf(gameSessions[0], (updated) => {
							updated.aiResponse = aiRespText;
							updated.playersResponded = gameSessions[0].playersResponded + 1;
						}
					));
				}

			} catch (error) {
				console.error(error);
			}
		};
		setupRound();
	}, []);

	//TODO: Handle end of round
	// Look at Prompt.tsx for how to do this
	/*
		Once currentRoundExpiration expires or playersResponded >= playerCount, Update GameSession
			set playersResponded to 0
			set roundMode to “VOTE”
	*/

	const getGameSession = async (gsid: string) => {
		try {
		  // get all game sessions
		  const gameSession = await DataStore.query(GameSession, (c) =>
			c.and((c) => [c.id.eq(gsid)])
		  );
		  if (gameSession.length === 0) return null;
		  return gameSession[0];
		} catch (error) {
		  console.error(error);
		  return null;
		}
	};

	const getUserSession = async (usid: string) => {
		try {
		  // get all user sessions
		  const userSession = await DataStore.query(UserSession, (c) =>
			c.and((c) => [c.id.eq(usid)])
		  );
		  if (userSession.length === 0) return null;
		  return userSession[0];
		} catch (error) {
		  console.error(error);
		  return null;
		}
	};

	// Update user's current round response state when they type in TextField
	const handleTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentRoundResponse(event.target.value);
	};

	const handleUserResponse = async () => {
		try {
			// Get GameSession
			const gameSessions = await DataStore.query(GameSession, (c) =>
				c.and((c) => [c.id.eq(gameSessionId)])
			);

			// Get UserSession
			const userSessions = await DataStore.query(UserSession, (c) =>
				c.and((c) => [c.id.eq(userSessionId)])
			);

			// On user response, update playersResponded
			// Increment GameSession playersResponded by 1
			await DataStore.save(
				GameSession.copyOf(gameSessions[0], (updated) => {
					updated.playersResponded = gameSessions[0].playersResponded + 1;
				})
			);

			// Update UserSession currentRoundResponse
			// set current round response to user input
			await DataStore.save(
				UserSession.copyOf(userSessions[0], (updated) => {
					updated.currentRoundResponse = currentRoundResponse;
				})
			);
		} catch (error) {
			console.error(error);
		}
		
	};

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
				style={{ position: 'fixed', top: '5vh', cursor: 'default' }}
			>
				Players responded ({playersResponded}/{playerCount})
			</Text>
			<PinkCard
				style={{ position: 'fixed', top: '10vh', cursor: 'default' }}
			>
				Round {roundNo} Prompt
			</PinkCard>
			<PromptCard>This is a round 1 question</PromptCard>
			<Flex direction="row" justifyContent="center">
				<TextField
					label="Answer"
					labelHidden
					placeholder="Enter your response"
					width="35vw"
					backgroundColor={'transparent'}
					alignSelf={'center'}
					boxShadow={'rgba(13, 26, 38, 0.25) 0px 4px 4px 0px'}
					inputStyles={{
						color: '#000000',
						backgroundColor: '#ffffff',
						border: 'none',
						borderRadius: '10px'
					}}
					onChange={handleTextField}
				></TextField>
				{!isHost &&
					<ToggleButton color="#FF6DDF" onClick={handleUserResponse}>Submit</ToggleButton>
				}
			</Flex>
		</>
	);
}

const Game = () => {
	return (
		<>
			<div style={{ width: '100%', position: 'fixed', top: '0' }}>
				<GameNavbar />
			</div>
			<Play />
		</>
	);
};

export default Game;

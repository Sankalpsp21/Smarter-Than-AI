import { Text, TextField, Flex } from '@aws-amplify/ui-react';
import { ToggleButton } from '../components/Buttons';
import { PromptCard, PinkCard } from '../components/Cards';
import GameNavbar from '../components/GameNavbar';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { GameSession, RoundMode, UserSession } from '../models';
import { useSelector } from 'react-redux';
import {
	selectGameSessionID,
	selectUserSessionID,
	selectIsHost
} from '../redux/GameSlice';
import { useNavigate } from 'react-router-dom';
import { ZenObservable } from 'zen-observable-ts';

export function Play() {
	const navigate = useNavigate();

	// get values from redux store
	const gameSessionId = useSelector(selectGameSessionID);
	const userSessionId = useSelector(selectUserSessionID);
	const isHost = useSelector(selectIsHost);
	const [playersResponded, setPlayersResponded] = useState(0);
	const [playerCount, setPlayerCount] = useState(0);
	const [roundNo, setRoundNo] = useState(0);
	const [currentRoundResponse, setCurrentRoundResponse] = useState('');
	const [currentTime, setCurrentTime] = useState(30);
	const [isTimeOut, setIsTimeOut] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		let subscription: ZenObservable.Subscription;
		let timer: string | number | NodeJS.Timeout | undefined;

		const aiRespText = 'This is an AI response';

		const setupRound = async () => {
			const gameSession = await DataStore.query(
				GameSession,
				gameSessionId
			);
			if (gameSession == null) return;
			setPlayerCount(gameSession.playerCount);
			setPlayersResponded(gameSession.playersResponded);
			setRoundNo(gameSession.roundNumber);

			// Subscribe to updates to playersResponded
			subscription = DataStore.observe(
				GameSession,
				gameSessionId
			).subscribe(async (msg: any) => {
				//TODO: test this
				const item = msg.element;
				setPlayersResponded(item.playersResponded);

				if (isHost && item.playersResponded == item.playerCount) {
					determineNextStep(aiRespText);
				}

				if (!isHost) {
					if (item.roundMode === RoundMode.VOTE) {
						// wait for 2 seconds
						await new Promise((resolve) =>
							setTimeout(resolve, 2000)
						);
						navigate('/vote');
					}
				}
			});

			console.log(subscription);

			// if (isHost) {
			// 	// Generate AI response by fetching from endpoint
			// 	// // const aiResp = await fetch("/ai/get-answer");
			// 	// // if (!aiResp.ok)
			// 	// //   throw new Error("Failed to get response from /ai/get-answer");
			// 	// const aiRespText = await aiResp.text();
			// 	const aiRespText = 'This is an AI response';

			// 	const gameSession = await DataStore.query(
			// 		GameSession,
			// 		gameSessionId
			// 	);
			// 	if (gameSession == null) return;

			// 	// Update GameSession with aiResponse
			// 	await DataStore.save(
			// 		GameSession.copyOf(gameSession, (updated) => {
			// 			updated.aiResponse = aiRespText;
			// 			updated.playersResponded =
			// 				gameSession.playersResponded + 1;
			// 		})
			// 	);
			// }

			// set timer that runs every 1 second
			timer = setInterval(async () => {
				const { currentRoundExpiration } = gameSession;
				const date = new Date(currentRoundExpiration);
				const now = new Date();
				const diff = date.getTime() - now.getTime();

				// get time in seconds
				const seconds = Math.floor(diff / 1000);
				if (seconds > 0) {
					console.log(seconds);
					setCurrentTime(seconds);
				} else {
					setCurrentTime(0);
					setIsTimeOut(true);
					if (isHost) {
						determineNextStep(aiRespText);
					}
				}
			}, 1000);
		};
		try {
			setupRound();
		} catch (error) {
			console.error(error);
		}

		return () => {
			subscription?.unsubscribe();
			if (timer) {
				clearInterval(timer);
			}
		};
	}, []);

	const determineNextStep = async (chatGPTResp: string) => {
		// wait 2 seconds
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const gameSession = await DataStore.query(GameSession, gameSessionId);
		if (gameSession == null) return;
		// set playersResponded to 0 & roundMode to "VOTE"
		await DataStore.save(
			GameSession.copyOf(gameSession, (updated) => {
				updated.aiResponse = chatGPTResp;
				updated.playersResponded = 1;
				updated.roundMode = RoundMode.VOTE;
				updated.currentRoundExpiration = new Date( // set to now + 30s
					Date.now() + 30000
				).toISOString();
			})
		);

		navigate('/vote');
	};

	//TODO: Handle end of round
	// Look at Prompt.tsx for how to do this
	/*
		Once currentRoundExpiration expires or playersResponded >= playerCount, Update GameSession
			set playersResponded to 0
			set roundMode to “VOTE”
	*/

	// const getGameSession = async (gsid: string) => {
	// 	try {
	// 		// get all game sessions
	// 		const gameSession = await DataStore.query(GameSession, (c) =>
	// 			c.and((c) => [c.id.eq(gsid)])
	// 		);
	// 		if (gameSession.length === 0) return null;
	// 		return gameSession[0];
	// 	} catch (error) {
	// 		console.error(error);
	// 		return null;
	// 	}
	// };

	// const getUserSession = async (usid: string) => {
	// 	try {
	// 		// get all user sessions
	// 		const userSession = await DataStore.query(UserSession, (c) =>
	// 			c.and((c) => [c.id.eq(usid)])
	// 		);
	// 		if (userSession.length === 0) return null;
	// 		return userSession[0];
	// 	} catch (error) {
	// 		console.error(error);
	// 		return null;
	// 	}
	// };

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
					updated.playersResponded =
						gameSessions[0].playersResponded + 1;
				})
			);

			// Update UserSession currentRoundResponse
			// set current round response to user input
			await DataStore.save(
				UserSession.copyOf(userSessions[0], (updated) => {
					updated.currentRoundResponse = currentRoundResponse;
				})
			);
			setIsSubmitted(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div style={{ width: '100%', position: 'fixed', top: '0' }}>
				<GameNavbar time={currentTime} />
			</div>
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
			{!isHost && (
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
					{!isHost && (
						<ToggleButton
							color="#FF6DDF"
							onClick={handleUserResponse}
							disabled={isTimeOut || isSubmitted}
						>
							Submit
						</ToggleButton>
					)}
				</Flex>
			)}
		</>
	);
}

const Game = () => {
	return (
		<>
			<Play />
		</>
	);
};

export default Game;

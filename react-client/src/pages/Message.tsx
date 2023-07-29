import { Text } from '@aws-amplify/ui-react';
import GameNavbar from '../components/GameNavbar';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameSession, RoundMode, UserSession } from '../models';
import { useSelector } from 'react-redux';
import {
	selectIsHost,
	selectGameSessionID,
	selectUserSessionID
} from '../redux/GameSlice';
import { useLocation } from 'react-router-dom';

export function Message() {
	const isHost = useSelector(selectIsHost);
	const gameSessionID = useSelector(selectGameSessionID);
	const navigate = useNavigate();
	const location = useLocation();

	const [currentTime, setCurrentTime] = useState(10);
	const userSessionID = useSelector(selectUserSessionID);

	const messageSet = {
		WIN: 'An AI has been deported....',
		MESSAGE: 'A human has been deported....',
		LOSE: 'You have been deported....',
		HOSTLOSE: 'The last player has been deported....'
	};

	const [message, setMessage] = useState('');

	useEffect(() => {
		let subscription: any;
		let timer: string | number | NodeJS.Timeout | undefined;

		const init = async () => {
			// Get a gameSession data
			const gameSession = await DataStore.query(
				GameSession,
				gameSessionID
			);
			console.log(location.state);

			// Set the message
			if (location.state === 'MESSAGE') {
				setMessage(messageSet.MESSAGE);
			} else if (location.state === 'WIN') {
				setMessage(messageSet.WIN);
			} else if (isHost && location.state === 'LOSE') {
				setMessage(messageSet.HOSTLOSE);
			} else if (location.state === 'LOSE') {
				setMessage(messageSet.LOSE);
			}

			// Prevent the case when gameSession is undefined
			if (!gameSession) return;

			// Delay for 10 seconds
			timer = setInterval(async () => {
				const { currentRoundExpiration } = gameSession;
				const date = new Date(currentRoundExpiration);
				const now = new Date();
				const diff = date.getTime() - now.getTime();

				// get time in seconds
				const seconds = Math.floor(diff / 1000);
				console.log(seconds);
				if (seconds > 0) {
					setCurrentTime(seconds);
				} else {
					setCurrentTime(0);

					if (isHost) {
						handleNavigate();
					}
				}
			}, 1000);

			if (!isHost) {
				const userSession = await DataStore.query(
					UserSession,
					userSessionID
				);
				if (!userSession) return;

				// Reset user response to empty string
				await DataStore.save(
					UserSession.copyOf(userSession, (item) => {
						item.currentRoundResponse = '';
						item.currentVoteResponse = '';
					})
				);

				// Subscribe and listen
				subscription = DataStore.observe(
					GameSession,
					gameSessionID
				).subscribe(async (msg: any) => {
					const item = msg.element;
					console.log(item);

					// When the RoundMode is changed, check the state for navigation
					if (item.roundMode === RoundMode.PROMPT) {
						// If the state was WIN, update the user data
						if (location.state === 'WIN') {
							await DataStore.save(
								UserSession.copyOf(userSession, (updated) => {
									updated.wins += 1;
									updated.totalScore += 1;
								})
							);
							navigate('/result', { state: 'WIN' });
						} else if (location.state === 'LOSE') {
							navigate('/result', { state: 'LOSE' });
						} else {
							navigate('/prompt');
						}
					}
				});
			}
		};

		// Pagination occurs in here (host only)
		const handleNavigate = async () => {
			const gameSession = await DataStore.query(
				GameSession,
				gameSessionID
			);

			// Prevent error when gameSession is null
			if (gameSession == null) {
				console.log('ERROR: gameSession is null');
				return;
			}

			// Update the gameSession
			await DataStore.save(
				GameSession.copyOf(gameSession, (item) => {
					item.roundNumber = gameSession.roundNumber + 1;
					item.roundMode = RoundMode.PROMPT;
				})
			);
			// if the user is not the host
			if (location.state === 'WIN') {
				navigate('/result', { state: 'WIN' });
			} else if (location.state === 'LOSE') {
				navigate('/result', { state: 'LOSE' });
			} else {
				navigate('/prompt');
			}
		};

		try {
			init();
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
				fontSize="2em"
				fontStyle="normal"
				textDecoration="none"
				style={{ cursor: 'default' }}
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

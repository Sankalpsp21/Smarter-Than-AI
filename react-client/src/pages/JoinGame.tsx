import { TextField, Text } from '@aws-amplify/ui-react';
import { ToggleButton } from '../components/Buttons';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { GameSession, UserSession } from '../models';

const JoinGame = () => {
	const [pinCode, setPinCode] = useState<number>(0);
	const [error, setError] = useState<string>('');

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
			setError('Invalid pin code or game session has already started');
			return;
		}

		// TODO: check redux store for user. For now just assuming user is new and needs to be created
		try {
			if (true) {
				await DataStore.save(
					new UserSession({
						eliminated: false,
						currentRoundResponse: '',
						totalScore: 0,
						totalGames: 0,
						wins: 0,
						losses: 0,
						gameSessionID: gameSession.id
					})
				);
			} else {
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
			<div>Enter pin code to join</div>
			<TextField
				size="default"
				placeholder="Pin code..."
				onChange={handlePinCodeChange}
			/>
			<Text style={{ color: 'red' }}>{error}</Text>
			<ToggleButton color="#62A1FF" onClick={handleJoinBtn}>
				Join
			</ToggleButton>
		</>
	);
};

export default JoinGame;
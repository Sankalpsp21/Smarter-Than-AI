import { TextField, Text } from '@aws-amplify/ui-react';
import { ToggleButton } from '../components/Buttons';
import { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { GameSession, UserSession } from '../models';
import { LoginButton } from '../components/LoginButton';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserSessionID,
	setUserSessionID,
	setGameSessionID,
	setIsHost
} from '../redux/GameSlice';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const JoinGame = () => {
	const dispatch: AppDispatch = useDispatch();
	const userSessionID = useSelector(selectUserSessionID);
	const [pinCode, setPinCode] = useState<number>(0);
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();

	const getGameSession = async (pinCode: number) => {
		try {
			// get all game sessions
			let gameSession = await DataStore.query(GameSession, (c) =>
				c.and((c) => [c.pinCode.eq(pinCode)])
			);

			// delay 0.5s
			await new Promise((resolve) => setTimeout(resolve, 500));

			// try again so that data is refreshed in underlay DataStore
			gameSession = await DataStore.query(GameSession, (c) =>
				c.and((c) => [c.pinCode.eq(pinCode)])
			);

			//const gameSessions = await DataStore.query(GameSession);
			//console.log("gameSessions===", gameSessions);
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
		setError('');
	};

	const handleJoinBtn = async () => {
		if (pinCode < 1000 || pinCode > 10000) {
			setError('Invalid pin code or game session has already started');
			return;
		}
		const gameSession = await getGameSession(pinCode);

		if (gameSession == null || gameSession.roundNumber > 0) {
			setError('Invalid pin code or game session has already started');
			return;
		}

		dispatch(setIsHost(false));

		dispatch(setGameSessionID(gameSession.id));
		console.log('Pin code in IF is ====', pinCode);
		console.log('gameSession in IF is ====', gameSession);

		// check redux store for user. For now just assuming user is new and needs to be created
		try {
			if (!userSessionID) {
				const user = await DataStore.save(
					new UserSession({
						eliminated: false,
						currentRoundResponse: '',
						currentVoteResponse: '',
						totalScore: 0,
						totalGames: 0,
						wins: 0,
						losses: 0,
						gameSessionID: gameSession.id,
						// set ttl to 1 day in epoch time
						_ttl: Math.floor(Date.now() / 1000) + 86400
					})
				);

				dispatch(setUserSessionID(user.id));
				console.log('IN IF ====', userSessionID);
			} else {
				console.log(userSessionID);
				const user = await DataStore.query(UserSession, userSessionID);

				if (user == null) {
					return;
				}

				console.log('user ==', user);

				await DataStore.save(
					UserSession.copyOf(user, (updated) => {
						updated.eliminated = false;
						updated.currentRoundResponse = '';
						updated.currentVoteResponse = '';
						updated.gameSessionID = gameSession.id;
						// set ttl to 1 day in epoch time
						// updated._ttl = Math.floor(Date.now() / 1000) + 86400;
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
			navigate(`/lobby`);
		} catch (error: any) {
			console.error(error);
			setError(error.message);
			console.log('ERROR IN TRY');
		}
	};

	return (
		<>
			<LoginButton color="#000000" />
			<h1>ARE YOU SMARTER THAN AN AI?</h1>
			<div>Enter pin code to join</div>
			<TextField
				size="large"
				placeholder="Pin code..."
				onChange={handlePinCodeChange}
				label={undefined}
				style={{ zIndex: -1000 }}
			/>
			<Text style={{ color: '#ffa6a6' }}>{error}</Text>
			<ToggleButton color="#62A1FF" onClick={handleJoinBtn}>
				Join
			</ToggleButton>
		</>
	);
};

export default JoinGame;

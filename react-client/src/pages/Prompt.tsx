import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Text } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { GameSession, RoundMode } from '../models';
import { useSelector } from 'react-redux';
import { selectGameSessionID, selectIsHost } from '../redux/GameSlice';

export function Prompt() {
	// get values from redux
	const isHost = useSelector(selectIsHost);
	const gameSessionID = useSelector(selectGameSessionID);

	useEffect(() => {
		const init = async () => {
			const gameSession = await DataStore.query(
				GameSession,
				gameSessionID
			);
			console.log(gameSession);

			if (gameSession == null) {
				return;
			}

			if (isHost) {
				// TODO: replace with call to ChatGPT endpoint
				const chatPrompt = "What's your favorite movie?";

				// delay for 5 seconds
				await new Promise((resolve) => setTimeout(resolve, 5000));

				const gameSession = await DataStore.query(
					GameSession,
					gameSessionID
				);
				console.log(gameSession);

				if (gameSession == null) {
					return;
				}

				await DataStore.save(
					GameSession.copyOf(gameSession, (item) => {
						item.roundPrompt = chatPrompt;
						// set to now + 30s
						item.currentRoundExpiration = new Date(
							Date.now() + 30000
						).toISOString();
						item.playersResponded = 0;
						item.roundMode = RoundMode.PLAY;
						item.aiResponse = '';
					})
				);

				window.location.href = '/play';
			} else {
				if (gameSession.roundMode === RoundMode.PLAY) {
					window.location.href = '/play';
				} else {
					const subscription = DataStore.observe(
						GameSession,
						gameSessionID
					).subscribe((msg) => {
						const item = msg.element;
						console.log(item);

						if (item.roundMode === RoundMode.PLAY) {
							window.location.href = '/play';
						}
					});
					console.log(subscription);
				}
			}
		};
		try {
			init();
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<>
			<Text
				marginBottom="3em"
				fontSize="1.2em"
				fontWeight="500"
				alignSelf="center"
			>
				Generating Prompt...
			</Text>
			<LoadingSpinner />
		</>
	);
}

export default Prompt;

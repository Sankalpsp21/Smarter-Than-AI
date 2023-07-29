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

	console.log('isHost is ', isHost);
	console.log('gameSessionID is ', gameSessionID);

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
				// call to ChatGPT endpoint
				let chatPrompt = "What's your favorite movie?";

				// Generate AI response by fetching from endpoint
				const aiResp = await fetch(
					'http://localhost:8080/ai/get-question'
				);

				if (!aiResp.ok) {
					console.error(
						'Failed to get response from /ai/get-question'
					);
				} else {
					chatPrompt = await aiResp.text();
				}

				console.log(`AI response: ${chatPrompt}`);

				// delay for 2 seconds
				await new Promise((resolve) => setTimeout(resolve, 2000));

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
						item.playersResponded = 1;
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

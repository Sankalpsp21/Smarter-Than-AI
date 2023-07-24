import { Button, Text, TextField, Flex } from '@aws-amplify/ui-react';
import { ToggleButton } from '../components/Buttons';
import { PromptCard, PinkCard, VoteCard } from '../components/Cards';
import GameNavbar from '../components/GameNavbar';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { GameSession, RoundMode } from '../models';

export function Message() {
	// TODO: get values from redux
	const isHost = true;
	const gameSessionID = '877ed5ad-e0c1-4b0b-8291-c73947433bc4';

	const messageArray = [
		'An AI has been deported....',
		'A human has been deported....'
	];
	const [message, setMessage] = useState(messageArray[0]);

	useEffect(() => {
		const init = async () => {
			if (isHost) {
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
						item.roundNumber = gameSession.roundNumber + 1;
						item.roundMode = RoundMode.PROMPT;
					})
				);

				// delay for 10 seconds
				await new Promise((resolve) => setTimeout(resolve, 10000));

				window.location.href = '/prompt';
			} else {
				// TODO: get subscription working
				const subscription = DataStore.observe(
					GameSession,
					gameSessionID
				).subscribe((msg) => {
					console.log(msg);
				});
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
			<div style={{ width: '100%', position: 'fixed', top: '0' }}>
				<GameNavbar />
			</div>
			<Message />
		</>
	);
};

export default Game;

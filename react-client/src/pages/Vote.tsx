import { Button, Text, TextField, Flex } from '@aws-amplify/ui-react';
import { ToggleButton } from '../components/Buttons';
import { PromptCard, PinkCard, VoteCard } from '../components/Cards';
import GameNavbar from '../components/GameNavbar';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { GameSession } from '../models';

export function Vote() {
	const [currentResponededPlayer, setCurrentResponededPlayer] = useState(0);
	const [currentRound, setCurrentRound] = useState(0);

	useEffect(() => {
		const fetch = async () => {
			try {
				const gameSessions = await DataStore.query(GameSession);
				setCurrentResponededPlayer(gameSessions[0].playerCount);
				setCurrentResponededPlayer(gameSessions[0].playersResponded);
				setCurrentRound(gameSessions[0].roundNumber);
			} catch (error) {
				console.error(error);
			}
		};
		fetch();
	}, []);

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
				Players responded ({currentResponededPlayer}/5)
			</Text>
			<PinkCard
				style={{ position: 'fixed', top: '10vh', cursor: 'default' }}
			>
				Round {currentRound} Voting
			</PinkCard>
			<Flex
				direction="column"
				gap={'0.5em'}
				width={'100%'}
				height={'60vh'}
				alignItems={'center'}
				position={'fixed'}
				bottom={'15vh'}
			>
				<VoteCard label="something Something" />
				<VoteCard label="something Something" />
				<VoteCard label="something Something" />
				<VoteCard label="something Something" />
				<VoteCard label="something Something" />
				<VoteCard label="something Something" />
				<VoteCard label="something Something" />
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
			<Vote />
		</>
	);
};

export default Game;

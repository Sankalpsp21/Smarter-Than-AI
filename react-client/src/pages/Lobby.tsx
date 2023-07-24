import { useEffect, useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Text } from '@aws-amplify/ui-react';
import { API, DataStore, graphqlOperation } from 'aws-amplify';
import { GameSession, RoundMode } from '../models';
import { GraphQLSubscription } from '@aws-amplify/api';
// import * as subscriptions from './graphql/subscriptions';

export function Lobby() {
	// TODO: get values from redux
	const gameSessionID = '877ed5ad-e0c1-4b0b-8291-c73947433bc4';

	useEffect(() => {
		const init = async () => {
			// TODO: get subscription working
			const subscription = DataStore.observe(
				GameSession,
				gameSessionID
			).subscribe((msg) => {
				console.log(msg);
			});
		};
		try {
			init();
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<>
			<h1>ARE YOU SMARTER THAN AN AI?</h1>

			<Text
				marginBottom="1em"
				fontSize="1.2em"
				fontWeight="500"
				alignSelf="center"
			>
				Waiting for Host to Start...
			</Text>
			<Text
				marginBottom="2em"
				fontStyle="normal"
				textDecoration="none"
				alignSelf="center"
			>
				Players joined: currentPlayerNum
			</Text>

			<LoadingSpinner />
		</>
	);
}

export default Lobby;

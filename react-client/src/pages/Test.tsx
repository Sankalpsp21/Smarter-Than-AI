import '@aws-amplify/ui-react/styles.css';
import { useEffect } from 'react';
import { Amplify, API, DataStore, graphqlOperation } from 'aws-amplify';
import { GraphQLSubscription } from '@aws-amplify/api';
import * as subscriptions from '../graphql/subscriptions';
import {
	OnUpdateGameSessionSubscription,
	OnUpdateGameSessionSubscriptionVariables
} from '../API';
import { GameSession } from '../models';

const Test = () => {
	const gameSessionID = '877ed5ad-e0c1-4b0b-8291-c73947433bc4';

	useEffect(() => {
		const test = async () => {
			// get all game sessions
			// const gameSessions = await DataStore.query(GameSession);
			// console.log(gameSessions);

			// subscribe (method 1)
			const subscription = DataStore.observe(
				GameSession,
				gameSessionID
			).subscribe((msg: any) => {
				// console.log(msg.model);
				// console.log(msg.opType);
				// console.log(msg.element);
				const item = msg.element;
				console.log(item);
			});
			console.log(subscription);

			// subscribe (method 2)
			// const variables: OnUpdateGameSessionSubscriptionVariables = {
			// 	filter: {
			// 		// Only receive Todo messages where the "type" field is "Personal"
			// 		id: { eq: gameSessionID }
			// 	}
			// };
			// const sub = API.graphql<
			// 	GraphQLSubscription<OnUpdateGameSessionSubscription>
			// >(
			// 	graphqlOperation(subscriptions.onUpdateGameSession, variables)
			// ).subscribe({
			// 	next: ({ provider, value }) => console.log({ provider, value }),
			// 	error: (error) => console.warn(error)
			// });
			// console.log(sub);
		};
		try {
			test();
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<>
			<h1>Hi there. This is a test page.</h1>
		</>
	);
};

export default Test;

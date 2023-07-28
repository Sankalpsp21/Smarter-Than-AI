import '@aws-amplify/ui-react/styles.css';
import { useEffect } from 'react';
import { Amplify, API, DataStore, graphqlOperation } from 'aws-amplify';
import { GraphQLSubscription } from '@aws-amplify/api';
import * as subscriptions from '../graphql/subscriptions';
import {
	OnUpdateGameSessionSubscription,
	OnUpdateGameSessionSubscriptionVariables
} from '../API';
import { GameSession, UserPersistedData } from '../models';

import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';

const Test = ({ signOut, user }: WithAuthenticatorProps) => {
	const gameSessionID = '877ed5ad-e0c1-4b0b-8291-c73947433bc4';

	useEffect(() => {
		const test = async () => {
			if (user == null) return;
			console.log(user);
			if (user.username == null) return;
			const username = user.username;

			// get user with username
			const retUser = await DataStore.query(UserPersistedData, (g) =>
				g.username.eq(username)
			);
			console.log(retUser);

			if (retUser.length == 0) {
				// create/update user with username
				const data = await DataStore.save(
					new UserPersistedData({
						username: user.username,
						totalScore: 0,
						totalGames: 0,
						wins: 0,
						losses: 0,
						rank: 0
					})
				);
				console.log(data);
			} else {
				// update user with username
				const data = await DataStore.save(
					UserPersistedData.copyOf(retUser[0], (updated) => {
						updated.totalScore += 100;
						updated.totalGames += 1;
						updated.wins += 1;
						updated.losses += 1;
						updated.rank += 1;
					})
				);
				console.log(data);
			}

			// get all user persisted data
			// const userPersistedDatas = await DataStore.query(UserPersistedData);
			// console.log(userPersistedDatas);

			// subscribe (method 1)
			// const subscription = DataStore.observe(
			// 	GameSession,
			// 	gameSessionID
			// ).subscribe((msg: any) => {
			// 	// console.log(msg.model);
			// 	// console.log(msg.opType);
			// 	// console.log(msg.element);
			// 	const item = msg.element;
			// 	console.log(item);
			// });
			// console.log(subscription);
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

export default withAuthenticator(Test);

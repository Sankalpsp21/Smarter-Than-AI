import '@aws-amplify/ui-react/styles.css';
import { DataStore } from 'aws-amplify';
import { useEffect } from 'react';
import { GameSession } from '../models';

const Test = () => {
	useEffect(() => {
		const test = async () => {
			try {
				// get all game sessions
				const gameSessions = await DataStore.query(GameSession);
				console.log(gameSessions);
			} catch (error) {
				console.error(error);
			}
		};
		test();
	}, []);

	return (
		<>
			<h1>Hi there. This is a test page.</h1>
		</>
	);
};

export default Test;

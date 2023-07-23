import Test from './pages/Test';
import Landing from './pages/Landing';
import CreateGame from './pages/CreateGame';
import JoinGame from './pages/JoinGame';
import Game from './pages/Game';
import Result from './pages/Result';
import { Amplify } from 'aws-amplify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

// Use next two lines only if syncing with the cloud
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/test" element={<Test />} />
					<Route path="/" element={<Landing />} />
					<Route path="/create-game" element={<CreateGame />} />
					<Route path="/join-game" element={<JoinGame />} />
					<Route path="/game" element={<Game />} />
					<Route path="/result" element={<Result />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

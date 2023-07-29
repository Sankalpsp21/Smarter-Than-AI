import { Button } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import { Exit } from './Modals';

interface GameNavbarProps {
	time: number;
}

const GameNavbar: React.FC<GameNavbarProps> = ({ time }) => {
	// const [timer, setTimer] = useState(time);

	// useEffect(() => {
	//   let interval: any;
	//   if (timer > 0) {
	//     interval = setInterval(() => {
	//       setTimer((prevTimer) => prevTimer - 1);
	//     }, 1000);
	//   }

	//   return () => {
	//     clearInterval(interval);
	//   };
	// }, [timer]);

	const formatTimer = (seconds: any) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		const formattedMinutes = String(minutes).padStart(2, '0');
		const formattedSeconds = String(remainingSeconds).padStart(2, '0');
		return `${formattedMinutes}:${formattedSeconds}`;
	};

	const handleExit = (e: any) => {
		e.preventDefault();
		window.location.href = '/';
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '1rem',
					backgroundColor: 'transparent'
				}}
			>
				<div>{formatTimer(time)}</div>
				<Button onClick={handleExit}>Exit</Button>
			</div>
		</>
	);
};

export default GameNavbar;

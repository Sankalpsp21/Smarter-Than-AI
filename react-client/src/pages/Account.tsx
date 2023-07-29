import { SignIn, SignUp, Stats } from '../components/Modals';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/GameSlice';

const Account = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const location = useLocation();
	const [isSignIn, setIsSignIn] = useState(location.state === 'SignIn');
	const [isSignUp, setIsSignUp] = useState(location.state === 'SignUp');
	const [isStats, setIsStats] = useState(location.state === 'Stats');

	useEffect(() => {
		if (!isLoggedIn) {
			setIsSignIn(true);
		}
	}, []);

	return (
		<>
			{isSignIn && <SignIn />}
			{isSignUp && <SignUp />}
			{(isLoggedIn || isStats) && <Stats />}
		</>
	);
};

export default Account;

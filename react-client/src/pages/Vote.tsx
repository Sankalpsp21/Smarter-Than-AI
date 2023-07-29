import React, { useRef } from 'react';
import { Button, Text, TextField, Flex } from '@aws-amplify/ui-react';
import { SubmitButton, ToggleButton } from '../components/Buttons';
import { PromptCard, PinkCard, VoteCard } from '../components/Cards';
import Checkbox from '../components/Checkbox';
import GameNavbar from '../components/GameNavbar';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {
	GameSession,
	RoundMode,
	UserPersistedData,
	UserSession
} from '../models';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsHost,
	selectGameSessionID,
	selectUserSessionID,
	selectTotalScore,
	setTotalScore,
	selectTotalGames,
	setTotalGames,
	selectWins,
	setWins,
	selectLosses,
	setLosses,
	selectIsLoggedIn,
	selectUserPersistedDataID
} from '../redux/GameSlice';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

export function Vote() {
	const dispatch: AppDispatch = useDispatch();

	// get values from redux
	const isHost = useSelector(selectIsHost);
	const gameSessionID = useSelector(selectGameSessionID);
	const userSessionID = useSelector(selectUserSessionID);
	// player stats
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const userPersistedDataID = useSelector(selectUserPersistedDataID);

	const totalScore = useSelector(selectTotalScore);
	const totalGames = useSelector(selectTotalGames);
	const wins = useSelector(selectWins);
	const losses = useSelector(selectLosses);

	const navigate = useNavigate();

	// For state management
	const playersResponded = useRef(0);
	const [playerCount, setPlayerCount] = useState(0);
	const [currentResponededPlayer, setCurrentResponededPlayer] = useState(0);
	const [currentRoundNumber, setCurrentRoundNumber] = useState(0);
	const [voteOptions, setVoteOptions] = useState<string[]>([]);
	const [currentTime, setCurrentTime] = useState(15);
	const [isVoted, setIsVoted] = useState(false);
	const [checkboxStates, setCheckboxStates] = useState<Array<boolean>>([]);

	const checkOnlyOne = (index: number) => {
		setCheckboxStates((prevStates) =>
			prevStates.map((_, idx) => (idx === index ? true : false))
		);
	};

	useEffect(() => {
		setCheckboxStates(new Array(voteOptions.length).fill(false));
	}, [voteOptions]);

	useEffect(() => {
		let gameSubscription: any;
		let userSubscription: any;
		let timer: string | number | NodeJS.Timeout | undefined;

		const init = async () => {
			// delay 2s
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Get gameSession data by gameSessionID
			const gameSession = await DataStore.query(
				GameSession,
				gameSessionID
			);

			// Prevent the case when gameSession is undefined
			if (!gameSession) return;

			// Get voteOptions from gameSession
			const { UserSessions, aiResponse } = gameSession;
			const users = await UserSessions.toArray();

			let userVoteResponses = users
				.filter((user: UserSession) => !user.eliminated)
				.map((user: UserSession) => user.currentRoundResponse);

			userVoteResponses = users
				.filter((user: UserSession) => !user.eliminated)
				.map((user: UserSession) => user.currentRoundResponse);

			const options = [...userVoteResponses, aiResponse];
			// randomize order of options
			options.sort(() => Math.random() - 0.5);
			setVoteOptions(options);

			// update currentRoundNumber and currentResponededPlayer
			playersResponded.current = gameSession.playersResponded;

			setCurrentResponededPlayer(gameSession.playersResponded);
			setCurrentRoundNumber(gameSession.roundNumber);
			setPlayerCount(gameSession.playerCount);

			gameSubscription = DataStore.observe(
				GameSession,
				gameSessionID
			).subscribe(async (msg: any) => {
				const item = msg.element;
				console.log(item);

				// update playersResponded
				playersResponded.current = item.playersResponded;
				setCurrentResponededPlayer(item.playersResponded);

				if (!isHost) {
					// If RoundMode is MESSAGE
					if (item.roundMode === RoundMode.MESSAGE) {
						console.log('navigate to /message with MESSAGE');
						navigate('/message', {
							state: 'MESSAGE'
						});
					}
					// If RoundMode is WIN
					else if (item.roundMode === RoundMode.WIN) {
						// update stats in amplify
						const userSession = await DataStore.query(
							UserSession,
							userSessionID
						);
						if (userSession == null) return;
						await DataStore.save(
							UserSession.copyOf(userSession, (updated) => {
								updated.totalScore += 100;
								updated.totalGames += 1;
								updated.wins += 1;
							})
						);

						if (isLoggedIn) {
							const userPersistedData = await DataStore.query(
								UserPersistedData,
								userPersistedDataID
							);
							if (userPersistedData != null) {
								await DataStore.save(
									UserPersistedData.copyOf(
										userPersistedData,
										(updated) => {
											updated.totalScore += 100;
											updated.totalGames += 1;
											updated.wins += 1;
										}
									)
								);
							}
						}

						// update redux for player
						dispatch(setTotalScore(totalScore + 100));
						dispatch(setTotalGames(totalGames + 1));
						dispatch(setWins(wins + 1));

						console.log('navigate to /message with WIN');
						navigate('/message', {
							state: 'WIN'
						});
					}
					// If RoundMode is LOSE (When the case is; playerNum === 2)
					else if (
						item.roundMode === RoundMode.LOSE ||
						item.eliminated
					) {
						// update redux for player
						dispatch(setTotalScore(totalScore - 100));
						dispatch(setTotalGames(totalGames + 1));
						dispatch(setLosses(losses + 1));

						console.log('navigate to /message with LOSE');
						navigate('/message', { state: 'LOSE' });
					}
				}

				// If all players responded, then determine next step
				if (isHost && item.playersResponded == item.playerCount) {
					determineNextStep();
				}
			});
			console.log(gameSubscription);

			if (!isHost) {
				userSubscription = DataStore.observe(
					UserSession,
					userSessionID
				).subscribe(async (msg: any) => {
					const item = msg.element;
					console.log(item);

					if (item.eliminated) {
						console.log('navigate to /message with LOSE');
						navigate('/message', { state: 'LOSE' });
					}
				});
				console.log(userSubscription);
			}

			timer = setInterval(async () => {
				const { currentRoundExpiration } = gameSession;
				const date = new Date(currentRoundExpiration);
				const now = new Date();
				const diff = date.getTime() - now.getTime();

				// get time in seconds
				const seconds = Math.floor(diff / 1000);
				if (seconds > 0) {
					console.log(seconds);
					setCurrentTime(seconds);
				} else {
					setCurrentTime(0);
					if (isHost) {
						determineNextStep();
					}
				}
			}, 1000);

			// const { currentRoundExpiration } = gameSession;
			// const date = new Date(currentRoundExpiration);
			// const now = new Date();
			// const diff = date.getTime() - now.getTime();

			// console.log(`expiration in seconds: ${diff / 1000}`);

			// if (isHost) {
			//   timer = setTimeout(() => {
			//     determineNextStep();
			//   }, diff);
			// } else {
			//   const subscription = DataStore.observe(
			//     UserSession,
			//     userSessionID
			//   ).subscribe(async (msg: any) => {
			//     const item = msg.element;
			//     console.log(item);

			//     if (item.eliminated) {
			//       subscription.unsubscribe();
			//       console.log("navigate to /message with LOSE");
			//       navigate("/message", { state: "LOSE" });
			//     }
			//   });
			//   console.log(subscription);
			// }
		};
		try {
			init();
		} catch (err) {
			console.log(err);
		}

		return () => {
			gameSubscription?.unsubscribe();
			userSubscription?.unsubscribe();
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, []);

	let determinedNextStep = false;
	const determineNextStep = async () => {
		if (determinedNextStep) return;
		determinedNextStep = true;

		// delay 2s
		await new Promise((resolve) => setTimeout(resolve, 2000));

		let gameSession = await DataStore.query(GameSession, gameSessionID);
		if (gameSession == null) return;

		// set currentRoundExpiration to 15 seconds from now
		const now = new Date();
		const currentRoundExpiration = new Date(
			now.getTime() + 15 * 1000
		).toISOString();

		gameSession = await DataStore.query(GameSession, gameSessionID);
		if (gameSession == null) return;

		const { aiResponse, UserSessions } = gameSession;
		// get count of UserSessions currentVoteResponse that matches aiResponse
		const users = await UserSessions.toArray();
		const count = users.filter(
			(user) => user.currentVoteResponse === aiResponse
		).length;
		console.log('Votes for AI: ', count);
		console.log('halfPlayerCount: ', gameSession.playerCount / 2);
		// check if majority of users voted for aiResponse
		if (count > gameSession.playerCount / 2) {
			// people win
			await DataStore.save(
				GameSession.copyOf(gameSession, (item) => {
					item.roundMode = RoundMode.WIN;
					item.currentRoundExpiration = currentRoundExpiration;
				})
			);
			console.log('navigate to /message with WIN');
			navigate('/message', { state: 'WIN' });
		}
		// if playerCount is 2, then then set to LOSE
		else if (gameSession.playerCount === 2) {
			// update user's data
			await DataStore.save(
				UserSession.copyOf(users[0], (updated) => {
					updated.eliminated = true;
					updated.totalScore -= 100;
					updated.losses += 1;
					updated.totalGames += 1;
				})
			);
			console.log(users[0]);
			console.log(
				'users[0].userPersistedDataID: ',
				users[0].userPersistedDataID
			);
			if (users[0].userPersistedDataID != null) {
				const userPersistedData = await DataStore.query(
					UserPersistedData,
					users[0].userPersistedDataID
				);
				console.log('userPersistedData: ');
				console.log(userPersistedData);
				if (userPersistedData != null) {
					await DataStore.save(
						UserPersistedData.copyOf(
							userPersistedData,
							(updated) => {
								updated.totalScore -= 100;
								updated.losses += 1;
								updated.totalGames += 1;
							}
						)
					);
				}
			}

			// wait 1 second
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// ai wins
			await DataStore.save(
				GameSession.copyOf(gameSession, (item) => {
					item.roundMode = RoundMode.LOSE;
					item.currentRoundExpiration = currentRoundExpiration;
				})
			);

			console.log('navigate to /message with LOSE');
			navigate('/message', { state: 'LOSE' });
		} else {
			// pick random user to eliminate
			//const randomNum = Math.floor(Math.random() * users.length);
			//const user = users[randomNum];

			// create a mapping for users votes
			const userVotesMap = new Map(); // Maps response to vote count
			users.forEach((user) => {
				if (userVotesMap.has(user.currentVoteResponse)) {
					userVotesMap.set(
						user.currentVoteResponse,
						userVotesMap.get(user.currentVoteResponse) + 1
					);
				} else {
					userVotesMap.set(user.currentVoteResponse, 1);
				}
			});

			// find the user(s) with the maximum votes
			let maxVotes = 0;
			let maxVotesUserResponse: string | null = null;
			userVotesMap.forEach((votes, userResponse) => {
				if (votes > maxVotes) {
					maxVotes = votes;
					maxVotesUserResponse = userResponse;
				}
			});

			// find the first user that corresponds to the maxVotesUserResponse
			const userToEliminate = users.find(
				(user) => user.currentRoundResponse === maxVotesUserResponse
			);

			if (userToEliminate) {
				// update user's data
				await DataStore.save(
					UserSession.copyOf(userToEliminate, (updated) => {
						updated.eliminated = true;
						updated.totalScore -= 100;
						updated.losses += 1;
						updated.totalGames += 1;
					})
				);
				if (userToEliminate.userPersistedDataID != null) {
					const userPersistedData = await DataStore.query(
						UserPersistedData,
						userToEliminate.userPersistedDataID
					);
					if (userPersistedData != null) {
						await DataStore.save(
							UserPersistedData.copyOf(
								userPersistedData,
								(updated) => {
									updated.totalScore -= 100;
									updated.losses += 1;
									updated.totalGames += 1;
								}
							)
						);
					}
				}
			} else {
				console.log('ERROR: failed to find a user to eliminate.');
			}

			// wait 1 second
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// update gameSession data
			await DataStore.save(
				GameSession.copyOf(gameSession, (item) => {
					item.playerCount -= 1;
					item.playersResponded = 0;
					item.roundMode = RoundMode.MESSAGE;
					item.currentRoundExpiration = currentRoundExpiration;
				})
			);

			// // get last playerCount
			// const newPlayerCount = gameSession.playerCount - 1;

			// if (newPlayerCount == 2) {
			// 	// ai wins
			// 	await DataStore.save(
			// 		GameSession.copyOf(gameSession, (item) => {
			// 			item.roundMode = RoundMode.LOSE;
			// 			item.currentRoundExpiration = currentRoundExpiration;
			// 		})
			// 	);

			// 	// get last user from users where eliminated is false
			// 	const users = await DataStore.query(UserSession, (c) =>
			// 		c.and((c) => [
			// 			c.gameSessionID.eq(gameSessionID),
			// 			c.eliminated.eq(false)
			// 		])
			// 	);
			// 	const user = users[0];

			// 	// update user's data
			// 	await DataStore.save(
			// 		UserSession.copyOf(user, (updated) => {
			// 			updated.eliminated = true;
			// 			updated.totalScore -= 100;
			// 			updated.losses += 1;
			// 			updated.totalGames += 1;
			// 		})
			// 	);
			// 	console.log('navigate to /message with LOSE');
			// 	navigate('/message', { state: 'LOSE' });
			// } else {
			console.log('navigate to /message with MESSAGE');
			navigate('/message', { state: 'MESSAGE' });
			// }
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (isHost) return;

		playersResponded.current += 1;
		setCurrentResponededPlayer(playersResponded.current);

		const gameSession = await DataStore.query(GameSession, gameSessionID);
		if (gameSession == null) return;

		await DataStore.save(
			GameSession.copyOf(gameSession, (item) => {
				item.playersResponded = playersResponded.current;
			})
		);

		const userSession = await DataStore.query(UserSession, userSessionID);
		if (userSession == null) return;

		// get selected vote option element
		const selectedElement = document.querySelector(
			'input[name="vote"]:checked'
		);

		if (!selectedElement) {
			console.log(
				'No vote option selected (cannot get selected element)'
			);
			return;
		}

		// get value from selected element
		const selectedValue = (
			selectedElement as HTMLInputElement
		).getAttribute('value');

		if (!selectedValue || selectedValue === null) {
			console.log('No vote option selected (cannot get selected value)');
			return;
		}

		// At this point, selectedValue must be a string (not null) because of the preceding check.

		console.log('selectedValue: ', selectedValue);

		await DataStore.save(
			UserSession.copyOf(userSession, (item) => {
				// Get response from vote-form
				item.currentVoteResponse = selectedValue as string;
			})
		);

		setIsVoted(true);
	};

	return (
		<>
			<div style={{ width: '100%', position: 'fixed', top: '0' }}>
				<GameNavbar time={currentTime} />
			</div>
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
				Players responded ({currentResponededPlayer}/{playerCount})
			</Text>
			<PinkCard
				style={{ position: 'fixed', top: '10vh', cursor: 'default' }}
			>
				Round {currentRoundNumber} Voting
			</PinkCard>
			<Flex
				as={'form'}
				id={'vote-form'}
				direction={'column'}
				gap={'0.5em'}
				width={'100%'}
				height={'60vh'}
				alignItems={'center'}
				position={'fixed'}
				bottom={'17vh'}
				overflow={'auto'}
				style={{ overflowX: 'hidden' }}
			>
				{voteOptions.map((option, index) => (
					<Checkbox
						key={index}
						value={option}
						onChange={() => checkOnlyOne(index)}
						onClick={() => checkOnlyOne(index)}
						checked={checkboxStates[index]}
					/>
				))}
			</Flex>
			{!isHost && (
				<SubmitButton
					color="#FF6DDF"
					form="vote-form"
					style={{ position: 'fixed', bottom: '4vh' }}
					onClick={handleSubmit}
					disabled={isVoted}
				>
					Submit
				</SubmitButton>
			)}
		</>
	);
}

const Game = () => {
	return (
		<>
			<Vote />
		</>
	);
};

export default Game;

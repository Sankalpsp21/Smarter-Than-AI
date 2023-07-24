import { createSlice } from '@reduxjs/toolkit';

interface GameSliceState {
	isHost: boolean;
	gameSessionID: string;
	// locally saved stats
	totalScore: number;
	totalGames: number;
	wins: number;
	losses: number;
	isLoggedIn: boolean;
	userPersistedDataID: string;
}

`
Persistent data? Ask Team
total score
total games played (completed)
current rank (based on score)
wins
losses
`;

// Initial State
const initialState: GameSliceState = {
	isHost: false,
	gameSessionID: '',
	totalScore: 0,
	totalGames: 0,
	wins: 0,
	losses: 0,
	isLoggedIn: false,
	userPersistedDataID: ''
};

// Slice
export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setIsHost: (state, action) => {
			state.isHost = action.payload;
		},
		setGameSessionID: (state, action) => {
			state.gameSessionID = action.payload;
		},
		setTotalScore: (state, action) => {
			state.totalScore = action.payload;
		},
		setTotalGames: (state, action) => {
			state.totalGames = action.payload;
		},
		setWins: (state, action) => {
			state.wins = action.payload;
		},
		setLosses: (state, action) => {
			state.losses = action.payload;
		},
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setUserPersistedDataID: (state, action) => {
			state.userPersistedDataID = action.payload;
		}
	}
});

// Action Creators
export const {
	setIsHost,
	setGameSessionID,
	setTotalScore,
	setTotalGames,
	setWins,
	setLosses,
	setIsLoggedIn,
	setUserPersistedDataID
} = gameSlice.actions;

// Selector Accessors
export const selectIsHost = (state: { game: GameSliceState }) =>
	state.game.isHost;
export const selectGameSessionID = (state: { game: GameSliceState }) =>
	state.game.gameSessionID;
export const selectTotalScore = (state: { game: GameSliceState }) =>
	state.game.totalScore;
export const selectTotalGames = (state: { game: GameSliceState }) =>
	state.game.totalGames;
export const selectWins = (state: { game: GameSliceState }) => state.game.wins;
export const selectLosses = (state: { game: GameSliceState }) =>
	state.game.losses;
export const selectIsLoggedIn = (state: { game: GameSliceState }) =>
	state.game.isLoggedIn;
export const selectUserPersistedDataID = (state: { game: GameSliceState }) =>
	state.game.userPersistedDataID;

export default gameSlice.reducer;

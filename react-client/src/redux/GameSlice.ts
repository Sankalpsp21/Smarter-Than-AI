import { createSlice } from "@reduxjs/toolkit";

export type GameSliceState = {
  isHost: boolean;
  gameSessionID: string;
  // locally saved stats
  userSessionID: string;
  totalScore: number;
  totalGames: number;
  wins: number;
  losses: number;
  isLoggedIn: boolean;
  userPersistedDataID: string;
};

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
  gameSessionID: "",
  userSessionID: "",
  totalScore: 0,
  totalGames: 0,
  wins: 0,
  losses: 0,
  isLoggedIn: false,
  userPersistedDataID: "",
};

// Slice
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsHost: (state, action) => {
      state.isHost = action.payload;
    },
    setGameSessionID: (state, action) => {
      state.gameSessionID = action.payload;
    },
    setUserSessionID: (state, action) => {
      state.userSessionID = action.payload;
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
    },
  },
});

// Action Creators
export const {
  setIsHost,
  setGameSessionID,
  setUserSessionID,
  setTotalScore,
  setTotalGames,
  setWins,
  setLosses,
  setIsLoggedIn,
  setUserPersistedDataID,
} = gameSlice.actions;

// Selector Accessors
export const selectIsHost = (state: GameSliceState) => state.isHost;
export const selectGameSessionID = (state: GameSliceState) =>
  state.gameSessionID;
export const selectUserSessionID = (state: GameSliceState) =>
  state.userSessionID;
export const selectTotalScore = (state: GameSliceState) => state.totalScore;
export const selectTotalGames = (state: GameSliceState) => state.totalGames;
export const selectWins = (state: GameSliceState) => state.wins;
export const selectLosses = (state: GameSliceState) => state.losses;
export const selectIsLoggedIn = (state: GameSliceState) => state.isLoggedIn;
export const selectUserPersistedDataID = (state: GameSliceState) =>
  state.userPersistedDataID;

export default gameSlice.reducer;

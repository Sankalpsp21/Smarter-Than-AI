import { createSlice } from "@reduxjs/toolkit";

interface GameSliceState {
      pinCode: string;
      websocketUserId: string;
      currentRoundPrompt: string;
      currentRoundUserResponse: string;
      currentRoundNumber: number;
      currentCountdownTimer: number;
      currentRoundUserVote: string;
      currentGameUserEliminated: string;
      currentGamePlayersCount: number;
}

`
Persistent data? Ask Team
total score
total games played (completed)
current rank (based on score)
wins
losses
`

// Initial State
const initialState: GameSliceState = {
      pinCode: "",
      websocketUserId: "",
      currentRoundPrompt: "",
      currentRoundUserResponse: "",
      currentRoundNumber: 0,
      currentCountdownTimer: 0,
      currentRoundUserVote: "",
      currentGameUserEliminated: "",
      currentGamePlayersCount: 0
};

// Slice
export const gameSlice = createSlice({
      name: "game",
      initialState,
      reducers: {
            setPinCode: (state, action) => {
                  state.pinCode = action.payload;
            },
            setWebsocketUserId: (state, action) => {
                  state.websocketUserId = action.payload;
            },
            setCurrentRoundPrompt: (state, action) => {
                  state.currentRoundPrompt = action.payload;
            },
            setCurrentRoundUserResponse: (state, action) => {
                  state.currentRoundUserResponse = action.payload;
            },
            setCurrentRoundNumber: (state, action) => {
                  state.currentRoundNumber = action.payload;
            },
            setCurrentCountdownTimer: (state, action) => {
                  state.currentCountdownTimer = action.payload;
            },
            setCurrentRoundUserVote: (state, action) => {
                  state.currentRoundUserVote = action.payload;
            },
            setCurrentGameUserEliminated: (state, action) => {
                  state.currentGameUserEliminated = action.payload;
            },
            setCurrentGamePlayersCount: (state, action) => {
                  state.currentGamePlayersCount = action.payload;
            }
      }
});

// Action Creators
export const {
      setPinCode,
      setWebsocketUserId,
      setCurrentRoundPrompt,
      setCurrentRoundUserResponse,
      setCurrentRoundNumber,
      setCurrentCountdownTimer,
      setCurrentRoundUserVote,
      setCurrentGameUserEliminated,
      setCurrentGamePlayersCount
} = gameSlice.actions;

// Selector Accessors
export const selectPinCode = (state: { game: GameSliceState }) => state.game.pinCode;
export const selectWebsocketUserId = (state: { game: GameSliceState }) => state.game.websocketUserId;
export const selectCurrentRoundPrompt = (state: { game: GameSliceState }) => state.game.currentRoundPrompt;
export const selectCurrentRoundUserResponse = (state: { game: GameSliceState }) => state.game.currentRoundUserResponse;
export const selectCurrentRoundNumber = (state: { game: GameSliceState }) => state.game.currentRoundNumber;
export const selectCurrentCountdownTimer = (state: { game: GameSliceState }) => state.game.currentCountdownTimer;
export const selectCurrentRoundUserVote = (state: { game: GameSliceState }) => state.game.currentRoundUserVote;
export const selectCurrentGameUserEliminated = (state: { game: GameSliceState }) => state.game.currentGameUserEliminated;
export const selectCurrentGamePlayersCount = (state: { game: GameSliceState }) => state.game.currentGamePlayersCount;

export default gameSlice.reducer;
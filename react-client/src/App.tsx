import Test from "./pages/Test";
import Landing from "./pages/Landing";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import Game from "./pages/Vote";
import Result from "./pages/Result";
import Lobby from "./pages/Lobby";
import Prompt from "./pages/Prompt";
import Message from "./pages/Message";
import Play from "./pages/Play";
import Vote from "./pages/Vote";
import { Amplify } from "aws-amplify";
import { ThemeProvider, Theme } from "@aws-amplify/ui-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

// Use next two lines only if syncing with the cloud
import awsExports from "./aws-exports";
import ModalTest from "./pages/ModalTest";
Amplify.configure(awsExports);

const theme: Theme = {
  name: "my-theme",
  tokens: {
    colors: {
      font: {
        primary: { value: "#ffffff" },
      },
    },
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/join-game" element={<JoinGame />} />
            <Route path="/play" element={<Play />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/result" element={<Result />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/message" element={<Message />} />
            <Route path="/test" element={<Test />} />
            <Route path="/dev" element={<ModalTest />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

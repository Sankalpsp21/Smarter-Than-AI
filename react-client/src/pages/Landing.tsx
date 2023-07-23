import { ToggleButton } from "../components/Buttons";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { HelpButton } from "../components/HelpButton";
import { LoginButton } from "../components/LoginButton";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <LoginButton color="#000000" onClick={() => navigate("login")}></LoginButton> 
      <h1>ARE YOU SMARTER THAN AN AI?</h1>
      <ToggleButton color="#FF6DDF" onClick={() => navigate("create-game")}>
        Create a new game
      </ToggleButton>
      <ToggleButton color="#62A1FF" onClick={() => navigate("join-game")}>
        Join existing game
      </ToggleButton>
      <HelpButton color="#000000" onClick={() => navigate("help")}>
        ?
      </HelpButton>
    </>
  );
};

export default Landing;

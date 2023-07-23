import { ToggleButton } from "../components/Buttons";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <ToggleButton color="#FF6DDF" onClick={() => navigate("create-game")}>
        Create a new game
      </ToggleButton>
      <ToggleButton color="#62A1FF" onClick={() => navigate("join-game")}>
        Join existing game
      </ToggleButton>
    </>
  );
};

export default Landing;

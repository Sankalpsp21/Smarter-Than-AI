import { Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate("create-game")}>Create a new game</Button>
      <Button onClick={() => navigate("join-game")}>Join existing game</Button>
    </>
  );
};

export default Landing;

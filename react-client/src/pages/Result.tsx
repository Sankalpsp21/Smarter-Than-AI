import { Button, Text } from "@aws-amplify/ui-react";
import { ToggleButton } from "../components/Buttons";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginButton } from "../components/LoginButton";
import { PinkCard } from "../components/Cards";
import { useState } from "react";

export function Message() {
  const location = useLocation();
  const dataFromPreviousPage = location.state;
  const [isWin, setIsWin] = useState(
    dataFromPreviousPage === "WIN" ? true : false
  );

  return (
    <>
      <Text fontSize={"8em"} fontWeight={"500"} style={{ cursor: "default" }}>
        {isWin ? "WIN!" : "LOSE..."}
      </Text>
      <Text fontWeight={"500"} style={{ cursor: "default" }}>
        {isWin
          ? "Congratulations! You beat the AI! For now..."
          : "Unfortunately, you are dumber than an AI."}
      </Text>
      <Text
        fontSize={"1.5em"}
        fontWeight={"600"}
        marginTop={"8vh"}
        style={{ cursor: "default" }}
      >
        Score
      </Text>
      <PinkCard
        style={{ marginTop: "1vh", marginBottom: "15vh", cursor: "default" }}
      >
        {isWin ? "+100" : "-100"}
      </PinkCard>
    </>
  );
}

const Result = () => {
  const navigate = useNavigate();
  return (
    <>
      <LoginButton color="#000000" />
      <Message />
      <ToggleButton color="#62A1FF" onClick={() => navigate("/")}>
        Click here to exit
      </ToggleButton>
    </>
  );
};

export default Result;

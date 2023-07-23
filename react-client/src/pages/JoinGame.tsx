import { TextField } from "@aws-amplify/ui-react";
import { ToggleButton } from "../components/Buttons";

const JoinGame = () => {
  return (
    <>
      <div>Enter pin code to join</div>
      <TextField size="default" placeholder="Pin code..." />
      <ToggleButton color="#62A1FF">Join</ToggleButton>
    </>
  );
};

export default JoinGame;

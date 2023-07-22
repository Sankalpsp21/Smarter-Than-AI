import { Button, TextField } from "@aws-amplify/ui-react";

const JoinGame = () => {
  return (
    <>
      <div>Enter pin code to join</div>
      <TextField size="default" placeholder="Pin code..." />
      <Button>Join</Button>
    </>
  );
};

export default JoinGame;

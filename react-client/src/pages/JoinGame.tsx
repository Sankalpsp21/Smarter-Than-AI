import { Button, TextField } from "@aws-amplify/ui-react";

const JoinGame = () => {
  return (
    <>
      <div>Enter pin code to join</div>
      <TextField size="default" placeholder="Pin code..." />
      <Button
        backgroundColor={"#62A1FF"}
        borderRadius={"12px"}
        paddingLeft={"4em"}
        paddingRight={"4em"}
        paddingBottom={"0.5em"}
        paddingTop={"0.5em"}
        border={"none"}
      >
        Join
      </Button>
    </>
  );
};

export default JoinGame;

import { Button, Text, Flex } from "@aws-amplify/ui-react";
import { ToggleButton } from "../components/Buttons";

const CreateGame = () => {
  return (
    <>
      <Button>Profile</Button>
      <div>Tell your friends to join this pin code</div>
      <Flex direction="row">
        <Text fontStyle="normal" textDecoration="none" alignSelf="center">
          564542
        </Text>
        <Button>Copy</Button>
      </Flex>
      <ToggleButton color="#FF6DDF">Start Game</ToggleButton>
    </>
  );
};

export default CreateGame;

import { Button } from "@aws-amplify/ui-react";

const GameNavbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "transparent",
      }}
    >
      <div>00:30</div>
      <Button>Exit</Button>
    </div>
  );
};

export default GameNavbar;

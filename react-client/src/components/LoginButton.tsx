import React, { useState } from "react";
import { Button } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import the required icon
import { Login } from "./Modals";

interface LoginButtonProps {
  color: string;
}

export function LoginButton({ color }: LoginButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <Login style={{ position: "absolute" }} />}
      <Button
        position="absolute"
        top="40px" /* Slightly inwards from the bottom */
        right="40px" /* Slightly inwards from the right */
        backgroundColor={color}
        borderRadius="50%" /* To make it perfectly round */
        width="50px" /* Adjust the width to your desired size */
        height="50px" /* Adjust the height to your desired size */
        padding="1em"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
      </Button>
    </>
  );
}

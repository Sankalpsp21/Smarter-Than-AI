import React, { useState } from "react";
import { Button } from "@aws-amplify/ui-react";
import { Help } from "./Modals";

interface HelpButtonProps {
  children: React.ReactNode;
  color: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function HelpButton({ children, color, onClick }: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && (
        <Help
          style={{ position: "absolute", zIndex: 5 }}
          onClick={handleClick}
        />
      )}
      <Button
        position="absolute"
        bottom="40px"
        right="40px"
        backgroundColor={color}
        borderRadius="50%"
        width="50px"
        height="50px"
        padding="1em"
        border="none"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </Button>
    </>
  );
}

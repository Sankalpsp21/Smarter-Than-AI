import React from "react";
import { Button } from "@aws-amplify/ui-react";

interface HelpButtonProps {
  children: React.ReactNode;
  color: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function HelpButton({ children, color, onClick }: HelpButtonProps) {
    return (
      <Button
        position="absolute"
        bottom="40px" /* Slightly inwards from the bottom */
        right="40px" /* Slightly inwards from the right */
  
        backgroundColor={color}
        borderRadius="50%" /* To make it perfectly round */
  
        width="50px" /* Adjust the width to your desired size */
        height="50px" /* Adjust the height to your desired size */
  
        padding="1em"
  
        border="none"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
  
  

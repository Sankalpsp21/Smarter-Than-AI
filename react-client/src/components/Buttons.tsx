import React from "react";
import { Button } from "@aws-amplify/ui-react";

interface ToggleButtonProps {
  children: React.ReactNode;
  color: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ToggleButton({ children, color, onClick }: ToggleButtonProps) {
  return (
    <Button
      backgroundColor={color}
      borderRadius={"12px"}
      paddingLeft={"3em"}
      paddingRight={"3em"}
      paddingBottom={"0.5em"}
      paddingTop={"0.5em"}
      border={"none"}
      boxShadow={"rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

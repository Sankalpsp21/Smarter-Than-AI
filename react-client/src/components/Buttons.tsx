import React from "react";
import { Button } from "@aws-amplify/ui-react";

interface ButtonProps {
  children: React.ReactNode;
  color: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ToggleButton({ children, color, onClick }: ButtonProps) {
  return (
    <Button
      backgroundColor={color}
      borderRadius={"12px"}
      paddingLeft={"3vw"}
      paddingRight={"3vw"}
      paddingBottom={"1vh"}
      paddingTop={"1vh"}
      border={"none"}
      boxShadow={"rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"}
      onClick={onClick}
      margin={"0.5em"}
    >
      {children}
    </Button>
  );
}

export function SubmitButton({ children, color, onClick }: ButtonProps) {
  return (
    <Button
      backgroundColor={color}
      borderRadius={"12px"}
      paddingLeft={"3vw"}
      paddingRight={"3vw"}
      paddingBottom={"1vh"}
      paddingTop={"1vh"}
      border={"none"}
      boxShadow={"rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"}
      onClick={onClick}
      margin={"0.5em"}
      type="submit"
    >
      {children}
    </Button>
  );
}

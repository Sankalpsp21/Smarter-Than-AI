import React from "react";
import { Button } from "@aws-amplify/ui-react";

interface PromptCardProps {
  children: React.ReactNode;
}

interface VoteCardProps {
  children: React.ReactNode;
}

export function PromptCard({ children }: PromptCardProps) {
  return (
    <Button
      backgroundColor={"#ffffff"}
      borderRadius={"12px"}
      paddingLeft={"3em"}
      paddingRight={"3em"}
      paddingBottom={"0.5em"}
      paddingTop={"0.5em"}
      border={"none"}
      boxShadow={"rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"}
    >
      {children}
    </Button>
  );
}

export function VoteCard({ children }: VoteCardProps) {
  return <></>;
}

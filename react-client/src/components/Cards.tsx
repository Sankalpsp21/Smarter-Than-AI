import React from "react";
import { Button, Card } from "@aws-amplify/ui-react";

interface GeneralCardProps {
  children: React.ReactNode;
}

interface PromptCardProps {
  children: React.ReactNode;
}

interface VoteCardProps {
  children: React.ReactNode;
}

export function PinkCard({ children }: GeneralCardProps) {
  return (
    <Card
      backgroundColor={"#FF6DDF"}
      fontSize={"1.2em"}
      fontWeight={"500"}
      color={"#ffffff"}
      borderRadius={"12px"}
      paddingLeft={"2vw"}
      paddingRight={"2vw"}
      paddingBottom={"1vh"}
      paddingTop={"1vh"}
      border={"none"}
      textAlign={"center"}
      boxShadow={"rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"}
      margin={"1em"}
    >
      {children}
    </Card>
  );
}

export function PromptCard({ children }: PromptCardProps) {
  return (
    <Card
      backgroundColor={"#ffffff"}
      color={"#000000"}
      borderRadius={"12px"}
      paddingLeft={"5vw"}
      paddingRight={"5vw"}
      paddingBottom={"8vh"}
      paddingTop={"8vh"}
      width={"50vw"}
      border={"none"}
      textAlign={"center"}
      boxShadow={"rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"}
    >
      {children}
    </Card>
  );
}

export function VoteCard({ children }: VoteCardProps) {
  return <></>;
}

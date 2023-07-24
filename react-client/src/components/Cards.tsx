import React from "react";
import { Button, Card, CheckboxField, Flex } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../index.css";

interface GeneralCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface LoginCardProps {
  style?: React.CSSProperties;
}

interface PromptCardProps {
  children: React.ReactNode;
}

interface VoteCardProps {
  label: string;
}

export function PinkCard({ children, style }: GeneralCardProps) {
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
      style={style}
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
      style={{ cursor: "default" }}
    >
      {children}
    </Card>
  );
}

export function VoteCard({ label }: VoteCardProps) {
  return (
    <>
      <Card
        backgroundColor={"#ffffff"}
        color={"#000000"}
        borderRadius={"12px"}
        paddingRight={"5vw"}
        width={"60%"}
        textAlign={"center"}
        fontWeight={"500"}
        style={{ cursor: "default" }}
        fontSize={"1.2em"}
        boxShadow={"rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"}
      >
        <Flex direction="row">
          <CheckboxField label={label} name="vote" value="no" size="large" />
        </Flex>
      </Card>
    </>
  );
}

export function LoginCard({ style }: LoginCardProps) {
  return (
    <Card
      backgroundColor="white"
      borderRadius="50%" /* To make it perfectly round */
      width="80px" /* Adjust the width to your desired size */
      height="80px" /* Adjust the height to your desired size */
      padding="1em"
      border="none"
      boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 4px 0px"
      alignSelf="center"
      textAlign="center"
      style={style}
    >
      <FontAwesomeIcon
        icon={faUser}
        fontSize="40px"
        style={{ color: "#000000", alignSelf: "center" }}
      />
    </Card>
  );
}

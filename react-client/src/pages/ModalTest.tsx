import {
  Login,
  SignIn,
  SignUp,
  Exit,
  StatData,
  Verification,
  Help,
} from "../components/Modals";
import { Stats } from "../components/Modals";
import React, { useState } from "react";
import Checkbox from "../components/Checkbox";
import { PinkCard } from "../components/Cards";

const ModalTest = () => {
  const data: StatData = {
    totalScore: 100,
    gamesPlayed: 100,
    wins: 100,
    losses: 100,
  };
  return (
    <>
      <Help />
    </>
  );
};

export default ModalTest;

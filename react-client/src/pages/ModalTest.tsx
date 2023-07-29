import {
  Login,
  SignIn,
  SignUp,
  Exit,
  StatData,
  Verification,
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
      <Checkbox value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
      <Checkbox value="Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello " />
      <Checkbox value="HO" />
    </>
  );
};

export default ModalTest;

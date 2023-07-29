import { Login, SignIn, SignUp, Exit } from "../components/Modals";
import React, { useState } from "react";
import Checkbox from "../components/Checkbox";

const ModalTest = () => {
  const [checkboxStates, setCheckboxStates] = useState<Array<boolean>>(
    new Array(7).fill(false)
  );

  const checkOnlyOne = (index: number) => {
    setCheckboxStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? true : false))
    );
  };

  return (
    <>
      <Checkbox
        value={"This is value"}
        onChange={() => checkOnlyOne(0)}
        onClick={() => checkOnlyOne(0)}
        checked={checkboxStates[0]}
      />
      <Checkbox
        value={"This is value"}
        onChange={() => checkOnlyOne(1)}
        onClick={() => checkOnlyOne(1)}
        checked={checkboxStates[1]}
      />
      <Checkbox
        value={"This is value"}
        onChange={() => checkOnlyOne(2)}
        onClick={() => checkOnlyOne(2)}
        checked={checkboxStates[2]}
      />
      <Checkbox
        value={"This is value"}
        onChange={() => checkOnlyOne(3)}
        onClick={() => checkOnlyOne(3)}
        checked={checkboxStates[3]}
      />
      <Checkbox
        value={"This is value"}
        onChange={() => checkOnlyOne(4)}
        onClick={() => checkOnlyOne(4)}
        checked={checkboxStates[4]}
      />
      <Checkbox
        value={"This is value"}
        onChange={() => checkOnlyOne(5)}
        onClick={() => checkOnlyOne(5)}
        checked={checkboxStates[5]}
      />
      <Checkbox
        value={"This is value"}
        onChange={() => checkOnlyOne(6)}
        onClick={() => checkOnlyOne(6)}
        checked={checkboxStates[6]}
      />
    </>
  );
};

export default ModalTest;

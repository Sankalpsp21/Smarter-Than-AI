import { SignIn, SignUp } from "../components/Modals";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Account = () => {
  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(location.state === "SignIn");
  const [isSignUp, setIsSignUp] = useState(location.state === "SignUp");
  return (
    <>
      {isSignIn && <SignIn />}
      {isSignUp && <SignUp />}
    </>
  );
};

export default Account;

import { Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/")}>Click here to exit</Button>;
};

export default Result;

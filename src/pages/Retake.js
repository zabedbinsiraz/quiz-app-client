import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./../components/Button";

export const Retake = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  function handleRetake() {
    navigate(`/quiz/${id}`, { replace: true });
  }
  return (
    <div>
      <Button onClick={handleRetake}>RETAKE</Button>
    </div>
  );
};

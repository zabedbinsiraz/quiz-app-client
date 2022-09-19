import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const SingleResult = () => {
  const [current, setCurrent] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  setTimeout(singleHandler, 5000);
  function singleHandler() {
    setCurrent((current) => current + 1);
    navigate(`/quiz/${id}`, { state: current + 1 });
  }
  return <div>SingleResult</div>;
};

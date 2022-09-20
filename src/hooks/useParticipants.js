import { useEffect, useState } from "react";

export default function useParticipants(userId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [participants, setParticipants] = useState([]);
 
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/quiz/user/participation`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user:userId}),
    })
      .then((res) => res.json())
      .then((result) => {
        setParticipants(result.data);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  return {
    loading,
    error,
    participants,
  };
}

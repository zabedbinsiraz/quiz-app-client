import { useEffect, useState } from "react";

export default function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.result);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  return {
    loading,
    error,
    users,
  };
}

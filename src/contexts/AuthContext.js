import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState();

  const [createdQuizId,setCreatedQuizId]=useState();

  const [qna, setQna] = useState([]);
  const [participantData, setParticipantData] = useState();

  // create question
  async function createQuestion(questionObj) {
    const url = `http://localhost:4000/quiz/question`;

    try {
     
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionObj),
      });
     
      return await response.json();
    } catch (err) {
      console.error(err);
     
      // Handle errors here
    }
  }

  //create quiz
  async function createQuiz(quizData) {
    const url = `http://localhost:4000/quiz`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: quizData,
      })
      return await res.json();
      
    } catch (error) {
      console.log(error)
    }

    //  await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: quizData,
    //   }).then(res=>res.json())
    //      .then(result=>setCreatedQuizId(result.id))
    //      .catch(err=>console.log(err))
      
   
  }

  // signup function
  async function signup(name, email, password) {
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    const url = `http://localhost:4000/user/`;

    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (err) {
      console.error(err);
      // Handle errors here
    }
  }

  // login function
  async function login(email, password) {
    const userData = {
      email: email,
      password: password,
    };

    const url = `http://localhost:4000/auth`;

    try {
      let response = await fetch(url, {
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response);
      let result = await response.json();
      console.log(result);
      setCurrentUser(result.data);
      setToken(result.json_token);
      console.log(token);
      setLoading(false);

      // console.log(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      // Handle errors here
    }
  }

  // logout function
  async function logout() {
    const url = `http://localhost:4000/auth`;

    try {
      await fetch(url, {
        method: "DELETE",
      });
      setCurrentUser({});
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      // Handle errors here
    }
  }

  const value = {
    error,
    loading,
    currentUser,
    signup,
    login,
    logout,
    createQuiz,
    createdQuizId,
    createQuestion,
    qna,
    setQna,
    setParticipantData,
    participantData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

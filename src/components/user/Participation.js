import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import classes from "../../styles/Users.module.css";

export const Participation = () => {
  const {currentUser} = useAuth()
  const [participants,setParticipants ]   = useState([]);
  const id = currentUser.userId;
  console.log(participants);

  useEffect(() => {
   
    fetch(`http://localhost:4000/quiz/user/participation/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setParticipants(result.data);
        
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(currentUser);

  return (
    <div className={classes.manageUserContainer}>
      <div className={classes.title}>
        <h2>Your Participation List</h2>
      </div>

      <div className={classes.usersTable}>
        <table>
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Obtained Marks</th>
              <th>Attended Date</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {/* akhane map kre data patanu hbe */}
            {participants.map((participant) => (
              <tr>
                <td className={classes.name}>
                  <span>{participant.quizName}</span>
                </td>
                <td style={{ color: "white" }}>{participant.marks}</td>
                <td style={{ color: "white" }}>
                  {participant.createdAt}
                </td>
                <td style={{ color: "white" }}>{participant.payment}</td>
              </tr>
            ))}

            {/* akhane map ses hbe */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

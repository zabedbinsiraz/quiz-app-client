import React from "react";
import useParticipants from "../../hooks/useParticipants";
import classes from "../../styles/Users.module.css";

export const Participation = () => {
  const { participants } = useParticipants();
  console.log(participants);

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
                  {participant.createdAt.toLocalTimeString}
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

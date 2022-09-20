import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import classes from "../../styles/Users.module.css";

export const Transaction = () => {
  const { currentUser } = useAuth();
  const userId = currentUser.userId;
  const [transaction,setTransaction] = useState({})

  

  useEffect(() => {
    
    fetch(`http://localhost:4000/user/transaction/${userId}`)
      .then((res) => res.json())
      .then((result) => {
        setTransaction(result.data);
        
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className={classes.manageUserContainer}>
      <div className={classes.title}>
        <h2>Your Transaction</h2>
      </div>

      <div className={classes.usersTable}>
        <table>
          <thead>
            <tr>
              <th>Account Email</th>
              <th>Total Balance</th>
              <th>Total Transaction</th>
              <th>Got Refund</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={classes.name}>
                <span>{currentUser.email}</span>
              </td>
              <td style={{ color: "white" }}>{transaction?.balance || 0}</td>
              <td style={{ color: "white" }}>{transaction?.transaction + transaction?.refund || 0}</td>
              <td style={{ color: "white" }}>{transaction?.refund || 0}</td>
            </tr>

            {/* akhane map ses hbe */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

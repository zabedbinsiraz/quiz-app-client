import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import useTransaction from "../../hooks/useTransaction";
import classes from "../../styles/Users.module.css";

export const Transaction = () => {
  const { currentUser } = useAuth();

  const { transaction } = useTransaction(currentUser.userId);
  console.log(transaction);

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
              <td style={{ color: "white" }}>{transaction.balance}</td>
              <td style={{ color: "white" }}>{transaction.transaction}</td>
              <td style={{ color: "white" }}>{transaction.refund}</td>
            </tr>

            {/* akhane map ses hbe */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "../../styles/DashNav.module.css";

export const AdminDashboard = () => {
  return (
    <div>
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <Link to="/admin/createQuiz">Quiz create</Link>
        </div>

        <div className={classes.menuItem}>
          <Link to="/admin/quizlist">Quiz List</Link>
        </div>

        <div className={classes.menuItem}>
          <Link to="/admin/users">Users</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

import React from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "../styles/DashNav.module.css";

export const Dashboard = () => {
  return (
    <div>
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <Link to="/dashboard/participation">Participation</Link>
        </div>
        <div className={classes.menuItem}>
          <Link to="/dashboard/transaction">Transaction</Link>
        </div>

        <div className={classes.menuItem}>
          <Link to="/admin">admin dashboard</Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

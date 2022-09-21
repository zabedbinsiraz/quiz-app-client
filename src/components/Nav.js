import { Link } from "react-router-dom";
import classes from "../styles/Nav.module.css";
import { useAuth } from './../contexts/AuthContext';
import Account from "./Account";

export default function Nav() {
  const {currentUser} = useAuth();
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/home" className={classes.brand}>
            <h3>Quiz App</h3>
          </Link>
        </li>
        {
          currentUser?.email && <li>
          <Link to="/dashboard" className={classes.brand}>
            <p>Dashboard</p>
          </Link>
        </li>
        }
      </ul>
      <Account />
    </nav>
  );
}
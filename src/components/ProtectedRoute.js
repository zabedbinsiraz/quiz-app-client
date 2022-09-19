import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser.role === "admin" ? (
    children
  ) : (
    <p>User Not Authorized For Admin Dashboard Route</p>
  );
}

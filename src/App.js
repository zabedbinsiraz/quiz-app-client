import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { CreateQuiz } from "./components/admin/CreateQuiz";
import { QuizList } from "./components/admin/QuizList";
import { Users } from "./components/admin/Users";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { Participation } from "./components/user/Participation";
import { Transaction } from "./components/user/Transaction";
import { AuthProvider } from "./contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import QuizPage from "./pages/QuizPage";
import Result from "./pages/Result";
import { Retake } from "./pages/Retake";
import Signup from "./pages/Signup";
import { SingleResult } from "./pages/SingleResult";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                {" "}
                <Home />{" "}
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                {" "}
                <Dashboard />{" "}
              </PrivateRoute>
            }
          >
            <Route path="transaction" element={<Transaction />}></Route>
            <Route path="participation" element={<Participation />}></Route>
          </Route>
          <Route
            path="/quiz/:id"
            element={
              <PrivateRoute>
                {" "}
                <QuizPage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/result/:id"
            element={
              <PrivateRoute>
                {" "}
                <Result />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/singleResult/:id"
            element={
              <PrivateRoute>
                {" "}
                <SingleResult />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/retake/:id"
            element={
              <PrivateRoute>
                {" "}
                <Retake />{" "}
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                {" "}
                <AdminDashboard />{" "}
              </ProtectedRoute>
            }
          >
            <Route path="quizList" element={<QuizList />}></Route>
            <Route path="createQuiz" element={<CreateQuiz />}></Route>
            <Route path="users" element={<Users />}></Route>
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;

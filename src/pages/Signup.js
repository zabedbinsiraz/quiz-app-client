import Illustration from "../components/Illustration";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration />
        <SignupForm />
      </div>
    </>
  );
}

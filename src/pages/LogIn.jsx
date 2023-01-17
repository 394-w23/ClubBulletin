import { NavLink } from "react-router-dom";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/logIn.css";
const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>
    Sign out
  </button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const activation = ({ isActive }) => (isActive ? "active" : "inactive");

const LogIn = () => (
  <div className="main">
    <div className="text">
      <h1>Club Bulletin</h1>
      <p>Sign in to view posts and join clubs.</p>
      <AuthButton />
    </div>
  </div>
);

export default LogIn;

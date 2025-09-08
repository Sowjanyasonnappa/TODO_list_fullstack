import './App.css'
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Taskmanager from "./components/Taskmanager";
import Test from './Test';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <h1>TODO App</h1>
      {!user ? (
        showRegister ? (
          <>
            <RegistrationForm onRegister={() => setShowRegister(false)} />
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setShowRegister(false)}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onLogin={handleLogin} />
            <p>
              Don’t have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </p>
          </>
        )
      ) : (
        <Taskmanager />
      )}

     <Test />
    </div>
  );
}

export default App;

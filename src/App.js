import logo from './logo.svg';
import './App.css';
import { useFirebase } from "./context/Firebase";
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebase = useFirebase();

  return (
    <div className="App">
      <h1>Firebase</h1>
      <input type='email'
        placeholder='Enter your email'
        onChange={e => setEmail(e.target.value)}
        value={email}
        style={{ margin: "10px" }} />
      <input type='password'
        placeholder='Enter password'
        onChange={e => setPassword(e.target.value)}
        value={password}
        style={{ margin: "10px" }} />
      <button onClick={() => {
        firebase.signupUserWithEmailAndPassword(email, password)
        firebase.putData("users/" + "test", { email, password })
      }}>Signup</button>
    </div>
  );
}

export default App;

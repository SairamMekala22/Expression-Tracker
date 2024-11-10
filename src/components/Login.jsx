// //Login.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import './ap.css';
// import car from './car.jpg'

// function Login({ setAuthenticated, setUser }) {
//   const history = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/login", {
//         email,
//         password,
//       });

//       if (response.data.status === "authenticated") {
//         setAuthenticated(true);
//         setUser(response.data.user);
//         history("/home");
//       } else {
//         setError("Invalid email or password");
//       }
//     } catch (error) {
//       setError("Error logging in");
//       console.log(error);
//     }
//   }

//   return (
//     <div className="login">

//   <form action="POST"  className="form">
//     <img src={car} alt="Car" style={{ width: '100px', height: 'auto' }}/>
//     <h1>Login</h1>
//     <input className="user"
//       type="email"
//       onChange={(e) => setEmail(e.target.value)}
//       placeholder="Email"/>
//     <br />
//     <input
//       className="pass"
//       type="password"
//       onChange={(e) => setPassword(e.target.value)}
//       placeholder="Password"/>
//     <br />
//     <br/>
//     <input type="submit" onClick={submit} />
  
//   {error && <div style={{ color: "red" }}>{error}</div>}

  
//   <p>Don't have an account? </p>
//   <br></br>

//   <Link to="/signup">Register ?</Link>
//   <br></br>
//   </form>
// </div>
//   );
// }

// export default Login;
// Login.jsx
// Login.jsx
// Login.jsx
// Login.jsx
// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './ap.css';
import user from './userlogo.png';

function Login({ setAuthenticated, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (response.data.status === "authenticated") {
        setAuthenticated(true);
        setUser(response.data.user);
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Error logging in");
    }
  }

  return (
    <div className="login">
      <form action="POST" className="form">
        <img src={user} alt="Car" style={{ width: '100px', height: 'auto' }} />
        <h1>Login</h1>
        <input
          className="user"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          className="pass"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <br />
        <input type="submit" onClick={submit} />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <p>Don't have an account?</p>
        <br />
        <Link to="/signup">Register?</Link>
        <br />
        <Link to="/forgot-password">Forgot Password?</Link> {/* Added Forgot Password Link */}
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // form function

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate( location.state|| "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went Wrong`);
    }
  };
  console.log(process.env.REACT_APP_API);
  return (
    <Layout title={"Log in to SewChic"}>
      <div className="login">
        <div className="container ">
          <h1>Login</h1>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="col-12">
              <div className="mb-3">

              <button type="button" className="btn btn-primary" onClick={ () => {navigate('/forgot-password')}}>
                Forgot Password
              </button>

              </div>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
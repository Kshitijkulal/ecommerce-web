import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [question,setQuestion] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    // form function
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
          email,
          newPassword,
          answer
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          

          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(`Something went Wrong`);
      }
    };


  return (
    <Layout title={"SewChic -Forgot Password"}>
        <div className="login">
        <div className="container ">
          <h1>Reset Password</h1>
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
            <div className="col-md-4">
            <label htmlFor="inputAnswer" className="form-label">
                Question for Security
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAnswer"
                placeholder={`Answer to '${question}'`} // Use the selected question
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                }}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputNewPassword4" className="form-label">
               New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputNewPassword4"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="col-12">
              <div className="mb-3">

              </div>
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword
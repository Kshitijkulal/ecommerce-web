import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const fullAddress = `${address + address2}`;
  const navigate = useNavigate();
// array of states
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

  // form function

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name,
        email,
        password,
        fullAddress,
        question,
        answer
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
    <Layout title={"Register to SewChic"}>
      <div classname="register">
        <div className="container ">
          <h1>Register Page</h1>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label htmlFor="inputName4" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="Your First Name and last Name"
                required
              />
            </div>
            <div className="col-md-6">
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
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress2" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                value={address2}
                onChange={(event) => {
                  setAddress2(event.target.value);
                }}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">
                State
              </label>
              <select
                id="inputState"
                className="form-select"
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                }}
                required
              >
                <option value="">Choose...</option>
                {indianStates.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
            <label htmlFor="inputQuestion" className="form-label">
                Question for Security
              </label>
              <select
                id="inputQuestion"
                className="form-select"
                value={question} // Set the value to the selected question
                onChange={(event) => {
                  setQuestion(event.target.value); // Update the selected question
                }}
                required
              >
                <option value="">Choose...</option>
                <option>What is your Mother's name ?</option>
                <option>What is your Father's name ?</option>
                <option>Where was your childhood spent ?</option>
              </select>
            </div>
            <div className="col-md-8">
              <label htmlFor="inputAnswer" className="form-label">
                Answer
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
            <div className="col-md-2">
              <label htmlFor="inputZip" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                value={zip}
                onChange={(event) => {
                  setZip(event.target.value);
                }}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

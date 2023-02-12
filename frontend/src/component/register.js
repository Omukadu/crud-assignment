import React, { useState } from "react";
import { NavLink ,useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate("");
  const [inpval, setinpval] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    job: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setinpval((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
// sending data to backend 
  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, job } = inpval;
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, age, mobile, job }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      alert("user exist or invalid data");
    } else {
      alert("data added");
      console.log(data);
      navigate("/")
    }
  };
  
  return (
    <div className="container">
    <NavLink to="/">Home</NavLink>
      <form>
        <div className="row">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={inpval.name}
              onChange={setdata}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={inpval.email}
              onChange={setdata}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={inpval.age}
              onChange={setdata}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              name="mobile"
              value={inpval.mobile}
              onChange={setdata}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Job
            </label>
            <input
              type="text"
              name="job"
              value={inpval.job}
              onChange={setdata}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={addinpdata}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

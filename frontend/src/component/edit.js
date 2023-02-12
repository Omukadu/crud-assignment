import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const Edit = () => {
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
  const [getuserdata, setuserdata] = useState([]);
  const { id } = useParams("");
  console.log(id);
  // console.log(getuserdata);

  const getdata = async () => {
    const res = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("user exist or invalid data");
      console.log("error");
    } else {
      setinpval(data); //get from db and put into empty edit state
      console.log("getdata");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateusers = async (e) => {
    e.preventDefault();
    const { name, email, job, password, age } = inpval;
    const res2 = await fetch(`http://localhost:8000/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        job,
        password,
        age,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);
    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      alert("data added");
      navigate("/")
    } 
  };

  return (
    <div className="container mt-5">
      
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
              type="text"
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
            onClick={updateusers}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;

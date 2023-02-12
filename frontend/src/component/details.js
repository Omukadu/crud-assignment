import React, { useEffect , useState} from "react";
import { useParams,NavLink } from "react-router-dom";

const Details = () => {
  const [getuserdata, setuserdata] = useState([]);
  const { id } = useParams("");
  // console.log(id);
  // console.log(getuserdata);


  const getdata = async () => {
    const res = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      alert("user exist or invalid data");
      console.log("error");
    } else {
      setuserdata(data);
    }
  };

  useEffect(() => {getdata()},[]);

  return (
    <div className="container mt-4">
      <h1>Welcome back {getuserdata.name}</h1>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt=""
        style={{ height: "100px" }}
      />
      <h3>
        Name: <span>{getuserdata.name}</span>
      </h3>
      <h3>
        Email: <span>{getuserdata.email}</span>
      </h3>
      <h3>
        Age: <span>{getuserdata.age}</span>
      </h3>
      <h3>
        Mobile: <span>{getuserdata.mobile}</span>
      </h3>
      <h3>
        Job: <span>{getuserdata.job}</span>
      </h3>
      <div className="buttons">
      <NavLink to="/">
         
        <button className="btn-primary btn m-2">back to home</button>
      </NavLink>
      </div>
    </div>
  );
};

export default Details;

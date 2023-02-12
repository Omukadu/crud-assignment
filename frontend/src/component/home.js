import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const Home = () => {
  const [getuserdata, setuserdata] = useState([]);

  const getdata = async (e) => {
    const res = await fetch("http://localhost:8000/getdata", {
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
      console.log(getuserdata);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8000/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      console.log("error deleting");
    } else {
      console.log("userdeleted");
      alert("user deleted");
      getdata();
    }
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          <NavLink className="btn btn-warning" to="/register">
            Add User
          </NavLink>
        </div>

        <table className="table ">
          <thead >
            <tr className="table-dark">
              <th scope="col">id</th>
              <th scope="col">profile</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">job</th>
              <th scope="col">age</th>
              <th scope="col"className="action">Actions</th>
            </tr>  
          </thead>
          <tbody>
            {getuserdata.map((element, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" style={{width:"50px"}}/></td>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.job}</td>
                    <td>{element.age}</td>

                    <td className="d-flex justify-content-evenly">
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn-success btn ">read</button>
                      </NavLink>
                      <NavLink to={`edit/${element._id}`}>
                        <button className="btn-primary btn ">update</button>
                      </NavLink>

                      <button className="btn-danger btn" onClick={()=>{deleteuser(element._id)}}>
                        delete
                      </button> 
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

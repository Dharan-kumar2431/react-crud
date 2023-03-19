import { useEffect, useState } from "react";
import "./Userlist.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [userData, setUserData] = useState([]);

  const url = "http://localhost:4321/user";

  const deleteUserData = (id) =>{
    axios.delete(`${url}/${id}`).then((res)=>{
      const AfterdeletData = userData.filter((item)=> item._id !== id)
      setUserData(AfterdeletData);
    }).catch(()=>{

    })
  }

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <button className="btn btn-primary">
          <Link className="text-warning" to="/createuser">
            Create User
          </Link>
        </button>
      </div>
      <div>
        <table className="userListTable">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Password</th>
              <th>Place</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((values) => (
              <tr key={values._id}>
                <td>{values._id}</td>
                <td>{values.name}</td>
                <td>{values.email}</td>
                <td>{values.phone}</td>
                <td>{values.password}</td>
                <td>{values.place}</td>
                <td className="btn btn-primary m-3">
                  <Link to={`/edituser/${values._id}`} className="text-warning">
                    Edit
                  </Link>
                </td>
                <td><button className="btn btn-primary" onClick={() => deleteUserData(values._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userlist;

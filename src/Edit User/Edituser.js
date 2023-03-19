import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edituser.css";

const editUserValidation = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "name is requeried";
  }

  if (!values.email) {
    errors.email = "email is requeried";
  }

  if (!values.phone) {
    errors.phone = "phone number is requeried";
  }

  if (!values.password) {
    errors.password = "password is requeried";
  } else if (
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\w\d\s:])/.test(
      values.password
    )
  ) {
    errors.password =
      "password must contain at least one lowercase letter, one uppercase letter, one digit, one special character";
  } else if (values.password.length < 8) {
    errors.password = "length must be more then 8 characters";
  }

  return errors;
};

const Edituser = () => {
  const [editUderData, setEditUserData] = useState([]);

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate()

  const url = "http://localhost:4321/user";

  const fomik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      place: "",
    },
    onSubmit: (values) => {
      axios
        .put(`${url}/${id}`, values)
        .then(() => {
          navigate('../')
        })
        .catch(() => {});
    },
    validate: editUserValidation,
  });

  useEffect(() => {
    axios
      .get(`${url}/${id}`)
      .then((res) => {
        fomik.setValues(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <h1 className="EdituserHeading">Edit User</h1>
      </div>
      <div className="edituserForm container">
        <form onSubmit={fomik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              className="form-control edituserInputs"
              id="exampleInputEmail1"
              name="name"
              placeholder="Enter name"
              value={fomik.values.name}
              onChange={fomik.handleChange}
            />
            {fomik.touched.name && !!fomik.errors.name && (
              <div className="text-danger mb-2">{fomik.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control edituserInputs"
              id="exampleInputEmail1"
              name="email"
              placeholder="Enter email"
              defaultValue={fomik.values.email}
              onChange={fomik.handleChange}
            />
            {fomik.touched.email && !!fomik.errors.email && (
              <div className="text-danger mb-2">{fomik.errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputphone">Phone Number</label>
            <input
              type="number"
              className="form-control edituserInputs"
              id="exampleInputEmail1"
              name="phone"
              placeholder="Enter phone number"
              defaultValue={fomik.values.phone}
              onChange={fomik.handleChange}
            />
            {fomik.touched.phone && !!fomik.errors.phone && (
              <div className="text-danger mb-2">{fomik.errors.phone}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control edituserInputs"
              id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              defaultValue={fomik.values.password}
              onChange={fomik.handleChange}
            />
            {fomik.touched.password && !!fomik.errors.password && (
              <div className="text-danger mb-2">{fomik.errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputplace">Place</label>
            <input
              type="text"
              className="form-control edituserInputs"
              id="exampleInputEmail1"
              name="place"
              placeholder="Enter place"
              defaultValue={fomik.values.place}
              onChange={fomik.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edituser;

import "./Createuser.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const createUserValidation = (values) =>{
    const errors = {};

    if(!values.name){
        errors.name = 'name is requeried'
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
    

    return errors
}


const Createuser = () => {
    const navigate = useNavigate();

    const url = 'http://localhost:4321/user';

    const fomik = useFormik({
        initialValues: {
            name:'',
            email:'',
            phone:'',
            password:'',
            place:'',
        },
        onSubmit : values =>{
            console.log(values)
            axios.post(url,values).then(()=>{
            navigate('../');
            }).catch(()=>{

            })


        },
        validate: createUserValidation,
    })
  return (
    <div>
        <div>
            <h1 className="createuserHeading">Create User</h1>
        </div>
      <div className="createuserForm container">
        <form onSubmit={fomik.handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              className="form-control createuserInputs"
              id="exampleInputEmail1"
              name="name"
              placeholder="Enter name"
              onChange={fomik.handleChange}
              onBlur={fomik.handleBlur}
            />
            {fomik.touched.name && !!fomik.errors.name && <div className="text-danger mb-2">{fomik.errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control createuserInputs"
              id="exampleInputEmail1"
              name="email"
              placeholder="Enter email"
              onChange={fomik.handleChange}
              onBlur={fomik.handleBlur}

            />
            {fomik.touched.email && !!fomik.errors.email && <div className="text-danger mb-2">{fomik.errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputphone">Phone Number</label>
            <input
              type="number"
              className="form-control createuserInputs"
              id="exampleInputEmail1"
              name="phone"
              placeholder="Enter phone number"
              onChange={fomik.handleChange}
              onBlur={fomik.handleBlur}
            />
            {fomik.touched.phone && !!fomik.errors.phone && <div className="text-danger mb-2">{fomik.errors.phone}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control createuserInputs"
              id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              onChange={fomik.handleChange}
              onBlur={fomik.handleBlur}

            />
            {fomik.touched.password && !!fomik.errors.password && <div className="text-danger mb-2">{fomik.errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputplace">Place</label>
            <input
              type="text"
              className="form-control createuserInputs"
              id="exampleInputEmail1"
              name="place"
              placeholder="Enter place"
              onChange={fomik.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createuser;

import { useFormik } from "formik";
import { API } from "./global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";

import { Link } from "react-router-dom";

const formvalidationschema = yup.object({
  username: yup.string().required("This is fiels is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Passwords must be at least 8 characters"),
  email: yup.string().email("email field required").required(),
});

export function Signup() {
  const successnotify = (data) => toast.success(data);
  const errornotify = (data) => toast.error(data);
  const navigate = useNavigate();

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        email: "",
      },
      validationSchema: formvalidationschema,
      onSubmit: async (values) => {
        console.log(values);
        const data = await fetch(`${API}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await data.json();
        console.log("successful", result);
        if (
          result.message === "user name already exists" ||
          result.message === "password must be at least 8 characters" ||
          result.message === "This email already exists"
        ) {
          errornotify(result.message);
        } else {
          successnotify(
            "Successfully created Activation link Sent On Register Email"
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      },
    });
  const [check, setcheck] = useState("false");
  return (
    <div>
      <nav className=" navbar navbar-expand-md bg-primary text-light navbar-dark">
        <div className="container">
          <span>URL SHORTNER</span>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#mynav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" navbar-collapse " id="mynav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item active ">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item  ">
                <Link to={"/signup"} className="nav-link">
                  Signup
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className=" row d-flex justify-content-center">
        <div className="cen shadow-lg col-11 col-md-6 col-lg-4 col-xl-4 card mt-5">
          <form className="card-body" onSubmit={handleSubmit}>
            <div>
              <ul className="nav nav-pills nav-justified mb-3" id="ex1">
                <li className="nav-item">
                  <a className="nav-link " href="/login" id="tab-login">
                    Signup
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    id="tab-register"
                    href="/signup"
                  >
                    Register
                  </a>
                </li>
              </ul>

              <div className="h" id="pills-register">
                <div className="text-center mb-3">
                  <p>Sign up with:</p>
                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-google"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-github"></i>
                  </button>
                </div>

                <p className="text-center">or:</p>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerUsername">
                    Username
                  </label>
                  <input
                    onBlur={handleBlur}
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                  {touched.username && errors.username ? errors.username : ""}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerEmail">
                    Email
                  </label>
                  <input
                    onBlur={handleBlur}
                    placeholder="Email"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                  />
                  {touched.email && errors.email ? errors.email : ""}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerPassword">
                    Password
                  </label>
                  <input
                    onBlur={handleBlur}
                    placeholder="passoword"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    type={check === false ? "text" : "password"}
                    className="form-control"
                  />
                  {touched.password && errors.password ? errors.password : ""}
                </div>
                <div className="mt-2 mb-2 form-check">
                  <input
                    id="show"
                    value=""
                    className="form-check-input"
                    onClick={() => setcheck(!check)}
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="show">
                    Show Password
                  </label>
                </div>

                <div className="form-check d-flex justify-content-center mb-4">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="registerCheck"
                    aria-describedby="registerCheckHelpText"
                  />
                  <label className="form-check-label" htmlFor="registerCheck">
                    I have read and agree to the terms
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-3"
                >
                  Signup
                </button>
                <ToastContainer />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

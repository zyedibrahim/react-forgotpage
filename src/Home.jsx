import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

import * as yup from "yup";

const formvalidationschema = yup.object({
  username: yup.string().required("This is fiels is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Passwords must be at least 8 characters"),
});

export function Home() {
  return (
    <div>
      <nav className=" navbar navbar-expand-md bg-primary text-light navbar-dark">
        <div className="container">
          <span>Forgot validation</span>
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
      <div
        className="alert alert-danger alert-dismissible text-center fade show"
        role="alert"
      >
        <strong>Note This Carfully</strong> You should check in on some of those
        Forgot validation and Signup to And Login Also
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <Login />
    </div>
  );
}

function Login() {
  const successnotify = (data) => toast.success(data);
  const errornotify = (data) => toast.error(data);

  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formvalidationschema,
      onSubmit: async (subdata) => {
        console.log(subdata);
        const data = await fetch(`${API}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subdata),
        });

        const result = await data.json();

        if (result.message === "login success") {
          localStorage.setItem("token", result.token);
          successnotify(result.message);
        } else {
          errornotify(result.message);
        }
      },
    });

  const [check, setcheck] = useState("false");
  return (
    <div>
      <div className="container">
        <div className=" row d-flex justify-content-center">
          <div className="cen shadow-lg col-11 col-md-6 col-lg-4 col-xl-4 card mt-5">
            <form className="card-body" onSubmit={handleSubmit}>
              <ul className="nav nav-pills nav-justified mb-3" id="ex1">
                <li className="nav-item" role="presentation">
                  <a className="nav-link active" id="tab-login" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="tab-register" href="/signup">
                    Register
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="pills-login"
                  role="tabpanel"
                  aria-labelledby="tab-login"
                >
                  <div className="text-center mb-3">
                    <p>Sign in with:</p>
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
                    <label className="form-label" htmlFor="loginName">
                      Email or username
                    </label>
                    <input
                      onBlur={handleBlur}
                      type="text"
                      id="loginName"
                      value={values.username}
                      name="username"
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.username && errors.username ? errors.username : ""}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">
                      Password
                    </label>
                    <input
                      onBlur={handleBlur}
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      type={check === false ? "text" : "password"}
                      id="loginPassword"
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

                  <div className="row mb-4">
                    <div className="col-md-6 d-flex justify-content-center"></div>

                    <div className="col-md-6 d-flex justify-content-center">
                      <Link to="/forgotpage">Forgot password?</Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign in
                  </button>

                  <div className="text-center">
                    <p>
                      Not a member? <a href="/signup">Register</a>
                    </p>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

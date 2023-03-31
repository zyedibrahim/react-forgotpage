import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { API } from "./global";

const formvalidationschema = yup.object({
  email: yup.string().email("email field required").required(),
});

export function Forgotpage() {
  const successnotify = (data) => toast.success(data);
  const warningnotify = (data) => toast.warning(data);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formvalidationschema,
    onSubmit: (values) => {
      console.log(values);
      // notify();
      fetch(`${API}{/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message !== "email not found") {
            successnotify("Send Link Successfully in email");
            setTimeout(() => {
              navigate("/");
            }, 5000);
          } else {
            warningnotify(data.message);
          }
        });
    },
  });

  return (
    <div>
      <div className="container">
        <div className="row mt-5 d-flex justify-content-center">
          <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="mb-2">
              <div className="h3 text-center ">
                Reset Link We Will Be Sent On Register Email
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card p-3">
                <div className="mb-2">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    id="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                  <ToastContainer />
                  <div className="d-flex justify-content-between">
                    <Link to="/" className="mt-1 text-decoration-none">
                      Login
                    </Link>
                    <Link to="/signup" className="mt-1 text-decoration-none">
                      Signup
                    </Link>
                  </div>

                  <div className="text-muted text-center">
                    <h6>Contact about us </h6>
                    <h6>exapamle@gmail.com</h6>
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

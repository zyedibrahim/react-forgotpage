import { useNavigate, useSearchParams } from "react-router-dom";
import { API } from "./global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ActivationPage() {
  const notifysuccess = (data) => toast.success(data);
  const notifyerror = (data) => toast.error(data);
  const navigate = useNavigate();

  let [state, setstate] = useSearchParams();
  const id = state.get("id");
  const token = state.get("token");

  async function activation() {
    const data = await fetch(
      `${API}/users/activation?id=${id}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(),
      }
    );

    const result = await data.json();
    if (result.message !== "succcessfully Activated") {
      notifyerror(result.message);
    } else {
      notifysuccess(result.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }

    console.log(result);
  }

  return (
    <div>
      <div> Activae Your Account</div>
      <div>
        <button onClick={() => activation()}> Click To Activae</button>
      </div>
      <ToastContainer />
    </div>
  );
}

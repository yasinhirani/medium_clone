import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Context";

const ProtectedRoute = ({ Component }) => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (authData === null) {
      navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};
export default ProtectedRoute;

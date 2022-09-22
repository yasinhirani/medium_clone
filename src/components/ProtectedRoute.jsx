import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Context";

const ProtectedRoute = ({ Component }) => {
  const { authData, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && authData === null) {
      navigate("/");
    }
    // console.log("use effect run");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return <Component />;
};
export default ProtectedRoute;

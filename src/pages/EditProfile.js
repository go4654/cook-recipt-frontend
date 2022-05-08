import { useNavigate } from "react-router-dom";
import { logoutUser } from "../apollo";
import { routes } from "../routes";

export const EditProfile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.home);
    logoutUser();
  };

  return (
    <div>
      EditProfile <button onClick={handleClick}>logout</button>
    </div>
  );
};

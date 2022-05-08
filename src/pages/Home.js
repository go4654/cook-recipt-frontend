import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeVar, logoutUser, offDarkMode, onDarkMode } from "../apollo";

export const Home = () => {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <div>
      Home
      <button onClick={logoutUser}>logout</button>
      <button onClick={darkMode ? offDarkMode : onDarkMode}>
        {darkMode ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import { HomePage } from "./Components/HomePage";
import { useAuthContext } from "./Providers/UseContext";
import { useEffect } from "react";

function App() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(`user-profile/${user.username}`);
  }, [navigate, user]);

  return (
    // <>{user ? navigate(`/user-profile/${user.username}`) : <HomePage />}</>
    <HomePage />
  );
}

export default App;

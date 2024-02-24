import { useNavigate } from "react-router-dom";
import { HomePage } from "./Components/HomePage";
import { useAuthContext } from "./Providers/UseContext";

function App() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <>{user ? navigate(`/user-profile/${user.username}`) : <HomePage />}</>
  );
}

export default App;

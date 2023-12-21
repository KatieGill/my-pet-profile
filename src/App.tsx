import "./App.css";
import { HomePage } from "./Components/HomePage";
import { UserProfile } from "./Components/UserProfile/UserProfile";
import { useAuthContext } from "./Providers/UseContext";

function App() {
  const { user } = useAuthContext();
  return <>{user ? <UserProfile /> : <HomePage />}</>;
}

export default App;

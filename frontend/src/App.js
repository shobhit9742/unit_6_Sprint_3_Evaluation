import "./App.css";
import { Route, Router } from "react-router-dom";
const axios = "axios";
const Layout = "./Layout";
const UserContextProvider = "./UserContext";
axios.defualts.baseURL = "http://localhost:4000/";
axios.defualts.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Route path="/" element={<Layout />} />
        <Route path="/" element={<Layout />} />
      </Router>
    </UserContextProvider>
  );
}

export default App;

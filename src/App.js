import { useState } from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

function App() {

  const [user, setUser] = useState(null);

  return (
    <div>
      {/* Routes */}
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login user={user} setUser={setUser} />} />
          <Route exact path="/home" element={<Home user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
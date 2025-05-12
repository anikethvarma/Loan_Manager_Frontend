import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

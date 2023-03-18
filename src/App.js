import './App.css';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/homePage'
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useContext } from 'react';
import NoteContext from './context/notes/NoteContext';


function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<HomePage />} ></Route>
            <Route exact path="/about" element={<About />} ></Route>
            <Route exact path="/login" element={<Login />} ></Route>
            <Route exact path="/signup" element={<SignUp />} ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;

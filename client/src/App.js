import './App.css';
import {BrowserRouter, Route,Routes} from"react-router-dom"
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import CreateListing from "./pages/CreateListing";
function App() {
  return (
    <div>
 <BrowserRouter>
      <Routes>
        <Route path='/' element={< HomePage/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={< Login/>}/>
        <Route path="/create-listing" element={<CreateListing />} />
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;

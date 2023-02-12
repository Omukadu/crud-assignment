import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './component/home'
import Edit from './component/edit'
import Register from './component/register'
import Details from './component/details'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/edit/:id' element={<Edit/>}/>
          <Route exact path='/view/:id' element={<Details/>}/>

          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

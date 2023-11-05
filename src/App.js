import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup';
import Reducer from './components/Reducer';
import Success from './components/Success';
import Cancel from './components/Cancel';

function App() {
  return (
    <Reducer>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            
            <Route exact path="/success" element={<Success/>} />
            <Route exact path="/cancel" element={<Cancel/>} />
            

          </Routes>
        </div>
      </Router>
    </Reducer>

  );
}

export default App;

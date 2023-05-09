import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';

function App() {
  return (
    <div>
      <router>
      <div>
              
              <Routes>
              
              <Route path="/" exact element={<LoginComponent/>}></Route>
              <Route path="/dashboard" exact element={<DashboardComponent/>}></Route>
              

              </Routes>
              </div>
      </router>
    </div>
  );
}

export default App;

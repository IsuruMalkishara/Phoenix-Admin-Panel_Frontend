import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import NavbarComponent from './components/NavbarComponent';
import VacancyComponent from './components/VacancyComponent';

function App() {
  return (
    <div>
      <router>
      <div>
              
              <Routes>
              
              <Route path="/" exact element={<LoginComponent/>}></Route>

              </Routes>

              <Routes>
                 
                 
                  <Route path="/vacancy" element={<> <NavbarComponent/><VacancyComponent/></>}></Route>
              </Routes>
              </div>
      </router>
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import NavbarComponent from './components/NavbarComponent';
import VacancyComponent from './components/VacancyComponent';
import VacancyDataComponent from './components/VacancyDataComponent';
import RequestComponent from './components/RequestComponent';
import EditVacncyComponent from './components/EditVacancyComponent';

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
                  <Route path="/vacancy/:id" element={<> <NavbarComponent/><VacancyDataComponent/></>}></Route>
                  <Route path="/vacancy/:id/request" element={<> <NavbarComponent/><RequestComponent/></>}></Route>
                  <Route path="/vacancy/:id/edit" element={<> <NavbarComponent/><EditVacncyComponent/></>}></Route>
              </Routes>
              </div>
      </router>
    </div>
  );
}

export default App;

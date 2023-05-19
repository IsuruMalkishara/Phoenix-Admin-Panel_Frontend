import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import NavbarComponent from './components/NavbarComponent';
import VacancyComponent from './components/VacancyComponent';
import VacancyDataComponent from './components/VacancyDataComponent';
import RequestComponent from './components/RequestComponent';
import EditVacncyComponent from './components/EditVacancyComponent';
import EmployerComponent from './components/EmployerComponent';
import EmployerVacancyComponent from './components/EmployerVacancyComponent';
import AddVacancyComponent from './components/AddVacancyComponent'
import EditEmployerComponent from './components/EditEmployerComponent'
import JobSeekerComponent from './components/JobSeekerComponent';
import ViewJobSeekerComponent from './components/ViewJobSeekerComponent';
import CategoryComponent from './components/CategoryComponent';
import TypeComponent from './components/TypeComponent';
import ModalityComponent from './components/ModalityComponent';
import EditProfileComponent from './components/EditProfileComponent';

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
                  <Route path="/employer" element={<> <NavbarComponent/><EmployerComponent/></>}></Route>
                  <Route path="/employer/:id/vacancy" element={<> <NavbarComponent/><EmployerVacancyComponent/></>}></Route>
                  <Route path="/employer/:id/vacancy/add" element={<> <NavbarComponent/><AddVacancyComponent/></>}></Route>
                  <Route path="/employer/:id/edit" element={<> <NavbarComponent/><EditEmployerComponent/></>}></Route>
                  <Route path="/jobseeker" element={<> <NavbarComponent/><JobSeekerComponent/></>}></Route>
                  <Route path="/jobseeker/:id" element={<> <NavbarComponent/><ViewJobSeekerComponent/></>}></Route>
                  <Route path="/category" element={<> <NavbarComponent/><CategoryComponent/></>}></Route>
                  <Route path="/type" element={<> <NavbarComponent/><TypeComponent/></>}></Route>
                  <Route path="/modality" element={<> <NavbarComponent/><ModalityComponent/></>}></Route>
                  <Route path="/edit" element={<> <NavbarComponent/><EditProfileComponent/></>}></Route>

              </Routes>
              </div>
      </router>
    </div>
  );
}

export default App;

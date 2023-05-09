import axios from "axios";


const url='http://localhost:8081/';

 class AdminService {
    login(user){ 
        return axios.post(url + "login", user);    
      }
}
export default new AdminService
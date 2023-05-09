import axios from "axios";


const url='http://localhost:8081/';

 class AdminService {
    login(user){ 
        return axios.post(url + "login", user);    
      }

    getAdminById(id){
      return axios.get(url + "admin/"+id);
    }  
}
export default new AdminService
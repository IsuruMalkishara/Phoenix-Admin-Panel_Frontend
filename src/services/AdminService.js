import axios from "axios";


const url='http://localhost:8081/';

 class AdminService {
    login(user){ 
        return axios.post(url + "login", user);    
      }

    getAdminById(id){
      return axios.get(url + "admin/"+id);
    }  

    updateAdmin(id,data){
      return axios.put(url+"admin/"+id,data);
    }
  
    addAdmin(data){
      return axios.post(url+"admin",data);
    }
  
    getAllAdmins(){
      return axios.get(url+"admin")
    }
  
    deleteAdmin(id){
      return axios.delete(url+"admin/"+id)
    }
}
export default new AdminService
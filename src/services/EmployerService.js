import axios from "axios";


const url='http://localhost:8081/';

 class EmployerService {
    getAllEmployers(){
        return axios.get(url+"employer")
      }
    
      getEmployerById(id){
        return axios.get(url+"employer/"+id)
      }
    
      deleteEmployer(id){
        return axios.delete(url+"employer/"+id)
      }
    
    
      updateEmployer(id,data){
        return axios.put(url+"employer/"+id,data);
      }
    
      searchEmployer(data){
        return axios.post(url+"employer/title",data);
      }
}
export default new EmployerService
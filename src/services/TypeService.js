import axios from "axios";


const url='http://localhost:8081/';

 class TypeService {
    getAllType(){
        return axios.get(url+"type")
    }

    deleteType(id){
        return axios.delete(url+"type/"+id)
      }
    
      updateType(id,data){
        return axios.put(url+"type/"+id,data);
      }
    
      addType(data){
        return axios.post(url+"type",data);
      }
    
}
export default new TypeService
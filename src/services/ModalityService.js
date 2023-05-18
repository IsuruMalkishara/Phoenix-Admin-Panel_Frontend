import axios from "axios";


const url='http://localhost:8081/';

 class ModalityService {
    getAllModality(){
        return axios.get(url+"modality")
    }

    deleteModality(id){
        return axios.delete(url+"modality/"+id)
      }
    
      updateModality(id,data){
        return axios.put(url+"modality/"+id,data);
      }
    
      addModality(data){
        return axios.post(url+"modality",data);
      }
}
export default new ModalityService
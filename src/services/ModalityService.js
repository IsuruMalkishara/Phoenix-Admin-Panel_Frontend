import axios from "axios";


const url='http://localhost:8081/';

 class ModalityService {
    getAllModality(){
        return axios.get(url+"modality")
    }

    
}
export default new ModalityService
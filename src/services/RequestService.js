import axios from "axios";


const url='http://localhost:8081/';

 class RequestService {
    getAllRequest(id){
        return axios.get(url+"request/"+id)
    }

    
}
export default new RequestService
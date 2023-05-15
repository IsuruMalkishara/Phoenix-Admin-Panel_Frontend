import axios from "axios";


const url='http://localhost:8081/';

 class TypeService {
    getAllType(){
        return axios.get(url+"type")
    }

    
}
export default new TypeService
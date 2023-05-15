import axios from "axios";


const url='http://localhost:8081/';

 class CategoryService {
    getAllCategory(){
        return axios.get(url+"category")
    }

    
}
export default new CategoryService
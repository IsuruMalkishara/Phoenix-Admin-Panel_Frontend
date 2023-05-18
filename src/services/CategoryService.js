import axios from "axios";


const url='http://localhost:8081/';

 class CategoryService {
    getAllCategory(){
        return axios.get(url+"category")
    }

    deleteCategories(id){
        return axios.delete(url+"category/"+id)
      }
    
      updateCategories(id,data){
        return axios.put(url+"category/"+id,data);
      }
    
      addCategories(data){
        return axios.post(url+"category",data);
      }
}
export default new CategoryService
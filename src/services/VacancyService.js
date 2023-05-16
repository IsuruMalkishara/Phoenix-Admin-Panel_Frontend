import axios from "axios";


const url='http://localhost:8081/';

 class VacancyService {
    getAllVacancy(){
        return axios.get(url+"vacancy")
    }

    getVacancyById(id){
        return axios.get(url+"vacancy/"+id)
    }

    deleteVacancyById(id){
        return axios.delete(url+"vacancy/"+id);
    }

    updateVacancy(id,data){
        return axios.put(url+"vacancy/"+id,data);
    }

    getVacancyByEmpoyerId(id){
        return axios.get(url+"vacancies/"+id);
    }

    addVacancy(data){
        return axios.post(url+"vacancy",data);
    }
}
export default new VacancyService
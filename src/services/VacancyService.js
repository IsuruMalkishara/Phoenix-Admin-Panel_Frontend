import axios from "axios";


const url='http://localhost:8081/';

 class VacancyService {
    getAllVacancy(){
        return axios.get(url+"vacancy")
    }
}
export default new VacancyService
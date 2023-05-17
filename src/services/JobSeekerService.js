import axios from "axios";


const url='http://localhost:8081/';

 class JobSeekerService {
    getAllJobSeeker(){
        return axios.get(url+"jobseeker")
      }
    
      getJobSeekerById(id){
        return axios.get(url+"jobseeker/"+id)
      }
    
      deleteJobSeeker(id){
        return axios.delete(url+"jobseeker/"+id)
      }
    
    
      searchJobSeeker(data){
        return axios.post(url+"jobseeker/title",data);
      }
}
export default new JobSeekerService
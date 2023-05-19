import React, {useState,useEffect } from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import Card from 'react-bootstrap/Card';
import RequestService from '../services/RequestService';
import VacancyService from '../services/VacancyService';
import '../styles/RequestComponent.css';

export default function RequestComponent() {
    const [requests, setRequests]=useState([]);
    const [vacancy, setVacancy]=useState('');
    const [employer,setEmployer]=useState('');

    const [pageNumber, setPageNumber] = useState(0);

    const navigate = useNavigate();

    const { id } = useParams();

    const requestsPerPage = 6;
    const pagesVisited = pageNumber * requestsPerPage;
    const pageCount = Math.ceil(requests.length / requestsPerPage);

    useEffect(() => {

        getAllRequest(id);
        getVacancyById(id);
         }, []);

   
    
    //get vacancies data
    const getAllRequest=(id)=>{
    
      RequestService.getAllRequest(id).then(res=>{
        console.warn(res.data);
          setRequests(res.data);
    
      }).catch(error =>{
        console.log(error);
    })
}
    //get vacancy by id
    const getVacancyById=(id)=>{
    
        VacancyService.getVacancyById(id).then(res=>{
          console.warn(res.data);
            setVacancy(res.data.title);
            setEmployer(res.data.employer.name)
      
        }).catch(error =>{
          console.log(error);
      })
    
    
    }

    

    //display request in table
    const displayRequests = requests
    .slice(pagesVisited, pagesVisited + requestsPerPage)
    .map((request,index) => (
      <tr key={request.id}>
        <td >{index + 1}</td>
        <td>{request.jobSeeker.firstName}</td>
        <td>{request.jobSeeker.lastName}</td>
        <td >{request.jobSeeker.position}</td>
        
      </tr>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
    
        return (
            <>
            <div className='request'>
            
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>{vacancy}</h3></div>
                    <div className='title'><h5>{employer}</h5></div>
                    </div>
               
                </div>
                <div className='row'>
                <div className='col'>
            <div className='request-table'>
      <Table  style={{ backgroundColor: 'rgb(3, 122, 126)',color:'#ffff' }}>
        <thead  style={{ backgroundColor: 'rgb(103, 4, 122)',color:'#ffff' }}>
          <tr>
          <th>Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>{displayRequests}</tbody>
      </Table>
      
      </div>
      </div>
      </div>
      <div className='row'>
      <div className='col'>
        <div className='pagination'>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={ pageCount }
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      </div>
    </div>
               
                </div>
      
      </div>
    </>
        );
    
}




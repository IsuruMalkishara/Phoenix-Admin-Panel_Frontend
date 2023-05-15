import React, {useState,useEffect } from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import Card from 'react-bootstrap/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VacancyService from '../services/VacancyService';
import '../styles/EmployerVacancyComponent.css'


export default function EmployerVacancyComponent() {

    const [vacancies, setVacancies]=useState([]);

    const [pageNumber, setPageNumber] = useState(0);
    
    const { id } = useParams();

    const navigate = useNavigate();

    const jobsPerPage = 6;
    const pagesVisited = pageNumber * jobsPerPage;
    const pageCount = Math.ceil(vacancies.length / jobsPerPage);

    useEffect(() => {

        getAllVacancy() }, []);
    
    //get vacancies data
    const getAllVacancy=()=>{
    console.warn(id);
      VacancyService.getVacancyByEmpoyerId(id).then(res=>{
        console.warn(res.data);
          setVacancies(res.data);
    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    }

    //navigate to view vacancy page
    const handleViewVacancy = (vacancyId) => {
      console.warn("vacancy id: "+vacancyId);
      navigate('/vacancy/'+vacancyId);
    };

    //display vacancy in table
    const displayJobs = vacancies
    .slice(pagesVisited, pagesVisited + jobsPerPage)
    .map((vacancy,index) => (
      <tr key={vacancy.id}>
        <td >{index + 1}</td>
        <td>{vacancy.title}</td>
        <td>{vacancy.employer.name}</td>
        <td >{vacancy.numOfRequests}</td>
        <td>
        <IconButton onClick={() => handleViewVacancy(vacancy.id)}>
            <VisibilityIcon />
        </IconButton>
        </td>
      </tr>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
    
        return (
            <>
            <div className='vacancy'>
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>Vacancies</h3></div>
                    </div>
               
                </div>
                <div className='row' style={{textAlign:'center'}}>
                <div className='col' style={{textAlign:'center'}}>
          <div className='vacancy-table' >
          <div className='table-container'>
      <Table  style={{ backgroundColor: 'rgb(3, 122, 126)',color:'#ffff' }}>
        <thead  style={{ backgroundColor: 'rgb(103, 4, 122)',color:'#ffff' }}>
          <tr>
          <th>Number</th>
            <th>Title</th>
            <th>Employer</th>
            <th>Number of Requests</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>{displayJobs}</tbody>
      </Table>
      </div>
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
      </Card.Body>
    </Card>
      </div>
    </>
        );
    
}


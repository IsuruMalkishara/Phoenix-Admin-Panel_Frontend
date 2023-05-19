import React, {useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import VacancyService from '../services/VacancyService';
import '../styles/VacancyComponent.css'


export default function VacancyComponent() {

    const [vacancies, setVacancies]=useState([]);
    const [searchText, setSearchText]=useState('');

    const [pageNumber, setPageNumber] = useState(0);

    const navigate = useNavigate();

    const jobsPerPage = 6;
    const pagesVisited = pageNumber * jobsPerPage;
    const pageCount = Math.ceil(vacancies.length / jobsPerPage);

    useEffect(() => {

        getAllVacancy() }, []);
    
    //get vacancies data
    const getAllVacancy=()=>{
    
      VacancyService.getAllVacancy().then(res=>{
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

  const serachVacancy=()=>{
    console.warn(searchText);
    if(searchText==undefined || searchText.length==0){
      getAllVacancy();
    }else{
      VacancyService.searchVacancy(searchText).then(res=>{
        console.warn(res.data);
        setVacancies(res.data);
      })
    }
  }
    
        return (
            <>
            <div className='vacancy'>
            
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>VACANCIES</h3></div>
                    </div>
               
                </div>
                <div className='row'>
                  <div className='col-1'></div>
                  <div className='col-9'>
                  <Form.Control
                  placeholder="Enter Vacancy Title"
                className='input'
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
                  </div>
                  <div className='col-1'>
                  <IconButton onClick={serachVacancy}>
                      <SearchIcon />
                  </IconButton>
                  </div>
                  <div className='col-1'></div>
                </div>
                <div className='row' style={{textAlign:'center',marginTop:'10px'}}>
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
      
      </div>
    </>
        );
    
}


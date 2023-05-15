import React, {useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import Card from 'react-bootstrap/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FeedbackIcon from '@mui/icons-material/Feedback';
import IconButton from '@mui/material/IconButton';
import '../styles/EmployerComponent.css';
import EmployerService from '../services/EmployerService';


export default function VacancyComponent() {

    const [employers, setEmployers]=useState([]);

    const [pageNumber, setPageNumber] = useState(0);

    const navigate = useNavigate();

    const employerPerPage = 6;
    const pagesVisited = pageNumber * employerPerPage;
    const pageCount = Math.ceil(employers.length / employerPerPage);

    useEffect(() => {

        getAllEmployer() }, []);
    
    //get employers data
    const getAllEmployer=()=>{
    
      EmployerService.getAllEmployers().then(res=>{
        console.warn(res.data);
          setEmployers(res.data);
    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    }

    // //navigate to view vacancy page
    // const handleViewVacancy = (vacancyId) => {
    //   console.warn("vacancy id: "+vacancyId);
    //   navigate('/vacancy/'+vacancyId);
    // };

    //display vacancy in table
    const displayEmployers = employers
    .slice(pagesVisited, pagesVisited + employerPerPage)
    .map((employer,index) => (
      <tr key={employer.id}>
        <td >{index + 1}</td>
        <td><img
              src={employer.logo}
              alt='Profile picture'
              height={'50px'}
              width={'50px'}
              className='rounded-circle profile-picture'
            /></td>
        <td>{employer.name}</td>
        <td >{employer.address}</td>
        <td>{employer.email}</td>
        <td>{employer.verification ? <VerifiedUserIcon /> : <ReportIcon />}</td>
        <td>
        <IconButton >
            <FeedbackIcon />
        </IconButton>
        </td>
        <td>
        <IconButton >
            <EditIcon />
        </IconButton>
        </td>
        <td>
        <IconButton >
            <DeleteIcon />
        </IconButton>
        </td>
      </tr>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
    
        return (
            <>
            <div className='employer'>
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>Employers</h3></div>
                    </div>
               
                </div>
                <div className='row'>
                <div className='col'>
            <div className='employer-table'>
            <div className='table-container'>
      <Table  style={{ backgroundColor: 'rgb(3, 122, 126)',color:'#ffff' }}>
        <thead  style={{ backgroundColor: 'rgb(103, 4, 122)',color:'#ffff' }}>
          <tr>
          <th>Number</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Address of Requests</th>
            <th>Email Address</th>
            <th>Verification</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{displayEmployers}</tbody>
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


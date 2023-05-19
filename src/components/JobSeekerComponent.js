import React, {useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import '../styles/JobSeekerComponent.css';
import JobSeekerService from '../services/JobSeekerService';
import DeleteVacancyPopup from './DeletePopup';
import SuccessComponent from './SuccessComponent';


export default function JobSeekerComponent() {

    const [jobseekers, setJobseekers]=useState([]);

    const [pageNumber, setPageNumber] = useState(0);

    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
     const [jsId, setJsId] = useState('');
     const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);

    const navigate = useNavigate();

    const jobseekerPerPage = 6;
    const pagesVisited = pageNumber * jobseekerPerPage;
    const pageCount = Math.ceil(jobseekers.length / jobseekerPerPage);

    useEffect(() => {

        getAllJobSeekers() }, []);
    
    //get jobseeker's data
    const getAllJobSeekers=()=>{
    
      JobSeekerService.getAllJobSeeker().then(res=>{
        console.warn(res.data);
          setJobseekers(res.data);
    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    }

    //navigate to view jobseeker page
    const handleViewJobSeeker = (jobseekerId) => {
      console.warn("jobseeker id: "+jobseekerId);
      navigate('/jobseeker/'+jobseekerId);
    };


    //delete
const handleDeleteJobseeker=(id)=>{
    setJsId(id);
    console.warn("open delete popup");
    setDeletePopupOpen(true);
  }
  
  // Confirm delete
  const confirmDelete = () => {
    // Perform the delete action
    // You can use the `jsId` variable here to perform the delete action
    console.log('Deleting jobseeker with ID: ' + jsId);
    // Close the popup
    setDeletePopupOpen(false);
    JobSeekerService.deleteJobSeeker(jsId).then(res=>{
      console.log(res.data);
      if(res.data==true){
        setSuccessPopupOpen(true);
       
      }
    })
    
  };
  
  //close success popup
  const closeSuccessPopup=()=>{
    setSuccessPopupOpen(false);
    navigate('/jobseeker');
  }
   

    //display jobseeker in table
    const displayJobseekers = jobseekers
    .slice(pagesVisited, pagesVisited + jobseekerPerPage)
    .map((jobseeker,index) => (
      <tr key={jobseeker.id}>
        <td >{index + 1}</td>
        <td>{jobseeker.firstName}</td>
        <td >{jobseeker.lastName}</td>
        <td>{jobseeker.email}</td>
        <td>
        <IconButton onClick={() => handleViewJobSeeker(jobseeker.id)}>
            <VisibilityIcon />
        </IconButton>
        </td>
       
        <td>
        <IconButton onClick={() => handleDeleteJobseeker(jobseeker.id)}>
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
            <div className='jobseeker'>
            
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>JOB SEEKERS</h3></div>
                    </div>
               
                </div>
                <div className='row'>
                <div className='col'>
            <div className='jobseeker-table'>
            <div className='table-container'>
      <Table  style={{ backgroundColor: 'rgb(3, 122, 126)',color:'#ffff' }}>
        <thead  style={{ backgroundColor: 'rgb(103, 4, 122)',color:'#ffff' }}>
          <tr>
          <th>Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{displayJobseekers}</tbody>
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
      {/* Delete Vacancy Popup */}
      {isDeletePopupOpen && (
        <DeleteVacancyPopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
         message="Are you sure, Do you want to delete this Jobseeker?"
        />
      )}

      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully Delete Job Seeker"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}


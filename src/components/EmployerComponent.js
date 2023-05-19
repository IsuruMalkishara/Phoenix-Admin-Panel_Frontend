import React, {useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FeedbackIcon from '@mui/icons-material/Feedback';
import IconButton from '@mui/material/IconButton';
import '../styles/EmployerComponent.css';
import EmployerService from '../services/EmployerService';
import DeleteVacancyPopup from './DeletePopup';
import SuccessComponent from './SuccessComponent';


export default function EmployerComponent() {

    const [employers, setEmployers]=useState([]);

    const [pageNumber, setPageNumber] = useState(0);

    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
     const [empId, setEmpId] = useState('');
     const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);

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

    //navigate to view vacancy page
    const handleViewVacancy = (employerId) => {
      console.warn("Employer id: "+employerId);
      navigate('/employer/'+employerId+'/vacancy');
    };

    //navigate to adit employer page
    const handleEditEmployer = (employerId) => {
      console.warn("Employer id: "+employerId);
      navigate('/employer/'+employerId+'/edit');
    };

    //delete
const handleDeleteEmployer=(id)=>{
    setEmpId(id);
    console.warn("open delete popup");
    setDeletePopupOpen(true);
  }
  
  // Confirm delete
  const confirmDelete = () => {
    // Perform the delete action
    // You can use the `empId` variable here to perform the delete action
    console.log('Deleting employer with ID: ' + empId);
    // Close the popup
    setDeletePopupOpen(false);
    EmployerService.deleteEmployer(empId).then(res=>{
      console.log(res.data);
      if(res.data==true){
        setSuccessPopupOpen(true);
       
      }
    })
    
  };
  
  //close success popup
  const closeSuccessPopup=()=>{
    setSuccessPopupOpen(false);
    navigate('/employer');
  }
   

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
        <IconButton onClick={() => handleViewVacancy(employer.id)}>
            <FeedbackIcon />
        </IconButton>
        </td>
        <td>
        <IconButton onClick={() => handleEditEmployer(employer.id)}>
            <EditIcon />
        </IconButton>
        </td>
        <td>
        <IconButton onClick={() => handleDeleteEmployer(employer.id)}>
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
      
      </div>
      {/* Delete Vacancy Popup */}
      {isDeletePopupOpen && (
        <DeleteVacancyPopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
         message="Are you sure, Do you want to delete this Employer?"
        />
      )}

      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully Delete Employer"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}


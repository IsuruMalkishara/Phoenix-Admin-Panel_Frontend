import React, {useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import '../styles/AdminComponent.css';
import AdminService from '../services/AdminService';
import DeleteVacancyPopup from './DeletePopup';
import SuccessComponent from './SuccessComponent';
import Profile  from '../assets/profile.png'

export default function AdminComponent() {

    const [admins, setAdmins]=useState([]);

    const [pageNumber, setPageNumber] = useState(0);

    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
     const [adminId, setAdminId] = useState('');
     const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);

    const navigate = useNavigate();

    const adminPerPage = 6;
    const pagesVisited = pageNumber * adminPerPage;
    const pageCount = Math.ceil(admins.length / adminPerPage);

    useEffect(() => {

        getAllAdmins() }, []);
    
    //get admin data
    const getAllAdmins=()=>{
    
      AdminService.getAllAdmins().then(res=>{
        console.warn(res.data);
          setAdmins(res.data);
    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    }

     //navigate to add admin page
     const handleAddAdmin = () => {
        navigate('/admin/add');
      };
    

    //navigate to edit admin page
    const handleEditAdmin = (id) => {
      console.warn("Admin id: "+id);
      navigate('/admin/'+id+'/edit');
    };

    //delete
const handleDeleteAdmin=(id)=>{
    setAdminId(id);
    console.warn("open delete popup");
    setDeletePopupOpen(true);
  }
  
  // Confirm delete
  const confirmDelete = () => {
    // Perform the delete action
    // You can use the `empId` variable here to perform the delete action
    console.log('Deleting admin with ID: ' + adminId);
    // Close the popup
    setDeletePopupOpen(false);
    AdminService.deleteAdmin(adminId).then(res=>{
      console.log(res.data);
      if(res.data==true){
        setSuccessPopupOpen(true);
       
      }
    })
    
  };
  
  //close success popup
  const closeSuccessPopup=()=>{
    setSuccessPopupOpen(false);
    navigate('/admin');
  }
   

    //display vacancy in table
    const displayAdmin = admins
    .slice(pagesVisited, pagesVisited + adminPerPage)
    .map((admin,index) => (
      <tr key={admin.id}>
        <td >{index + 1}</td>
        <td>
        {admin.profilePicture ? (
          <img
            src={admin.profilePicture}
            alt='Profile picture'
            height={'50px'}
            width={'50px'}
            className='rounded-circle profile-picture'
          />
        ) : (
          <img
            src={Profile}
            alt='Profile picture'
            height={'50px'}
            width={'50px'}
            className='rounded-circle profile-picture'
          />
        )}
      </td>
        <td>{admin.userName}</td>
        <td >{admin.email}</td>
        <td >{admin.phone}</td>
        <td>{admin.userType}</td>
        
        <td>
        <IconButton onClick={() => handleEditAdmin(admin.id)}>
            <EditIcon />
        </IconButton>
        </td>
        <td>
        <IconButton onClick={() => handleDeleteAdmin(admin.id)}>
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
            <div className='admin'>
            
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>Admin</h3></div>
                    </div>
               
                </div>
                
                <div className='row'>
                <div className='col'>
            <div className='admin-table'>
            <div className='row'style={{ textAlign:'right' }}>
                  <div className='col' style={{ textAlign:'right' }}>
                  <IconButton onClick={() => handleAddAdmin()}>
                      <AddBoxIcon />
                  </IconButton>
                  </div>
                </div>
            <div className='table-container'>
      <Table  style={{ backgroundColor: 'rgb(3, 122, 126)',color:'#ffff' }}>
        <thead  style={{ backgroundColor: 'rgb(103, 4, 122)',color:'#ffff' }}>
          <tr>
          <th>Number</th>
            <th>Profile Picture</th>
            <th>User Name</th>
            <th>Email Address</th>
            <th>Contact Number</th>
            <th>Admin Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{displayAdmin}</tbody>
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
         message="Are you sure, Do you want to delete this Admin?"
        />
      )}

      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully Delete Admin"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}


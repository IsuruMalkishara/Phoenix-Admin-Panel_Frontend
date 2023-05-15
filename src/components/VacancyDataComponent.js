import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FeedbackIcon from '@mui/icons-material/Feedback';
import VacancyService from '../services/VacancyService';
import '../styles/VacancyDataComponent.css';
import DeleteVacancyPopup from './DeletePopup';
import SuccessComponent from './SuccessComponent';

export default function VacancyDataComponent() {
  const navigate = useNavigate();

    const [logo, setLogo]=useState('');
    const [title, setTitle]=useState('');
    const [name, setCompanyName]=useState('');
    const [address, setAddress]=useState('');
    const [category, setCategory]=useState('');
    const [type, setType]=useState('');
    const [modality, setModality]=useState('');
    const [postedDate, setPostedDate]=useState('');
    const [expirationDate, setExpirationDate]=useState('');
    const [description, setDescription]=useState('');
    const [descriptionImg, setDescriptionImg]=useState('');
    const [salaryRange,setSalaryRange]=useState('');
    const [numOfRequests,setNumOfRequests]=useState('');
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
     const [vacancyId, setVacancyId] = useState('');
     const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
    
    
    const { id } = useParams();


    useEffect(() => {

        getVacancy(id) }, []);
    
    //get vacancies data
    const getVacancy=(vacancyId)=>{
    
      VacancyService.getVacancyById(vacancyId).then(res=>{
        console.warn(res.data);
          setTitle(res.data.title);
          setLogo(res.data.employer.logo);
          setCompanyName(res.data.employer.name);
          setAddress(res.data.employer.address);
          setCategory(res.data.category.title);
          setModality(res.data.modality.title);
          setType(res.data.type.title);
          setDescription(res.data.description);
          setDescriptionImg(res.data.descriptionImg);
          setSalaryRange(res.data.salaryRange);
          setPostedDate(res.data.postedDate);
          setExpirationDate(res.data.expirationDate);
          setNumOfRequests(res.data.numOfRequests);

    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    
    }

//navigate to request page
const handleViewRequest = (id) => {
  console.warn("vacancy id: "+id);
  navigate('/vacancy/'+id+'/request');
};

//edit
const handleEditVacancy = (id) => {
  console.warn("vacancy id: "+id);
  navigate('/vacancy/'+id+'/edit');
};

//delete
const handleDeleteVacancy=(id)=>{
  console.warn("open delete popup");
  setVacancyId(id);
  setDeletePopupOpen(true);
}

// Confirm delete
const confirmDelete = () => {
  // Perform the delete action
  // You can use the `vacancyId` variable here to perform the delete action
  console.log('Deleting vacancy with ID: ' + vacancyId);
  // Close the popup
  setDeletePopupOpen(false);
  VacancyService.deleteVacancyById(vacancyId).then(res=>{
    console.log(res.data);
    if(res.data==true){
      setSuccessPopupOpen(true);
     
    }
  })
  
};

//close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/vacancy');
}
    
        return (
            <>
            <div className='vacancy'>
              
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
                
            
       <div className='row' style={{ marginTop:'10px' }}>
        <div className='col' style={{ textAlign:'right' }}>
        <IconButton onClick={() => handleViewRequest(id)}>
            <Badge badgeContent={numOfRequests} color="primary">
                <FeedbackIcon color="action" />
            </Badge>
        </IconButton>
        <IconButton onClick={() => handleEditVacancy(id)}>
            <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDeleteVacancy(id)}>
            <DeleteIcon />
        </IconButton>
        </div>
        
       </div>
       <div className='row' style={{ marginTop:'10px' }}>
        <div className='col' style={{ textAlign:'center',color:'#FFFF' }}><h1>{title}</h1></div>
       </div>
       <div className='row' style={{ color:'#FFFF',marginTop:'10px' }}>
        <div className='col-md-2'>
        <img
              src={logo}
              alt='Logo'
              height={'70px'}
              width={'70px'}
              
            />
        </div>
        <div className='col-md-10'>
        <div className='row'>{name}</div>
        <div className='row'>{address}</div>
        </div>
       </div>
       <div className='row' style={{ color:'#FFFF',marginTop:'10px' }}>
       <div className='col'>Salary Range: {salaryRange}</div>
       </div>
       <div className='row' style={{ color:'#FFFF',marginTop:'10px' }}>
       <div className='col-md-4'>Category: {category}</div>
       <div className='col-md-4'>Type: {type}</div>
       <div className='col-md-4'>Modality: {modality}</div>
       </div>
       <div className='row' style={{ color:'#FFFF',marginTop:'10px' }}>
       <div className='col-md-6'>Posted Date: {postedDate}</div>
       <div className='col-md-6'>Expiration Date: {expirationDate}</div>
       
       </div>
       <div className='row' style={{ color:'#FFFF',marginTop:'10px' }}>
        <div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
       </div>
       <div className='row' style={{ color:'#FFFF',marginTop:'10px',textAlign:'center' }}>
  {descriptionImg && (
    <div>
      <img
        src={descriptionImg}
        alt='description'
        height={'400px'}
        width={'350px'}
      />
    </div>
  )}
</div>
      </Card.Body>
    </Card>
      </div>
      {/* Delete Vacancy Popup */}
      {isDeletePopupOpen && (
        <DeleteVacancyPopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
         message="Are you sure, Do you want to delete this vacancy?"
        />
      )}

      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully Delete Vacancy"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}




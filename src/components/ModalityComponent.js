import React, {useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalityService from '../services/ModalityService';
import DeletePopup from './DeletePopup';
import SuccessComponent from './SuccessComponent';
import AddPopup from './AddPopup';
import UpdatePopup from './UpdatePopup';
import '../styles/ModalityComponent.css';


export default function ModalityComponent() {

    const [modalities, setModalities]=useState([]);


    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
     const [modalityId, setModalityId] = useState('');
     const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
     const [isAddPopupOpen, setAddPopupOpen] = useState(false);
     const [isUpdatePopupOpen,setUpdatePopupOpen]=useState(false);
     const [modalityToUpdate, setModalityToUpdate] = useState(null);

    const navigate = useNavigate();

    

    useEffect(() => {

        getAllModalities() }, []);
    
    //get modalities
    const getAllModalities=()=>{
    
      ModalityService.getAllModality().then(res=>{
        console.warn(res.data);
          setModalities(res.data);
    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    }

    //add popup open
    const handleAddModality=()=>{
        console.warn("add popup open");
     setAddPopupOpen(true);
    }

    // Close add popup
  const closeAddPopup = () => {
    setAddPopupOpen(false);
  };

    const add=(id,title)=>{
   const data={
    "id":id,
    "title":title
   }

   console.warn(data);
   ModalityService.addModality(data).then(res=>{
    console.log(res.data);
    if(res.data==true){
        setAddPopupOpen(false);
      setSuccessPopupOpen(true);
      
     
    }
  })
    }

    //edit modality
    const handleEditModality = (modality) => {
      console.warn("modality id: "+modality.id);
      setModalityToUpdate(modality);
      setUpdatePopupOpen(true);
    };


    // Update modality
  const updateModality = (id, title) => {
    console.log('Updating modality with ID: ' + id);
    const data={
        "id":id,
        "title":title
       }
    
       console.warn(data);
    // Perform the update action using the id and title
    ModalityService.updateModality(id,data).then(res=>{
        console.log(res.data);
        if(res.data==true){
            setUpdatePopupOpen(false);
          setSuccessPopupOpen(true);
          
         
        }
      })
    // Close the popup
    setUpdatePopupOpen(false);
   
  };

  // ...

  // Close update popup
  const closeUpdatePopup = () => {
    setUpdatePopupOpen(false);
  };

    //delete
const handleDeleteModality=(id)=>{
    setModalityId(id);
    console.warn("open delete popup");
    setDeletePopupOpen(true);
  }
  
  // Confirm delete
  const confirmDelete = () => {
    // Perform the delete action
  
    console.log('Deleting modality with ID: ' + modalityId);
    // Close the popup
    setDeletePopupOpen(false);
    ModalityService.deleteModality(modalityId).then(res=>{
      console.log(res.data);
      if(res.data==true){
        setSuccessPopupOpen(true);
       
      }
    })
    
  };
  
  //close success popup
  const closeSuccessPopup=()=>{
    setSuccessPopupOpen(false);
    navigate('/modality');
  }
   

    //display modality in table
    const displayModalities = modalities
    .slice()
    .map((modality,index) => (
      <tr key={modality.id}>
        <td >{index + 1}</td>
        
        <td>{modality.id}</td>
        <td >{modality.title}</td>
        
        <td>
        <IconButton onClick={() => handleEditModality(modality)}>
            <EditIcon />
        </IconButton>
        </td>
        <td>
        <IconButton onClick={() => handleDeleteModality(modality.id)}>
            <DeleteIcon />
        </IconButton>
        </td>
      </tr>
    ));

  
    
        return (
            <>
            <div className='modality'>
          
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>Modalities</h3></div>
                    </div>
               
                </div>
                <div className='row'>
                    <div className='col' style={{ textAlign:'right' }}>
                    <IconButton onClick={() => handleAddModality()}>
                      <AddBoxIcon />
                    </IconButton>
                    </div>
                </div>
                <div className='row'>
                <div className='col'>
            <div className='modality-table'>
            <div className='table-container'>
      <Table  style={{ backgroundColor: 'rgb(3, 122, 126)',color:'#ffff' }}>
        <thead  style={{ backgroundColor: 'rgb(103, 4, 122)',color:'#ffff' }}>
          <tr>
          <th>Number</th>
            <th>ID</th>
            <th>Title</th> 
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>{displayModalities}</tbody>
      </Table>
      </div>
      </div>
      </div>
      </div>
      
      
      </div>
      {/* Delete type Popup */}
      {isDeletePopupOpen && (
        <DeletePopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
         message="Are you sure, Do you want to delete this Modality?"
        />
      )}

      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successful"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}

      {/*  Add Popup */}
      {isAddPopupOpen && (
        <AddPopup
          add={add}
          closePopup={closeAddPopup}
          name="Modality"
        />
      )}

      {/* Update Popup */}
      {isUpdatePopupOpen && modalityToUpdate && (
        <UpdatePopup
          data={modalityToUpdate}
          update={updateModality}
          closePopup={closeUpdatePopup}
          name="Modality"
        />
      )}
    </>
        );
    
}


import React, {useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TypeService from '../services/TypeService';
import DeletePopup from './DeletePopup';
import SuccessComponent from './SuccessComponent';
import AddPopup from './AddPopup';
import UpdatePopup from './UpdatePopup';
import '../styles/TypeComponent.css';


export default function TypeComponent() {

    const [types, setTypes]=useState([]);


    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
     const [typeId, setTypeId] = useState('');
     const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
     const [isAddPopupOpen, setAddPopupOpen] = useState(false);
     const [isUpdatePopupOpen,setUpdatePopupOpen]=useState(false);
     const [typeToUpdate, setTypeToUpdate] = useState(null);

    const navigate = useNavigate();

    

    useEffect(() => {

        getAllTypes() }, []);
    
    //get Types
    const getAllTypes=()=>{
    
      TypeService.getAllType().then(res=>{
        console.warn(res.data);
          setTypes(res.data);
    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    }

    //add popup open
    const handleAddType=()=>{
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
   TypeService.addType(data).then(res=>{
    console.log(res.data);
    if(res.data==true){
        setAddPopupOpen(false);
      setSuccessPopupOpen(true);
      
     
    }
  })
    }

    //edit type
    const handleEditType = (type) => {
      console.warn("type id: "+type.id);
      setTypeToUpdate(type);
      setUpdatePopupOpen(true);
    };


    // Update type
  const updateType = (id, title) => {
    console.log('Updating type with ID: ' + id);
    const data={
        "id":id,
        "title":title
       }
    
       console.warn(data);
    // Perform the update action using the id and title
    TypeService.updateType(id,data).then(res=>{
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
const handleDeleteType=(id)=>{
    setTypeId(id);
    console.warn("open delete popup");
    setDeletePopupOpen(true);
  }
  
  // Confirm delete
  const confirmDelete = () => {
    // Perform the delete action
  
    console.log('Deleting type with ID: ' + typeId);
    // Close the popup
    setDeletePopupOpen(false);
    TypeService.deleteType(typeId).then(res=>{
      console.log(res.data);
      if(res.data==true){
        setSuccessPopupOpen(true);
       
      }
    })
    
  };
  
  //close success popup
  const closeSuccessPopup=()=>{
    setSuccessPopupOpen(false);
    navigate('/type');
  }
   

    //display types in table
    const displayTypes = types
    .slice()
    .map((type,index) => (
      <tr key={type.id}>
        <td >{index + 1}</td>
        
        <td>{type.id}</td>
        <td >{type.title}</td>
        
        <td>
        <IconButton onClick={() => handleEditType(type)}>
            <EditIcon />
        </IconButton>
        </td>
        <td>
        <IconButton onClick={() => handleDeleteType(type.id)}>
            <DeleteIcon />
        </IconButton>
        </td>
      </tr>
    ));

  
    
        return (
            <>
            <div className='type'>
            
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>Types</h3></div>
                    </div>
               
                </div>
                <div className='row'>
                    <div className='col' style={{ textAlign:'right' }}>
                    <IconButton onClick={() => handleAddType()}>
                      <AddBoxIcon />
                    </IconButton>
                    </div>
                </div>
                <div className='row'>
                <div className='col'>
            <div className='type-table'>
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
        <tbody>{displayTypes}</tbody>
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
         message="Are you sure, Do you want to delete this Type?"
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
          name="Type"
        />
      )}

      {/* Update Popup */}
      {isUpdatePopupOpen && typeToUpdate && (
        <UpdatePopup
          data={typeToUpdate}
          update={updateType}
          closePopup={closeUpdatePopup}
          name="Type"
        />
      )}
    </>
        );
    
}


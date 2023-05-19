import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import SuccessComponent from './SuccessComponent';
import AdminService from '../services/AdminService';
import '../styles/EditProfileComponent.css';

export default function EditProfileComponent() {
  const navigate = useNavigate();

    const [email, setEmail]=useState('');
    const [phone, setPhone]=useState('');
    const [userName,setUserName]=useState('');
    const [profilePicture, setProfilePicture]=useState(''); 
    const [id,setId]=useState('');
    const [userType,setUserType]=useState('');
    const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);

   
    useEffect(() => {
        setId(sessionStorage.getItem('userId'));
        setUserType(sessionStorage.getItem('userType'));
        getAdmin(id);
         }, [id,userType]);
    
    //get admin data
    const getAdmin=(adminId)=>{
    
      AdminService.getAdminById(adminId).then(res=>{
        console.warn(res.data);
         setEmail(res.data.email);
         setPhone(res.data.phone);
         setProfilePicture(res.data.profilePicture);
         setUserName(res.data.userName);
         setUserType(res.data.userType); 

    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    
    }


//add profile img
const handleProfilePictureChange = (files) => {
  
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePicture(event.target.result);
    };
    reader.readAsDataURL(files[0]);
  
};

//update
const handleUpdateData=(event)=>{
    event.preventDefault();
  const data={  
    "id":id,
   "email":email,
   "phone":phone,
   "profilePicture":profilePicture,
   "userName":userName,
   "userType":userType,
   
  }

  console.warn(data);
  AdminService.updateAdmin(id,data).then(res=>{
    console.warn(res.data);
    if(res.data==true){

      setSuccessPopupOpen(true);
      
    }
  })
}



//close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/vacancy')
}
    
        return (
            <>
            <div className='profile'>
              <div className='row'>
                <div className='col' style={{ textAlign:'center',color:'#ffff' }}>
                  <h1>Edit Profile</h1>
                </div>
              </div>
              
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
        <Form onSubmit={handleUpdateData}>
        
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>User Name:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          /></div>
        </div>
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Email Address:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          /></div>
        </div>
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Contact Number:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          /></div>
        </div>  

        <div className="row" style={{ marginTop: '10px' }}>
  <div className="col-4">
    <Form.Label className="label">Profile Picture:</Form.Label>
  </div>
  <div className="col-8">
    <Form.Control
    className='input'
      type="file"
      accept="image/*"
      onChange={(event) => handleProfilePictureChange(event.target.files)}
    />
  </div>
</div>

<div className='row' style={{ marginTop:'10px' }}>
  <div className='col-4'>
    <Form.Label className='label'>Admin Type:</Form.Label>
  </div>
  <div className='col-8'>
    {userType === 'Super Admin' ? (
      <Form.Control
        as='select'
        className='input'
        value={userType}
        onChange={(event) => setUserType(event.target.value)}
      >
        <option value={userType}>{userType}</option>
        <option value={"Admin"}>Admin</option>
        <option value={"Super Admin"}>Super Admin</option>
      </Form.Control>
    ) : (
      <p>{userType}</p>
    )}
  </div>
</div>
    
      
    

<div className='row' style={{ marginTop:'10px' }}>
  <div className='col' style={{ textAlign:'center' }}>
  <Button className='update-btn' variant="primary" type="submit" >
            UPDATE
  </Button>
  </div>
</div>
</Form>
      </Card.Body>
    </Card>
      </div>
      

      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully Update Profile"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}




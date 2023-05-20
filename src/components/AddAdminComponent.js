import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card, Form, Button,Alert } from 'react-bootstrap';
import SuccessComponent from './SuccessComponent';
import AdminService from '../services/AdminService';
import '../styles/AddAdminComponent.css';

export default function AddAdminComponent() {
  const navigate = useNavigate();

    const [email, setEmail]=useState('');
    const [phone, setPhone]=useState('');
    const [userName,setUserName]=useState('');
    const [profilePicture, setProfilePicture]=useState(''); 
    const [userType,setUserType]=useState('');
    const [password,setPassword]=useState('');
    const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
    const [error, setError] = useState('');
   
    useEffect(() => {
        
         }, []);
    


//add profile img
const handleProfilePictureChange = (files) => {
  
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePicture(event.target.result);
    };
    reader.readAsDataURL(files[0]);
  
};

//update
const handleAdd=(event)=>{
    event.preventDefault();
    if(!userName){
      setError('User Name is required.');
      return;
    }else if(!email){
      setError('Email Address is required.');
      return;
    }else if (!validateEmail(email)) {
      setError('Invalid Email Address.');
      return;
    }else if(!password){
      setError('Password is required.');
      return;
    }else if (password.length < 8) {
      setError('Password should be at least 8 characters.');
      return;
    }else if(!phone){
      setError(' Contact number is required.');
      return;
    }else if (phone.length !== 11) {
      setError('Contact number should have 11 digits.');
      return;
    }else if(!userType ){
      setError('Admin type required.');
      return;
    }else{
  const data={  
   
   "email":email,
   "phone":phone,
   "profilePicture":profilePicture,
   "userName":userName,
   "userType":userType,
   "password":password
  }

  console.warn(data);
  AdminService.addAdmin(data).then(res=>{
    console.warn(res.data);
    if(res.data==true){

      setSuccessPopupOpen(true);
      
    }
  })
}
}

// Email validation using regex
const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

//close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/admin')
}
    
        return (
            <>
            <div className='admin'>
              <div className='row'>
                <div className='col' style={{ textAlign:'center',color:'#ffff' }}>
                  <h1>Add New Admin</h1>
                </div>
              </div>
              
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
        {error && <Alert variant='danger' style={{ textAlign:'center' }}>{error}</Alert>} {/* Display error message */}
        <Form onSubmit={handleAdd}>
        
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
            placeholder='abc@gmail.com'
            className='input'
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          /></div>
        </div>
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Password:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          /></div>
        </div>
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Contact Number:</Form.Label></div>
            <div className='col-8'><Form.Control
            placeholder='94*********'
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
    
      <Form.Control
        as='select'
        className='input'
        value={userType}
        onChange={(event) => setUserType(event.target.value)}
      >
         <option >select admin type</option>
        <option value={"Admin"}>Admin</option>
        <option value={"Super Admin"}>Super Admin</option>
      </Form.Control>
   
  </div>
</div>
    
      
    

<div className='row' style={{ marginTop:'10px' }}>
  <div className='col' style={{ textAlign:'center' }}>
  <Button className='update-btn' variant="primary" type="submit" >
            SAVE
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
          message="Successfully Added New Admin"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}




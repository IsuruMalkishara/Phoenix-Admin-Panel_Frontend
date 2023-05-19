import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import EmployerService from '../services/EmployerService';
import SuccessComponent from './SuccessComponent';
import '../styles/EditEmployerComponent.css';

export default function EditEmployerComponent() {
  const navigate = useNavigate();
    
    
    const [name, setName]=useState('');
    const [address, setAddress]=useState('');
    const [email,setEmail]=useState('');
    const [phone, setPhone]=useState('');
    const [logo,setLogo]=useState('');
    const [verification,setVerification]=useState(false);
    const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
    
    
    
    const { id } = useParams();


    useEffect(() => {

        getEmployer(id);
         }, []);
    
    //get vacancies data
    const getEmployer=(id)=>{
    
      EmployerService.getEmployerById(id).then(res=>{
        console.warn(res.data);
          setName(res.data.name);
          setAddress(res.data.address);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setLogo(res.data.logo);
          setVerification(res.data.verification);
          

    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    
    }




//add description img
const handleLogoChange = (files) => {
  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogo(event.target.result);
    };
    reader.readAsDataURL(files[0]);
  } 
};

//update
const handleUpdateEmployer=(event)=>{
    event.preventDefault(); 
  const data={
    "id":id,
    "name":name,
   "address":address,
   "email":email,
   "phone":phone,
   "logo":logo,
   "verification":verification,
   

  }

  console.warn(data);
  EmployerService.updateEmployer(id,data).then(res=>{
    console.warn(res.data);
    if(res.data==true){

      setSuccessPopupOpen(true);
      
    }
  })
}



//close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/employer');
}
    
        return (
            <>
            <div className='employerData'>
              
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
        <Form onSubmit={handleUpdateEmployer}>
          <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <h3 className='label' >{name}</h3>
            </div>
          </div>
        
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Name:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          /></div>
        </div>

        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Address:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
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
        <div className='col-4'><Form.Label className='label'>Phone:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          /></div>
        </div>
      <div className='row' style={{ marginTop:'10px' }}>
  <div className='col-4'>
    <Form.Label className='label'>Verification:</Form.Label>
  </div>
  <div className='col-8'>
  <Form.Check
                   className='label' 
                    type='checkbox'
                    checked={verification}
                    onChange={(event) => setVerification(event.target.checked)}
                    label='Verified'
                  />
  </div>
      </div>
    
     

          <div className="row" style={{ marginTop: '10px' }}>
  <div className="col-4">
    <Form.Label className="label">Logo</Form.Label>
  </div>
  <div className="col-8">
    <Form.Control
    className='input'
      type="file"
      accept="image/*"
      onChange={(event) => handleLogoChange(event.target.files)}
    />
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
          message="Successfully Update Employer"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}




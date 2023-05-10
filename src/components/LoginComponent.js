import {React}  from 'react';
import { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import AdminService from '../services/AdminService';
import { ReactComponent as UserIcon } from '../assets/user.svg'

import '../styles/LoginComponent.css'

export default function LoginComponent() {

    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    
    const navigate = useNavigate();

    const userLogin=(e)=>{
        e.preventDefault();
        const user={userName,password}
        console.log(user);

        AdminService.login(user).then(res=>{
            console.warn(res);
        sessionStorage.setItem("token",JSON.stringify(res.data.access_token));
        sessionStorage.setItem("userId",JSON.stringify(res.data.id));
        sessionStorage.setItem("userType",JSON.stringify(res.data.userType));
        console.warn("Login")
       navigate("/vacancy");
        }).catch(error=>{
            console.warn("Incorrect Email or Password");
            console.warn(error);
          
        });

    }
 
    return (
        
        
       
       <div className='login'>
       <Card className='login-card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)',width:'25rem' }}>
      
      <Card.Body >
      <UserIcon fill="rgba(255, 255, 255, 0.9)" style={{ width: '30px', height: '30px' }} />
        <h3 className='label'>Login Here</h3>
        <Form onSubmit={userLogin}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label className='label'>User Name</Form.Label>
            <Form.Control
            className='input'
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className='label'>Password</Form.Label>
            <Form.Control 
            className='input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          </Form.Group>

         
          
          <Button className='login-btn' variant="primary" type="submit">
            LOGIN
          </Button>
         
         
          
        </Form>
      </Card.Body>
    </Card>
       </div>
       

        
    )
  
}

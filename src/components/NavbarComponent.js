import React, { useState,useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/NavbarComponent.css';
import { IconContext } from 'react-icons/lib';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import AdminService from '../services/AdminService';
import Profile  from '../assets/profile.png'


export default function NavbarComponent() {

  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [userName,setUserName]=useState('')
  const [profilePicture,setProfilePicture]=useState('')

  const adminId=sessionStorage.getItem('userId');
  const adminType=sessionStorage.getItem('userType');

  useEffect(() => {

    getAdmin() }, []);


const getAdmin=()=>{

  AdminService.getAdminById(adminId).then(res=>{
    console.warn(res.data);
    setUserName(res.data.userName);
    if(res.data.profilePicture==null){
      setProfilePicture(Profile);
      console.warn("Profile picture is  null");
    }else{
      setProfilePicture(res.data.profilePicture);
    }
    
    

  }).catch(error =>{
    console.log(error);
}) 


}
//logout
const handleLogout = () => {
  sessionStorage.clear();
  navigate('/');
};

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
          
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li className='navbar-toggle'>
          <img
              src={profilePicture}
              alt='Profile picture'
              height={'100px'}
              width={'100px'}
              className='rounded-circle profile-picture'
            />
          </li>
          <li className='user-name'><p>{userName}</p></li>
          {SidebarData.map((item, index) => {
  const isActive = location.pathname === item.path;
  return (
    <li key={index} className={item.cName}>
      <Link to={item.path} className={isActive ? 'active' : ''}>
        <span>{item.title}</span>
      </Link>
    </li>
  );
})}
            <li className='nav-text'>
                {adminType != 'Admin' && (
              <Link to="/admin">
                   <span>Admin</span>
             </Link>
                     )}
            </li>
            <li  className='nav-text'>
                  <Link onClick={handleLogout}>
                    <span>Logout</span>
                  </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
  
}

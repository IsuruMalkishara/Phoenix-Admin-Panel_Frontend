import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import JobSeekerService from '../services/JobSeekerService';
import Profile  from '../assets/profile.png'


export default function ViewJobSeekerComponent() {
  const navigate = useNavigate();

    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [phone, setPhone]=useState('');
    const [email, setEmail]=useState('');
    const [certificates, setCertificates]=useState([]);
    const [certifications, setCertifications]=useState([]);
    const [college, setCollege]=useState('');
    const [country, setCountry]=useState('');
    const [cv, setCv]=useState('');
    const [degree, setDegree]=useState('');
    const [district, setDistrict]=useState('');
    const [experience,setExperience]=useState('');
    const [languages,setLanguages]=useState([]);
    const [linkdin, setLinkdin] = useState('');
     const [position, setPosition] = useState('');
     const [profilePicture,setProfilePicture]=useState('');
     const [skills,setSkills]=useState([]);
    
    
    const { id } = useParams();


    useEffect(() => {

        getJobSeeker() }, []);
    
    //get job seeker
    const getJobSeeker=()=>{
    
      JobSeekerService.getJobSeekerById(id).then(res=>{
        console.warn(res.data);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setCertificates(res.data.certificate);
          setCertifications(res.data.certification);
          setCollege(res.data.college);
          setCountry(res.data.country);
          setCv(res.data.cv);
          setDegree(res.data.degree);
          setDistrict(res.data.district);
          setEmail(res.data.email);
          setExperience(res.data.experience);
          setLanguages(res.data.languages);
          setLinkdin(res.data.linkdin);
          setPhone(res.data.phone);
          setPosition(res.data.position);
          if(res.data.profilePicture==null){
            setProfilePicture(Profile);
            console.warn("Profile picture is  null");
          }else{
            setProfilePicture(res.data.profilePicture);
          }
          setSkills(res.data.skills);

    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    
    }


  
        return (
            <>
            <div className='jobseeker'>
              
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
            <div className='row'>
               <div className='col' style={{ textAlign:'center' }}>
                <h3>{firstName} {lastName}</h3>
                </div> 
                </div>    
            <div className='row'>
                <div className='col-4'>
                    <div className='row'>
                    <img
              src={profilePicture}
              alt='Profile picture'
              height={'100px'}
              width={'100px'}
              className='rounded-circle profile-picture'
            />
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        {firstName} {lastName}
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>{position}</div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        <div className='col-6'>Email</div>
                        <div className='col-6'><a>{email}</a></div>
                        
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        Contact Number: {phone}
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        District: {district}
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        Country: {country}
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        Degree: {degree}
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        College: {college}
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        Experience: {experience}
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                    <div className='col-6'>Linkdin</div>
                        <div className='col-6'><a>{linkdin}</a></div>
                        
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        <div className='col-6'>Languages</div>
                        <div className='col-6'>
                        {languages.map((language, index) => (
                      <div key={index}>{language.language}</div>
                    ))}
                        </div>
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        <div className='col-6'>Skills</div>
                        <div className='col-6'>
                        {skills.map((skill, index) => (
                      <div key={index}>{skill.skill}</div>
                    ))}
                        </div>
                    </div>
                    <div className='row' style={{ marginTop:'10px' }}>
                        <div className='col-6'>Certification</div>
                        <div className='col-6'>
                        {certifications.map((certification, index) => (
                      <div key={index}>{certification.certification}</div>
                    ))}
                        </div>
                    </div>
                </div>
                <div className='col-8'>
                <embed src={cv} type='application/pdf' width='100%' height='600px' />
              </div>
            </div>
            {certificates.length > 0 && (
            <div className='row'>
                Certificate
            <Carousel>
                  {certificates.map((certificate, index) => (
                    <Carousel.Item key={index}>
                      <img src={certificate.certificate} alt={`Certificate ${index}`} className='carousel-image' />
                    </Carousel.Item>
                  ))}
                </Carousel>
            </div>
            )}
      </Card.Body>
    </Card>
      </div>
      

    </>
        );
    
}




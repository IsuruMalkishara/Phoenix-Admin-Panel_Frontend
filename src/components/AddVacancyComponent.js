import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import VacancyService from '../services/VacancyService';
import SuccessComponent from './SuccessComponent';
import ModalityService from '../services/ModalityService';
import TypeService from '../services/TypeService';
import CategoryService from '../services/CategoryService';
import '../styles/AddVacancyComponent.css';

export default function AddVacancyComponent() {
    
  const navigate = useNavigate();

    const [title, setTitle]=useState('');
    const [categoryId,setCategoryId]=useState('');
    const [typeId,setTypeId]=useState('');
    const [modalityId,setModalityId]=useState('');
    const [expirationDate, setExpirationDate]=useState(new Date());
    const [description, setDescription]=useState('');
    const [descriptionImg, setDescriptionImg]=useState('');
    const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
    const [typeList, setTypeList] = useState([]);
    const [modalityList, setModalityList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [salaryLawLimit, setSalaryLawLimit]=useState('');
    const [salaryUpperLimit, setSalaryUpperLimit]=useState('');
    
    
    const { id } = useParams();


    useEffect(() => {

        getType();
        getCategory();
        getModality() }, []);
    
   

//get types list
const getType=()=>{
TypeService.getAllType().then(res=>{
console.warn(res.data);
setTypeList(res.data);
})
}

//get category list
const getCategory=()=>{
    CategoryService.getAllCategory().then(res => {
        console.warn(res.data);
        setCategoryList(res.data);
      }).catch(error => {
        console.log(error);
      });
    }

//get modality list
const getModality=()=>{
    ModalityService.getAllModality().then(res=>{
    console.warn(res.data);
    setModalityList(res.data);
    })
    }

//add description img
const handleDescriptionImageChange = (files) => {
  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setDescriptionImg(event.target.result);
    };
    reader.readAsDataURL(files[0]);
  } else {
    setDescriptionImg('');
  }
};

//update
const handleAddVacancy = (event) => {
  
    event.preventDefault(); 

    let range = '';
    range=salaryLawLimit + " - " + salaryUpperLimit;
    console.warn("law limit: "+salaryLawLimit);
    console.warn("upper limit: "+salaryUpperLimit);
    console.warn("salary: "+range);
  const data={
    
    "employer":id,
   "title":title,
   "description":description,
   "descriptionImg":descriptionImg,
   "salaryRange":range,
   "category":categoryId,
   "modality":modalityId,
   "type":typeId,
   "expirationDate":expirationDate

  }

  console.warn(data);
  VacancyService.addVacancy(data).then(res=>{
    console.warn(res.data);
    if(res.data==true){

      setSuccessPopupOpen(true);
      
    }
  })
}



//close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/employer/'+id+'/vacancy');
}
    
        return (
            <>
            <div className='vacancyData'>
              
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
        <Form onSubmit={handleAddVacancy}>
          
        <div className='row'>
          <div className='col' style={{ textAlign:'center' }}>
            <h3 className='label'>Add Vacancy</h3>
          </div>
        </div>
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Title</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          /></div>
        </div>
            
        <div className='row' style={{ marginTop:'10px' }}>
  <div className='col-4'>
    <Form.Label className='label'>Category</Form.Label>
  </div>
  <div className='col-8'>
    <Form.Control
      as='select'
      className='input'
      value={categoryId}
      onChange={(event) => setCategoryId(event.target.value)}
    >
      <option >
          Select Category
        </option>
      {categoryList.map((category) => (
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      ))}
    </Form.Control>
  </div>
      </div>
    
      <div className='row' style={{ marginTop:'10px' }}>
  <div className='col-4'>
    <Form.Label className='label'>Type</Form.Label>
  </div>
  <div className='col-8'>
    <Form.Control
      as='select'
      className='input'
      value={typeId}
      onChange={(event) => setTypeId(event.target.value)}
    >
      <option >
          Select Type
        </option>
      {typeList.map((type) => (
        <option key={type.id} value={type.id}>
          {type.title}
        </option>
      ))}
    </Form.Control>
  </div>
      </div>
    
      <div className='row' style={{ marginTop:'10px' }}>
  <div className='col-4'>
    <Form.Label className='label'>Modality</Form.Label>
  </div>
  <div className='col-8'>
    <Form.Control
      as='select'
      className='input'
      value={modalityId}
      onChange={(event) => setModalityId(event.target.value)}
    >
      <option >
          Select Modality
        </option>
      {modalityList.map((modality) => (
        <option key={modality.id} value={modality.id}>
          {modality.title}
        </option>
      ))}
    </Form.Control>
  </div>
      </div>
      <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Salary Range</Form.Label></div>
            <div className='col-4'>
            <Form.Control
         as='select'
         className='input'
        value={salaryLawLimit}
         onChange={(event) => setSalaryLawLimit(event.target.value)}
    >
      <option >
          Law Salary Limit
        </option>
      <option value={'0'}>0</option>
      <option value={'5000'}>5000</option>
      <option value={'15000'}>15000</option>
      <option value={'20000'}>20000</option>
      <option value={'50000'}>50000</option>
      <option value={'80000'}>80000</option>
      <option value={'150000'}>150000</option>
    </Form.Control></div>
    <div className='col-4'>
            <Form.Control
         as='select'
         className='input'
        value={salaryUpperLimit}
         onChange={(event) => setSalaryUpperLimit(event.target.value)}
    >
      <option >
          Upper Salary Limit
        </option>
      
      <option value={'5000'}>5000</option>
      <option value={'15000'}>15000</option>
      <option value={'20000'}>20000</option>
      <option value={'50000'}>50000</option>
      <option value={'80000'}>80000</option>
      <option value={'150000'}>150000</option>
      <option value={'More'}>More</option>
    </Form.Control></div>
        </div>
  
        <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-4">
              <Form.Label className="label">Description</Form.Label>
            </div>
            <div className="col-8">
              {/* React Quill editor */}
              <ReactQuill style={{ backgroundColor:'rgba(255, 255, 255, 0.9)' }} value={description} onChange={setDescription} />
            </div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
  <div className="col-4">
    <Form.Label className="label">Description Image</Form.Label>
  </div>
  <div className="col-8">
    <Form.Control
      type="file"
      accept="image/*"
      onChange={(event) => handleDescriptionImageChange(event.target.files)}
    />
  </div>
</div>

<div className="row" style={{ marginTop: '10px' }}>
  <div className="col-4">
    <Form.Label className="label">Expiration Date</Form.Label>
  </div>
  <div className="col-8">
  <DatePicker
  selected={expirationDate}
  onChange={date => setExpirationDate(date)}
  showTimeSelect
  dateFormat="MM/dd/yyyy h:mm aa"
/>
  </div>
</div>

<div className='row' style={{ marginTop:'10px' }}>
  <div className='col' style={{ textAlign:'center' }}>
  <Button className='update-btn' variant="primary" type="submit" >
            Save
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
          message="Successfully Added Vacancy"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}




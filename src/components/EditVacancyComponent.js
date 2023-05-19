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
import '../styles/EditVacancyComponent.css';

export default function EditVacancyComponent() {
  const navigate = useNavigate();

    const [title, setTitle]=useState('');
    const [category, setCategory]=useState('');
    const [categoryId,setCategoryId]=useState('');
    const [type, setType]=useState('');
    const [typeId,setTypeId]=useState('');
    const [modality, setModality]=useState('');
    const [modalityId,setModalityId]=useState('');
    const [expirationDate, setExpirationDate]=useState(new Date());
    const [description, setDescription]=useState('');
    const [descriptionImg, setDescriptionImg]=useState('');
    const [salaryRange,setSalaryRange]=useState('');
    const [vacancyId, setVacancyId] = useState('');
    const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
    const [typeList, setTypeList] = useState([]);
    const [modalityList, setModalityList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [companyId,setCompanyId]=useState('');
    
    
    const { id } = useParams();


    useEffect(() => {

        getVacancy(id);
        getType();
        getCategory();
        getModality() }, []);
    
    //get vacancies data
    const getVacancy=(vacancyId)=>{
    
      VacancyService.getVacancyById(vacancyId).then(res=>{
        console.warn(res.data);
          setTitle(res.data.title);
          setCategory(res.data.category.title);
          setCategoryId(res.data.category.id);
          setModality(res.data.modality.title);
          setModalityId(res.data.modality.id);
          setType(res.data.type.title);
          setTypeId(res.data.type.id);
          setDescription(res.data.description);
          setDescriptionImg(res.data.descriptionImg);
          setSalaryRange(res.data.salaryRange);
          setExpirationDate(new Date(res.data.expirationDate));
          setCompanyId(res.data.employer.id)

    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    
    }

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
const handleUpdateVacancy=()=>{
  const data={
    "id":id,
    "employer":companyId,
   "title":title,
   "description":description,
   "descriptionImg":descriptionImg,
   "salaryRange":salaryRange,
   "category":categoryId,
   "modality":modalityId,
   "type":typeId,
   "expirationDate":expirationDate

  }

  console.warn(data);
  VacancyService.updateVacancy(id,data).then(res=>{
    console.warn(res.data);
    if(res.data==true){

      setSuccessPopupOpen(true);
      
    }
  })
}



//close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/vacancy/'+id);
}
    
        return (
            <>
            <div className='vacancyData'>
              <div className='row'>
                <div className='col' style={{ textAlign:'center',color:'#ffff' }}>
                  <h1>Edit Vacancy</h1>
                </div>
              </div>
              
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
        <Form onSubmit={handleUpdateVacancy}>
          <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <h3 className='label' >{title}</h3>
            </div>
          </div>
        
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Title:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          /></div>
        </div>
            
        <div className='row' style={{ marginTop:'10px' }}>
  <div className='col-4'>
    <Form.Label className='label'>Category:</Form.Label>
  </div>
  <div className='col-8'>
    <Form.Control
      as='select'
      className='input'
      value={categoryId}
      onChange={(event) => setCategoryId(event.target.value)}
    >
      <option key={categoryId} value={categoryId}>
          {category}
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
    <Form.Label className='label'>Type:</Form.Label>
  </div>
  <div className='col-8'>
    <Form.Control
      as='select'
      className='input'
      value={typeId}
      onChange={(event) => setTypeId(event.target.value)}
    >
      <option key={typeId} value={typeId}>
          {type}
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
    <Form.Label className='label'>Modality:</Form.Label>
  </div>
  <div className='col-8'>
    <Form.Control
      as='select'
      className='input'
      value={modalityId}
      onChange={(event) => setModalityId(event.target.value)}
    >
      <option key={modalityId} value={modalityId}>
          {modality}
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
        <div className='col-4'><Form.Label className='label'>Salary Range:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={salaryRange}
            onChange={(event) => setSalaryRange(event.target.value)}
          /></div>
        </div>
  
        <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-4">
              <Form.Label className="label">Description:</Form.Label>
            </div>
            <div className="col-8">
              {/* React Quill editor */}
              <ReactQuill value={description} onChange={setDescription} />
            </div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
  <div className="col-4">
    <Form.Label className="label">Description Image:</Form.Label>
  </div>
  <div className="col-8">
    <Form.Control
    className='input'
      type="file"
      accept="image/*"
      onChange={(event) => handleDescriptionImageChange(event.target.files)}
    />
  </div>
</div>

<div className="row" style={{ marginTop: '10px' }}>
  <div className="col-4">
    <Form.Label className="label">Expiration Date:</Form.Label>
  </div>
  <div className="col-8">
  <DatePicker
  className='input'
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
          message="Successfully Update Vacancy"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </>
        );
    
}




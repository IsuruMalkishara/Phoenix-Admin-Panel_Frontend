import React, {useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReactPaginate from "react-paginate";
import CategoryService from '../services/CategoryService';
import DeletePopup from './DeletePopup';
import SuccessComponent from './SuccessComponent';
import AddPopup from './AddPopup';
import UpdatePopup from './UpdatePopup';
import '../styles/CategoryComponent.css';


export default function CategoryComponent() {

    const [categories, setCategories]=useState([]);


    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
     const [categoryId, setCategoryId] = useState('');
     const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
     const [isAddPopupOpen, setAddPopupOpen] = useState(false);
     const [isUpdatePopupOpen,setUpdatePopupOpen]=useState(false);
     const [categoryToUpdate, setCategoryToUpdate] = useState(null);

     const [pageNumber, setPageNumber] = useState(0);

     const navigate = useNavigate();
 
     const categoryPerPage = 6;
     const pagesVisited = pageNumber * categoryPerPage;
     const pageCount = Math.ceil(categories.length / categoryPerPage);

    

    useEffect(() => {

        getAllCategory() }, []);
    
    //get categories
    const getAllCategory=()=>{
    
      CategoryService.getAllCategory().then(res=>{
        console.warn(res.data);
          setCategories(res.data);
    
      }).catch(error =>{
        console.log(error);
    }) 
    
    
    }
//pagintion
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    //add popup open
    const handleAddCategory=()=>{
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
   CategoryService.addCategories(data).then(res=>{
    console.log(res.data);
    if(res.data==true){
        setAddPopupOpen(false);
      setSuccessPopupOpen(true);
      
     
    }
  })
    }

    //edit category
    const handleEditCategory = (category) => {
      console.warn("category id: "+category.id);
      setCategoryToUpdate(category);
      setUpdatePopupOpen(true);
    };


    // Update category
  const updateCategory = (id, title) => {
    console.log('Updating category with ID: ' + id);
    const data={
        "id":id,
        "title":title
       }
    
       console.warn(data);
    // Perform the update action using the id and title
    CategoryService.updateCategories(id,data).then(res=>{
        console.log(res.data);
        if(res.data==true){
            setUpdatePopupOpen(false);
          setSuccessPopupOpen(true);
          
         
        }
      })
    // Close the popup
    setUpdatePopupOpen(false);
    // Update the category in the state or make an API call to update the category
  };

  // ...

  // Close update popup
  const closeUpdatePopup = () => {
    setUpdatePopupOpen(false);
  };

    //delete
const handleDeleteCategory=(id)=>{
    setCategoryId(id);
    console.warn("open delete popup");
    setDeletePopupOpen(true);
  }
  
  // Confirm delete
  const confirmDelete = () => {
    // Perform the delete action
    // You can use the `empId` variable here to perform the delete action
    console.log('Deleting category with ID: ' + categoryId);
    // Close the popup
    setDeletePopupOpen(false);
    CategoryService.deleteCategories(categoryId).then(res=>{
      console.log(res.data);
      if(res.data==true){
        setSuccessPopupOpen(true);
       
      }
    })
    
  };
  
  //close success popup
  const closeSuccessPopup=()=>{
    setSuccessPopupOpen(false);
    navigate('/category');
  }
   

    //display vacancy in table
    const displayCategory = categories
    .slice(pagesVisited, pagesVisited + categoryPerPage)
    .map((category,index) => (
      <tr key={category.id}>
        <td >{index + 1}</td>
        
        <td>{category.id}</td>
        <td >{category.title}</td>
        
        <td>
        <IconButton onClick={() => handleEditCategory(category)}>
            <EditIcon />
        </IconButton>
        </td>
        <td>
        <IconButton onClick={() => handleDeleteCategory(category.id)}>
            <DeleteIcon />
        </IconButton>
        </td>
      </tr>
    ));

  
    
        return (
            <>
            <div className='category'>
            
                <div className='row'>
                    <div className='col'>
                    <div className='title'><h3>Categories</h3></div>
                    </div>
               
                </div>
                <div className='row'>
                    <div className='col' style={{ textAlign:'right' }}>
                    <IconButton onClick={() => handleAddCategory()}>
                      <AddBoxIcon />
                    </IconButton>
                    </div>
                </div>
                <div className='row'>
                <div className='col'>
            <div className='category-table'>
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
        <tbody>{displayCategory}</tbody>
      </Table>
      </div>
      </div>
      </div>
      </div>
      
      <div className='row'>
      <div className='col'>
        <div className='pagination'>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={ pageCount }
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      </div>
    </div>
               
                </div>
      </div>
      {/* Delete Vacancy Popup */}
      {isDeletePopupOpen && (
        <DeletePopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
         message="Are you sure, Do you want to delete this Category?"
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
          name="Category"
        />
      )}

      {/* Update Popup */}
      {isUpdatePopupOpen && categoryToUpdate && (
        <UpdatePopup
          data={categoryToUpdate}
          update={updateCategory}
          closePopup={closeUpdatePopup}
          name="Category"
        />
      )}
    </>
        );
    
}


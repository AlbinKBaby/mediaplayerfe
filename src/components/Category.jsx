import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { addcategory, deleteCateory, getAllCategories, getVideoDetailById, updateCategory } from '../services/allApi';


function Category() {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([])

  const handleClose = () => {
    setShow(false);
    setCategoryName("")
  }
  const handleShow = () => setShow(true)

  const [CategoryName, setCategoryName] = useState("")

  const handleAddCategory = async () => {
    if (!CategoryName) {
      toast.warning("Please fill the Category name")
    }
    else {
      const body = {
        categoryName: CategoryName,
        allVideos: []
      }
      const response = await addcategory(body)
      console.log("Category Response");
      console.log(response);
      if (response.status === 201) {
        toast.success(`${CategoryName} Successfully saved`)
        getCategories()
      }

      getCategories()
      handleClose()
    }

  }
  const getCategories = async () => {
    const response = await getAllCategories()
    console.log("categories");
    console.log(response);
    const { data } = response;
    setCategories(data)
  }
  useEffect(() => {
    getCategories()

  }, [])

  const removeCategory = async (id) => {
    // alert(id) 
    const resp = await deleteCateory(id);
    if (resp.status === 200) {
      toast.success(`${CategoryName} Successfully deleted}`)
      getCategories()
    }
  }

  const dragOver = (e) => {
    e.preventDefault();
    console.log("inside dragOver");

  }
  const videoDropped = async(e, id) => {
    console.log(`Dropped on id ${id}`);
    const vId = e.dataTransfer.getData('videoID');
    console.log(`Videos with id ${vId} droppped in category woth id ${id}`);
    const result = await getVideoDetailById(vId)
    console.log(result);
    const {data} = result;
    let selectCategory = categories?.find((item=>item.id==id));
    console.log("Selected Category");
    console.log(selectCategory);
    selectCategory.allVideos.push(data)
    console.log("final Category");
    console.log(selectCategory);
    const resultNew = await updateCategory(id,selectCategory)
    getCategories();
  
  }


  return (
    <>
      <div>
        <button className='btn btn-warning' onClick={handleShow}>Add New Category</button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        data-bs-theme='dark'
      >
        <Modal.Header closeButton>
          <Modal.Title className='textstyle'><i class="fa-solid fa-list text-warning me-3"></i>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='textstyle fw-bolder'>Please Fill The Form</p>
          <Form className='border border-secondary p-3 rounded'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Category Name  "
                onChange={(e) => setCategoryName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>ADD </Button>
        </Modal.Footer>
      </Modal>
      {
        categories?.map((item) => (
          <div className='border border-secondary rounded p-3 m-3' droppable
            onDragOver={(e) => dragOver(e)}
            onDrop={(e) => videoDropped(e, item.id)}
          >
            <div className='d-flex justify-content-between align-items-center'>
              <h6>{item.categoryName}</h6>
              <button className='btn btn-danger ' onClick={() => removeCategory(item.id)}><i class="fa-solid fa-trash"></i></button>
            {
              item.allVideos?.length>0?
              item.allVideos.map((video) =>(
                <div>
                    {/* <h3>{video.caption}</h3> */}
                      <img src={video.thumbnailUrl} height={'100px'} width={'100%'} className='mt-2'/>



                      
                  </div>
              )):
              <p>No item found</p>
            }            
            </div>
          </div>

        ))
      }
    </>
  )
}

export default Category
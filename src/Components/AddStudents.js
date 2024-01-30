import React, { useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'


export const filledValidationSchema = yup.object({
  name:yup.string().required("please enter a Student name"),
  batch:yup.string().required("please enter a Batch").min(5,"Enter valid Batch"),
  gender:yup.string().required("please enter a gender"),
  qualification:yup.string().required("Please enter a student qualification")
})


function AddStudents({students, setStudents}) {
   
  const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
      name:"",
      batch:"",
      gender:"",
      qualification:"",
    },
    validationSchema:filledValidationSchema,
    onSubmit:(newStudentdata)=>{
      console.log("onsubmit",newStudentdata);
      createStudent(newStudentdata);
    },
  })


  const history = useHistory()
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")


const createStudent = async () =>{
    // creating object from input states
    const newStudents = {
      name:name,
      batch:batch,
      qualification:qualification,
      gender: gender,
}

const response = await fetch("https://6468cdcbe99f0ba0a82d4b30.mockapi.io/students", {
  method:"POST",
  body:JSON.stringify(newStudents),
  headers :{
    "Content-Type":"application/json"
  },
})
const data = await response.json()
  setStudents([...students, data])
  history.push("/students")
}

  return (
    <Base
    title={"Add New Student"}
    description={"We can able to add new students data here"}
    >
    <div className='text-area-col'>
      <form onSubmit={handleSubmit}>
    <TextField 
    name="name"
    fullWidth sx={{ m : 1}}
    label="Name"
     variant="filled"  type ="text"
     value = {values.name}
     onChange={handleChange}
     />

    <TextField
    name='batch'
    fullWidth sx={{ m : 1}}
     label="Batch" 
     variant="filled" 
     type ="text"
     value ={values.batch}
     onChange={handleChange}
     />

    <TextField 
    name='gender'
    fullWidth sx={{ m : 1}}
    label="Gender" 
    variant="filled" 
    type ="text"  
    value ={values.gender}
    onChange={handleChange}
    />

    <TextField 
    name='qualification'
    fullWidth sx={{ m : 1}}
    label="Qualification"
    variant="filled"
    type ="text" 
    value= {values.qualification}
    onChange={handleChange}
    />
      
      <Button
      onClick={createStudent}
      variant="contained">Add Students</Button>

      </form>
    </div>
    </Base>
  )
}

export default AddStudents
import React, { useState } from 'react'
import Base from '../Base/Base'
import data from '../Data/data'
import AddStudents from './AddStudents';
import UpdateStudents from './UpdateStudents';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

function Students({students, setStudents}) {
   const history = useHistory();
    // delete functionality
    

    // const deleteStudent = async (studId) => {
     
    //   const response = await fetch(`https://6468cdcbe99f0ba0a82d4b30.mockapi.io/students/${studId}`, {
    //     method: "DELETE",
    //   });
    
    //   console.log("Delete Response:", response);
    //  if(data){
    //   const remainingStudents=students.filter((stud,idx)=>stud.id !== studId)
    //   setStudents(remainingStudents)
    //  }
    // };


    // const deleteStudent = async (studId) => {
    //   const response = await fetch(`https://6468cdcbe99f0ba0a82d4b30.mockapi.io/students/${studId}`, {
    //     method: "DELETE",
    //   });
    
    //   console.log("Delete Response:", response);
    
    //   if (response.ok) {
    //     const remainingStudents = students.filter((stud) => stud.id !== studId);
    //     setStudents(remainingStudents);
    //   } else {
    //     console.error("Delete Request Failed:", response.status, response.statusText);
    //     // Log the response text for further analysis
    //     const responseText = await response.text();
    //     console.error("Delete Response Text:", responseText);
    //   }
    // };
    

    
    const deleteStudent = async (studId) => {
      const url = `https://6468cdcbe99f0ba0a82d4b30.mockapi.io/students/${studId}`;
      console.log("Delete URL:", url);
    
      try {
        const response = await fetch(url, {
          method: "DELETE",
        });
    
        console.log("Delete Response:", response);
    
        if (response.ok) {
          const remainingStudents = students.filter((stud) => stud.id !== studId);
          setStudents(remainingStudents);
        } else {
          console.error("Delete Request Failed:", response.status, response.statusText);
          const responseText = await response.text();
          console.error("Delete Response Text:", responseText);
        }
      } catch (error) {
        console.error("Delete Request Error:", error);
      }
    };
    
    
  
  
  return (
    <Base 
    title={"Students Dashboard"}
    description={"The page contains all students data"}
    >

         <div className='card-container'>
            {students.map((stud, idx)=>(
                    <Card sx={{ maxWidth:200,height:220}} key={idx}>
                       <CardContent>
                         <Typography gutterBottom variant="h5" component="div">
                           {stud.name}
                         </Typography>
                         <Typography variant='body2' color="text.primary">
                            {stud.batch}
                         </Typography>
                         <Typography variant='body2' color="text.primary">
                            {stud.gender}
                         </Typography>
                         <Typography variant='body2' color="text.primary">
                            {stud.qualification}
                         </Typography>
                       </CardContent>


                       <CardActions>
                         <Button size='small' onClick={()=>history.push(`/edit/${idx}`)}>
                          Edit
                         </Button>

                         <Button size='small' onClick={()=>deleteStudent(idx)}>
                          Delete
                         </Button>
                       </CardActions>
                    </Card>
            ))}
     </div>

    </Base>
  )
            }

export default Students
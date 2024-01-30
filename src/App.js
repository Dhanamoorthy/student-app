
import { Switch,Route } from 'react-router-dom';
import './App.css';
import Base from './Base/Base';
import Students from './Components/Students.js';
import AddStudents from './Components/AddStudents';
import UpdateStudents from './Components/UpdateStudents';
import { useEffect, useState } from 'react';
import Nopage from './Components/Nopage';
import { Redirect } from 'react-router-dom';
import DashBoard from './Components/Dashboard';
import data from './Data/data';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    const getStudents = async () =>{
      const response = await fetch("https://6468cdcbe99f0ba0a82d4b30.mockapi.io/students", {
          method:"GET",
        }); 
        const data = await response.json();
        if(data){
          setStudents(data)
        }
    }
    getStudents();
  }, [])

  return (
    <div className="App">
       <Switch>
        {/* Exact path first page to load */}
         <Route exact path="/">
             <DashBoard/>
         </Route>

          <Route path="/students">
            <Students
            students = {students}
            setStudents ={setStudents}
            />
          </Route>

          <Route path="/details">
             <Redirect to ="/students"/>
          </Route>

         <Route path="/add">
            <AddStudents
            students = {students}
            setStudents ={setStudents}
            />
         </Route>

         <Route path="/edit/:id">
            <UpdateStudents
              students = {students}
              setStudents ={setStudents}
            />
         </Route>

          <Route path="**">
              <Nopage/>
          </Route>

       </Switch>
    </div>
  );
}

export default App;
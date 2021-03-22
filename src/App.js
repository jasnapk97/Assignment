import logo from "./logo.svg";
import "./App.css";
import React,{useState,useEffect } from 'react';
import Axios from 'axios'
function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");

  const [user,setUser]=useState([])
const [newaddress,setNewaddress]=useState(0);
 // const [newuser,setnewuser]=useState("");
// useEffect(()=>{
//   Axios.get("http://localhost:4000/api/get").then((response)=>{
// setUser(response.data)
//   });
// },[]);

useEffect
(() => {
Axios.get("http://localhost:4000/api/get").then((res)=>{
  
setUser(res.data);
//console.log(res.data)
})
},[])



  const  submitForm =()=>{
    Axios.post("http://localhost:4000/api/insert",{id:id,name:name,place:place,address:address})
    .then(() => {
      setUser([
        ...user,
        {
          name: name,
         place:place
        },
      ]);
    });

  }
  const deleteData=(name)=>{
    Axios.delete(`http://localhost:4000/api/delete/${name}`).then((response) => {
      setUser(
        user.filter((val) => {
          return val.name != name;
        })
      );
    });
   
  };

  const updateData=(id)=>{
    // Axios.put("http://localhost:4000/api/update",{
    //  id:id,
    //      address:address
   
    // });
    // setnewuser("")

    Axios.put("http://localhost:4000/api/update", { address: newaddress, id: id }).then(
      (response) => {
        setUser(
          user.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  place: val.place,
                  address: newaddress,
                }
              : val;
          })
        );
      }
    );


  };
  return (
    <div className="App">
      <h1>CRUD OPERATIONS BY NODE REACT MYSQL</h1>
      <div className="form">
        <label>Rollnumber:</label>
        <input type="text" name="id" onChange={(e)=>{setId(e.target.value)}}></input>
        <label>Name :</label>
        <input type="text" name="name" onChange={(e)=>{setName(e.target.value)}}></input>
        <label>Place :</label>
        <input type="text" name="place" onChange={(e)=>{setPlace(e.target.value)}}></input>
        <label>Address :</label>
        <input type="text" name="address" onChange={(e)=>{setAddress(e.target.value)}}></input>
        <button onClick={submitForm}>submit</button>
     
        <h1 style={{color:"red"}}> Users List</h1>
      {user.map((val)=>{
     return (
       <div className="card">
     
     <h2 style={{color:"green"}}>Name: {val.name} </h2> 
     <p> Place: {val.place} </p>
     <p> Address: {val.address} </p>
     <button  onClick={()=>{deleteData(val.name);}}>delete</button> 
     <p>Enter new adress to be updated</p>
     <input type="text" onChange={(e)=>{
       setNewaddress(e.target.value)
     }}></input>
      <button onClick={()=>{updateData(val.id);}}>{""}update</button>
     
     </div>)
          
   }
   
   )}
  
     </div>
     
      
    </div>
  );
}

export default App;

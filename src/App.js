import { useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios';



function App() {    
const [name, setname] = useState(" ");
const [age, setage] = useState(0); 
const [listOfFrineds,setListOfFriends]=useState([]);

const addFriend =()=>{
 Axios.post("https://pv-mern-app.herokuapp.com/addFriend",
 {
   name:name,
  age:age
})
 .then((response)=>{
    setListOfFriends([...listOfFrineds,{_id: response.data._id, name:name, age:age}])

 }).catch(()=>{
   alert("not submitted due to err ");
 })
}

const frinedToUpdate = (id) =>{
  const newAge = prompt("Enter New Age: ");
  Axios.put("https://pv-mern-app.herokuapp.com/update",{newAge:newAge,id:id}).then(()=>{
    setListOfFriends(listOfFrineds.map((val)=>{
      return val._id==id?{_id:id,name:val.name, age:newAge}:val; 
    }))
  });
}


const delFriend=(id)=>{
  Axios.delete(`https://pv-mern-app.herokuapp.com/delete/${id}`).then(()=>{
    setListOfFriends(
      listOfFrineds.filter((val)=>{
        return val._id!=id;
      })
    )
  });
};

useEffect(()=>{
Axios.get("https://pv-mern-app.herokuapp.com/read")
.then((response)=>{
  setListOfFriends(response.data);
}).catch(()=>{
  console.log("err");
})

},[]);


  return (
    <div className="App">
      <div className="input">
          <input type="text" 
          placeholder="Name" 
          onChange={(event)=>{
            setname(event.target.value);
            }}/>
          <input type="number" 
          placeholder="age" 
          onChange={(event)=>{
            setage(event.target.value);
            }}/>
          <button onClick={addFriend}>Submit</button>
      </div>
      <div className="listOfFriend">
                  {listOfFrineds.map((val)=>{
              return (
              <>
              <div className="friendContainer">
                <div className="Friend">
                <h3>Name: {val.name}</h3> 
                <h3>Age: {val.age}</h3>
                </div>
                <button id="update" onClick={()=>{
                  frinedToUpdate(val._id);
                }}>Upadate</button>
                <button id="removebtn"
                onClick={()=>{
                  delFriend(val._id);
                }}>X</button>
              </div>
                </>
              )
            })}
         </div>
  
    </div>
  );
}

export default App;

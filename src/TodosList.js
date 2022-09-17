import React, { useState,useEffect } from "react";
import { List, TextField, Button,ListItem,Typography} from "@mui/material";
import TodosItem from "./TodosItem";
import {create, read} from './service/todos/index';


const TodosList=()=>{

const [data,setData] = useState([]);
const [newTodo, setNewTodo] = useState('');

const handleChange = (event) => {
    setNewTodo(event.target.value);
};


useEffect(()=>{
    read().then(resp=>{ 
      setData(resp.data.reverse());
    });
  },[]);
  

const handleDelete=(id)=>{
setData(prev=> prev.filter(t=> Number(t.id)!==Number(id)));
}

const handleClick =()=>{

    create({
        content:newTodo,
        isCompleted:false
    }).then(resp=>{
        setData(prev=> [resp.data, ...prev])
        });    
}


const handleEdit=(editObj)=>{
    
    const ind = data.findIndex(todo => {
        return Number(todo.id) === Number(editObj.id);
      });
      
      const arr = [...data];
      arr[ind].content=editObj.content;
      setData(arr); 
}


 function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


    return (
        <List sx={{ width: '100%', maxWidth: "70%", backgroundColor:"#EEEEEE", marginLeft: "auto", marginRight:"auto"  }}>
            <Typography sx={{backgroundColor:"#003865", width:"35%", marginLeft:"auto", marginRight:"auto", borderRadius:1, padding:2, color: "white", marginBottom:2}}>Kullanıcı Adı: {getCookie("username")}</Typography>
            <ListItem key="" sx={{marginBottom: 3}}>
                <TextField id="outlined-basic" label="Yeni Todo"  onChange={handleChange} variant="outlined"  inputProps={{
    minLength: 3,
  }} placeholder="Buraya Yazın"/>
                <Button variant="contained" sx={{marginLeft: "auto", marginRight: 0}} onClick={handleClick} disabled={newTodo.trim().length>3? false: true}>Ekle</Button>
            </ListItem>

            {data.map(todo=><TodosItem key={todo.id} id={todo.id} content={todo.content}  status ={todo.isCompleted} onDelete={handleDelete} onEdit={handleEdit}/>)}
        </List>
    )

}

export default TodosList;


import { useState } from 'react';
import './App.css';
import { Box, TextField, Button, Typography } from '@mui/material';
import TodosList from './TodosList';

const App=()=> {


const [hasUsername, setHasUsername] = useState(false);
const [username, setUsername] = useState("");

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const handleClick=()=>{
document.cookie = `username=${username}`;
 setHasUsername(true)
}

const handleChange=(event)=>{
  setUsername(event.target.value);
 }
 
  return (
    <div>
      <Box>

        {hasUsername ?  <TodosList/> : 
          <Box sx={style}>
            <Typography variant="h5" gutterBottom sx={{marginBottom:2}}>Kullanıcı Adı Giriniz:</Typography>

            <TextField id="user-name" label="Username" variant="outlined" onChange={handleChange}  />
            <Button variant="contained" sx={{display:"block" ,marginRight: "auto", marginLeft:0, marginTop:2, width:"30%"}} onClick={handleClick}>Ok</Button>
          </Box>}
       
      </Box>

    </div>
  );
}
export default App;

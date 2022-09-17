import React, { useState } from "react";
import {ListItem, Button, Typography, Box, Modal, TextField} from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {destroy, update} from "./service/todos/index";



const TodosItem=({id,content,status, onDelete, onEdit})=>{

    const [isChecked, setIsChecked]=useState(status);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//checkbox
    const handleChange=(event)=>{
        setIsChecked(event.target.checked);
        update(id, {isCompleted: event.target.checked});
    }

    const handleClick=()=>{
      destroy(id);
      onDelete(id);
  }


//modal
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [edit, setEdit] = useState(content);

  const handleEditChange=(event)=>{
    setEdit(event.target.value);
  }

  const handleEditClick=(event)=>{
  update(id, {
    content: edit
  }).then(resp=> { onEdit(resp.data)})
}


    return <ListItem>
        <Checkbox {...label} checked={isChecked} color="success" onChange={handleChange} />
 
        <Typography variant="h5" gutterBottom>{content}</Typography>

<Box sx={{marginRight: 0, marginLeft: "auto"}}>
    <Button variant="outlined" startIcon={<EditIcon />} sx={{marginRight: 1}} id={id} onClick={handleOpen}>
  Düzenle
    </Button>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <TextField defaultValue={content} /* error={newTodo.trim().length>3? false: true} */ id="outlined-basic" label="Yeni Todo"  onChange={handleEditChange} variant="outlined"
   placeholder="Buraya Yazın"/>
          <Button variant="contained" sx={{marginLeft: "auto", marginRight: 0}} onClick={handleEditClick} disabled={edit.trim().length>3 ? false: true} >Düzenle</Button>
         
        </Box>
        </Modal>



<Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClick} id={id}>
  Sil
</Button>
</Box>
    </ListItem>
  

}

export default TodosItem;
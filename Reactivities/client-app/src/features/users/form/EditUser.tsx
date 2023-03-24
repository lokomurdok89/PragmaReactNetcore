import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Header, Modal, Segment } from "semantic-ui-react";
import { User } from "../../../app/model/user";
import ModalUi from "./ModalUi";

interface Props{
    user:User;
    closeForm:() => void;
    createOrEdit:(user:User)=> void;
    submitting:boolean;
    isOpen:boolean;
}
const _objEmpty = {
    id:'',
    nombre:'',
    correo:'',
    fechaNacimiento:'',
    rut:''
}
export default function EditUser({user: selectedUser,closeForm,createOrEdit,submitting,isOpen}:Props){       

    const[user, setUser] = useState(selectedUser);
    useEffect(() => setUser(selectedUser), [selectedUser])

    function handleSubmit(){
        createOrEdit(user);
        closeForm();
        setUser(_objEmpty) 
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name,value}=event.target;
        setUser({...user,[name]:value});
    }

    return(               
        <ModalUi isOpen={isOpen}>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <label>Nombre</label>
                   <Form.Input placeholder="Nombre" value={user.nombre} name='nombre' onChange={handleInputChange}/>
                    <label>Correo</label>
                    <Form.Input placeholder="Correo" value={user.correo} name='correo'  onChange={handleInputChange}></Form.Input>
                    <label>Rut</label>
                    <Form.Input placeholder="Rut"name='rut' value={user.rut} onChange={handleInputChange}></Form.Input>
                    <label>Fecha Nacimiento</label>
                    <Form.Input placeholder="FechaNacimiento" type="date" value={user.fechaNacimiento} name='fechaNacimiento' onChange={handleInputChange} ></Form.Input> 
                
                    <Button color='black' onClick={() => closeForm()} floated="right" content="Cancel" ></Button> 
                    <Button loading ={submitting} floated="right" positive type="submit" content="Submit" icon='checkmark'></Button> 
                </Form>   
         </ModalUi> 
    )

}
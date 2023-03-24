import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
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
export default function CreateUser({user: selectedUser,isOpen,createOrEdit,closeForm,submitting}:Props){       

    const[userCreate, setUserCreate] = useState(selectedUser);
    
    function handleSubmit(){
        createOrEdit(userCreate); 
        closeForm();
        setUserCreate(_objEmpty)   
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name,value}=event.target;   
        setUserCreate({...userCreate,[name]:value})
    }

    return(     
        <ModalUi isOpen={isOpen}>  
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <label>Nombre</label>
                <Form.Input placeholder="Nombre" value={userCreate.nombre} name='nombre' onChange={handleInputChange}/>
                <label>Correo</label>
                <Form.Input placeholder="Correo" value={userCreate.correo} name='correo'  onChange={handleInputChange}></Form.Input>
                <label>Rut</label>
                <Form.Input placeholder="Rut"name='rut' value={userCreate.rut} onChange={handleInputChange}></Form.Input>
                <label>Fecha Nacimiento</label>
                <Form.Input placeholder="FechaNacimiento" type="date" value={userCreate.fechaNacimiento} name='fechaNacimiento' onChange={handleInputChange} ></Form.Input> 
                <Button onClick={() => closeForm()} color='black' floated="right" content="Cancel" ></Button> 
                <Button loading ={submitting} floated="right" positive type="submit" content="Submit" icon='checkmark'></Button> 
            </Form>
        </ModalUi>   
           
    )

}
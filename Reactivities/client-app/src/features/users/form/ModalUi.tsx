import React, { ChangeEvent, Children,ReactNode, useEffect, useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";

type PropsModal = {
    isOpen:boolean;
    children:ReactNode
}

export default function ModalUi({isOpen,children}:PropsModal){      
    return(       
            <Modal open={isOpen} dimmer={'blurring'}>
            <Modal.Header>Usuario</Modal.Header>            
            <Modal.Content>
                {children}
            </Modal.Content> 
            <Modal.Actions>
                <p></p>                                         
            </Modal.Actions>
            </Modal>
    )

}
import React, { SyntheticEvent, useState } from "react";
import { User } from "../../app/model/user";
import {  Button, Checkbox, Icon, Item, ItemContent, Label, Segment, Table } from "semantic-ui-react";

interface Props{
    users:User[];
    selectUser: (id:string) => void;
    deleteUser: (id:string) => void;
    submitting:boolean;
}

export default function UserList({users,selectUser,deleteUser,submitting}:Props){

    const[target,setTarget] = useState('');
    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name);
        deleteUser(id);
    }
    return(
        <Table compact celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Fecha Nacimiento</Table.HeaderCell>
            <Table.HeaderCell>Rut</Table.HeaderCell>
            <Table.HeaderCell>Correo</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>    
        <Table.Body>
        {users.map(user =>(
          <Table.Row key={user.id}>
            <Table.Cell>{user.nombre}</Table.Cell>
            <Table.Cell>{user.fechaNacimiento}</Table.Cell>
            <Table.Cell>{user.rut}</Table.Cell>
            <Table.Cell>{user.correo}</Table.Cell>
            <Table.Cell>
                         <Button onClick={() => selectUser(user.id)} floated="left" content="View" color="blue"></Button>
                          <Button 
                                name={user.id}
                                loading={submitting && target === user.id} onClick={(e) => handleActivityDelete(e,user.id)} floated="right" content="Delete" color="red">    
                          </Button>

            </Table.Cell>
          </Table.Row>  
          ))}      
        </Table.Body>
    
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='4'>
              <Button
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
              >
                <Icon name='user' /> Add User
              </Button>              
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
        
       /* <Segment>
            <Item.Group divided>
                {activities.map(activity =>(
                        <Item key ={activity.id}>
                            <ItemContent>
                                <Item.Header as="a">{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city},{activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => selectActivity(activity.id)} floated="right" content="View" color="blue"></Button>
                                    <Button 
                                        name={activity.id}
                                        loading={submitting && target === activity.id} onClick={(e) => handleActivityDelete(e,activity.id)} floated="right" content="Delete" color="red"></Button>
                                    <Label basic content={activity.category}/>
                                </Item.Extra>
                            </ItemContent>
                        </Item>
                ))}
            </Item.Group>
        </Segment>*/
    )

}
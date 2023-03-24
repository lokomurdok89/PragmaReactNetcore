import React, { SyntheticEvent, useState } from "react";

import {  Button,  Icon, Pagination, PaginationProps, Table } from "semantic-ui-react";
import { User } from "../../../app/model/user";
import fileSaver from 'file-saver';
interface Props{
    users:User[];
    selectUser: (id:string) => void;
    deleteUser: (id:string) => void;
    handleOpenCreateModal: () => void;
    submitting:boolean;
}

export default function UserList({users,selectUser,deleteUser,submitting,handleOpenCreateModal}:Props){

    const[target,setTarget] = useState('');
    const [activePage, setActivePage] = useState(1);

    const PAGE_SIZE = 5; // Cantidad de elementos por página
    const tableData = users.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE);    

    const handlePaginationChange = (event:React.MouseEvent<HTMLAnchorElement>, { activePage }:PaginationProps | any) => {
      setActivePage(parseInt(activePage));
    };
      
    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name);
        deleteUser(id);
    }   

    const exportToExcel = (users:User[], fileName:string) => {
      const tableHeader = '<tr>' + Object.keys(users[0]).map(key => `<th>${key}</th>`).join('') + '</tr>';
      const tableBody = users.map(row => '<tr>' + Object.values(row).map(value => `<td>${value}</td>`).join('') + '</tr>').join('');
      const htmlTable = `<table>${tableHeader}${tableBody}</table>`;
      const blob = new Blob([htmlTable], {type: 'application/vnd.ms-excel'});
      fileSaver.saveAs(blob, fileName);
    };


    return(
        <Table compact celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Fecha Nacimiento</Table.HeaderCell>
            <Table.HeaderCell>Rut</Table.HeaderCell>
            <Table.HeaderCell>Correo</Table.HeaderCell>
            <Table.HeaderCell width={3}>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>    
        <Table.Body>
        {tableData.map(user =>(
          <Table.Row key={user.id}>
            <Table.Cell textAlign="center">{user.nombre}</Table.Cell>
            <Table.Cell textAlign="center">{user.fechaNacimiento}</Table.Cell>
            <Table.Cell textAlign="center">{user.rut}</Table.Cell>
            <Table.Cell textAlign="center">{user.correo}</Table.Cell>
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
          <Table.HeaderCell colSpan="5">
            <Pagination
              activePage={activePage}
              onPageChange={handlePaginationChange}
              totalPages={Math.ceil(users.length / PAGE_SIZE)}
              size="small"
              floated='right'
            />
          </Table.HeaderCell>
        </Table.Row>          
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Button
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
                onClick={handleOpenCreateModal}
              >
               <Icon name='user' /> Add User
              </Button>
                              <Button icon color="green" onClick={() => exportToExcel(users, 'data.xls')}>
                              <Icon name='file excel' />  Export to Excel
                </Button>  
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>      

    )

}
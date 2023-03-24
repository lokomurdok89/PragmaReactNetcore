import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { User } from "../../../app/model/user";
import UserList from "./UserList"
import CreateUser from "../form/CreateUser";
import EditUser from "../form/EditUser";


interface Props{
    users:User[];
    createOrEdit: (user:User| undefined)=> void;
    deleteUser:(id:string)=> void;
    submitting:boolean;
}
const _objEmpty = {
    id:'',
    nombre:'',
    correo:'',
    fechaNacimiento:'',
    rut:''
}
export default function UserDashBoard({users,createOrEdit, deleteUser,submitting}: Props){
       
        const [selectedUser, setSelectedUser] = useState<User>(_objEmpty);      
        const [isCreating, setIsCreating] = useState<boolean>(false);  
        const [isEditing, setIsEditing] = useState<boolean>(false);    


        function handleEditUser(id:string){            
            var _tmp = users.find(x => x.id===id);               
            if(_tmp){setSelectedUser(_tmp);}
            setIsEditing(true);
            //setOpen(true);
        } 
        const handleOpenCreate = () => {
            setSelectedUser(_objEmpty);
            setIsCreating(true);
        };
      const handleCloseModal = () => {
            setSelectedUser(_objEmpty);
            setIsEditing(false);
            setIsCreating(false);
        };
return (
        <Grid>
        <Grid.Column width='15'>
            <UserList handleOpenCreateModal={handleOpenCreate} users={users} selectUser={handleEditUser}  deleteUser={deleteUser} submitting={submitting}/>          
            <EditUser isOpen={isEditing} closeForm ={handleCloseModal} user={selectedUser} createOrEdit={createOrEdit} submitting={submitting} ></EditUser>
            <CreateUser isOpen={isCreating} user={_objEmpty} closeForm={handleCloseModal} createOrEdit={createOrEdit} submitting={submitting}/>
        </Grid.Column>     

        </Grid>
        )
}
import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { User } from "../../../app/model/user";
import UserForm from "../form/UserForm";
import UserList from "./UserList"


interface Props{
    users:User[];
   // selectedUser:User | undefined;
  //  selectUser:(id:string) => void;
  //  cancelSelectUser: () => void;
  //  editMode: boolean;
  //  openForm: (id:string) => void;
  //  closeForm: () => void;
    createOrEdit: (user:User)=> void;
    deleteUser:(id:string)=> void;
    submitting:boolean;
    setOpen:(flag:boolean)=> void;
    isOpen:boolean;
}
export default function UserDashBoard({users,createOrEdit, deleteUser,submitting, setOpen,isOpen}: Props){

       
        const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);      
       
        function handleSelectUser(id:string){
            setSelectedUser(users.find(x => x.id===id));
            setOpen(true);
        } 
        const handleOpenModal = () => {
            setSelectedUser(undefined);
            setOpen(true);
        };
        const handleCloseModal = () => {
            setSelectedUser(undefined);
            setOpen(false);
        };
return (
        <Grid>
        <Grid.Column width='12'>
            <UserList handleOpenModal={handleOpenModal} users={users} selectUser={handleSelectUser}  deleteUser={deleteUser} submitting={submitting}/>          
            <UserForm isOpen={isOpen} closeForm ={handleCloseModal} user={selectedUser} createOrEdit={createOrEdit} submitting={submitting}></UserForm>
        </Grid.Column>     

        </Grid>
        )
}
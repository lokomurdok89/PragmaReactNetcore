import { Grid } from "semantic-ui-react";
import { User } from "../../app/model/user";
import UserList from "./UserList"


interface Props{
    users:User[];
    selectedUser:User | undefined;
    selectUser:(id:string) => void;
    cancelSelectUser: () => void;
    editMode: boolean;
    openForm: (id:string) => void;
    closeForm: () => void;
    createOrEdit: (user:User)=> void;
    deleteUser:(id:string)=> void;
    submitting:boolean;
}
export default function UserDashBoard({users,selectedUser,
    selectUser,cancelSelectUser, openForm, closeForm, editMode, createOrEdit, deleteUser,submitting}: Props){
return (
        <Grid>
        <Grid.Column width='12'>
            <UserList users={users} selectUser={selectUser}  deleteUser={deleteUser} submitting={submitting}/>
        </Grid.Column>     

        </Grid>
        )
}
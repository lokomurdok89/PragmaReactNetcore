import React, { Fragment, useEffect, useState } from 'react';
import { User } from '../model/user';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import UserDashboard from '../../features/users/UserDashboard';



function App() {

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading]=useState(true);
  const [submitting,setSubmitting]=useState(false);

  useEffect(()=>{
    agent.Activities.list()
      .then(response => {
        let activities: User[] =[];
        response.forEach((element:User) => {
          element.fechaNacimiento = element.fechaNacimiento.split('T')[0];
          activities.push(element); 
        });

        setUsers(response);
        setLoading(false);
      })
  },[])
  function handleSelectActivity(id:string){
    setSelectedUser(users.find(x => x.id===id));
  }

  function handleCancelSelectedActivity(){
    setSelectedUser(undefined);
  }

  function handleFormOpen(id?:string){
    id? handleSelectActivity(id): handleCancelSelectedActivity();
    setEditMode(true);

  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(user: User){
    setSubmitting(true);
    if(user.id){
      agent.Activities.update(user).then(()=>{
        setUsers([...users.filter(x => x.id != user.id),user])
      })
    }else{
      user.id = "";
      agent.Activities.create(user).then(()=>{
        setUsers([...users, user]);  
      })
    }
    setSelectedUser(user);
    setEditMode(false);
    setSubmitting(false);    
  }

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setUsers([...users.filter(x => x.id!==id)])
      setSubmitting(false);
    })   

  }
  if(loading) return<LoadingComponent content='Cargando App'/>
  
  return (
    <Fragment>
    <NavBar openForm={handleFormOpen}/>
    <Container style={{marginTop: '7em'}}>
     <UserDashboard 
                users={users}
                selectedUser={selectedUser}
                selectUser = {handleSelectActivity}
                cancelSelectUser = {handleCancelSelectedActivity}
                editMode ={editMode}
                openForm = {handleFormOpen}
                closeForm = {handleFormClose}
                createOrEdit={handleCreateOrEditActivity}
                deleteUser ={handleDeleteActivity}
                submitting ={submitting}
     />
    </Container>

</Fragment>
  );
}

export default App;



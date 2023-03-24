import React, { Fragment, useEffect, useState } from 'react';
import { User } from '../model/user';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid';
import { Container } from 'semantic-ui-react';
import UserDashboard from '../../features/users/dashboard/UserDashboard';

function App() {

  const [users, setUsers] = useState<User[]>([]); 
  const [loading, setLoading]=useState(true);
  const [submitting,setSubmitting]=useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    agent.Users.list()
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

  function handleCreateOrEditActivity(user: User){
    setSubmitting(true);
    if(user.id){
      agent.Users.update(user).then(()=>{
        setUsers([...users.filter(x => x.id != user.id),user])
      })
    }else{
      user.id = uuid();
      agent.Users.create(user).then(()=>{
        setUsers([...users, user]);  
      })
    }
    setSubmitting(false);
    setIsOpen(false);    
  }

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Users.delete(id).then(()=>{
      setUsers([...users.filter(x => x.id!==id)])
      setSubmitting(false);
    })   

  }
  if(loading) return<LoadingComponent content='Cargando App'/>
  
  return (
    <Fragment>   
    <Container style={{marginTop: '7em'}}>
     <UserDashboard 
                users={users}
                createOrEdit={handleCreateOrEditActivity}
                deleteUser ={handleDeleteActivity}
                submitting ={submitting}
                setOpen = {setIsOpen}
                isOpen = {isOpen}
     />
    </Container>

</Fragment>
  );
}

export default App;



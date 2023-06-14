import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import './App.css';

function App() {

  //Tasks (This is the todo list) state
  const [toDo, setToDo] = useState([])

  //Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //Add task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false}

      //we copy all entries in toDo, place it back into toDo and add newEntry, then we clear the temp state.
      //This is similar to appending strings in python
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)

      // We created a temp toDo list that held all tasks
      // except for the one we deleted then placed it back into list
    setToDo(newTasks);
  }

  //Mark task as done or completed
  const markDone = (id) => {
    let newEntry = toDo.map(task => {
      if( task.id === id ){
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newEntry);
  }

  //Cancel task update
  const cancelUpdate = () => {
    setUpdateData('');
  }

  //Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  //Update Task
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">
      <br /><br />
      <h2>To Do List App (Using ReactJS)</h2>
      <br /><br />

      {/* Update Task*/}
      {updateData && updateData ? (
        <UpdateForm
          updateData = {updateData} 
          changeTask = {changeTask}
          updateTask = {updateTask}
          cancelUpdate = {cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask = {newTask}
          setNewTask = {setNewTask}
          addTask = {addTask}
         />
      )}
    
      {/*Display ToDos */}

      {toDo && toDo.length ? '' : 'No tasks...'}
      <ToDo
        toDo = {toDo}
        markDone = {markDone}
        setUpdateData = {setUpdateData}
        deleteTask = {deleteTask}
      />

    </div>
  );
}

export default App;

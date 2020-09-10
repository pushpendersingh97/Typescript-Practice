import React from 'react';

import ToDoList from './Components/toDoList';
import NewTodo from './Components/newToDo';

function App() {
  const todos = [{id: 't1', text: "Finish the course"}];
  return (
    <div className="App">
      <NewTodo/>
      <ToDoList items={todos}/>
    </div>
  );
}

export default App;

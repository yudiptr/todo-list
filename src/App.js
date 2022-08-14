import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
    
    const [activity, setActivity] = React.useState('');
    const [todos, setTodos] = React.useState(([]));
    const [edit, setEdit] = React.useState({});
    
    React.useEffect(() => {
      iterate();
    }, [])

    function generateId(){
      return Date.now();
    }

    function addTodo(event){
      event.preventDefault();
      
      if(edit.id){
        const update = {
          id : edit.id,
          activity, };
         
        if(!activity){return alert("Please fill the activities")}
        
        const updateTodo = todos.findIndex( function (todo) {
          return todo.id = edit.id
        })
        
        const tempTodo = [...todos];
        tempTodo[updateTodo] = update;
        return (setTodos(tempTodo),
        cancelEdit())
        
      }

      if(!activity){return alert("Please fill the activities")}

      const newTemp = {
        id : generateId(),
        activity };

      localStorage.setItem(newTemp.id,JSON.stringify(newTemp))
      iterate();
      setActivity('');
        
      
    }

    function removeTodo(todoId){

      const newTodo = todos.filter(function(todo){
        return todo.id !== todoId;
      })

      setTodos(newTodo);
      if(edit.id) cancelEdit();

    }

    function updateTodo(todo){
      setEdit(todo);
      setActivity(todo.activity);
    }

    function cancelEdit(){
      setEdit({});
      setActivity("");
    }

    function iterate(){
      const temp = [];
      for (const key in localStorage) {
        // Skip built-in properties like length, setItem, etc.
        if (localStorage.hasOwnProperty(key)) {
          temp.push(JSON.parse(localStorage.getItem(key)))
          console.log(JSON.parse(localStorage.getItem(key)))
          
        }
      }
      setTodos(temp)
    }

  return (
    <>
      <div className='bg-gray-400 top-0 h-screen contain'>
        <div className='flex item-center justify-center'>
          <h1 className=' py-2 px-2 rounded-xl text-2xl font-mono text-black-500 my-8 bg-orange-300'>Simple ToDo List by Me</h1>
        </div>
        <form className='flex item-center justify-center' onSubmit={addTodo}>
            <input className="px-3 bg-orange-300 rounded-xl placeholder-black" 
            type="text" 
            placeholder="Activities" 
            value = {activity}
            onChange={function (event) {setActivity(event.target.value)}} ></input>
            <button className="ml-4  bg-blue-300 rounded-xl px-3" type="submit">{edit.activity ? "Save Changes" : "Add"}</button>
            {edit.id && <button className='ml-4  bg-blue-300 rounded-xl px-3' onClick={cancelEdit}>Cancel Edit</button>}
        </form>
        {todos.length>0 ? 
        <div className='flex justify-center'>
          <ul className="list-disc list-inside flex flex-col mt-10">
            {
              todos.map(function (todo) {
                return(
                  <li key={todo.id}>
                  {todo.activity}
                  <button className='px-2 ml-3 mt-2 rounded-2xl bg-amber-200' onClick={updateTodo.bind(this, todo)}>Edit</button>
                  <button className='px-2 ml-3 mt-2 rounded-2xl bg-red-500' onClick={removeTodo.bind(this, todo.id)}>Remove</button>
                  </li>
                ) 
              })
            }
          </ul>
        </div>
         : <p className='flex justify-center font-mono text-black-500 text-2xl mt-5'>Nothing Here</p> }
      </div>
    </>
  );
}

export default App;

import { prisma } from "../../lib/prisma";
import { signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Task } from "@prisma/client";
import { FormEvent, useState } from "react";

type TasksProps = {
  tasks: Task[];
}

export default function App({tasks}: TasksProps){
  const [newTask, setNewTask] = useState('');

  async function handleCreateTask(event: FormEvent){
    event.preventDefault();

    fetch('http://localhost:3000/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify({title: newTask}),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    setNewTask('');
  }

  return (
    <div>
      <button onClick={()=> signOut()}>Sair</button>
      <p>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="text-3xl"> 
              {task.title}
            </li>
          ))}
        </ul>

        <form onSubmit={handleCreateTask}>
          <input type="text" value={newTask} 
          onChange={e => setNewTask(e.target.value)} />
          <button type="submit">Cadastrar</button>
        </form>
      </p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany();

  const data = tasks.map(task => {
    return {
      id: task.id,
      title: task.title,
      isDone: task.isDone,
      data: task.createdAt.toISOString()
    }
  })

  return{
    props: {
      tasks: data
    }
  }
}
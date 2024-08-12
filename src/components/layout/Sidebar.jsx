import React from 'react'
import { BackIcon, HambuggerIcon } from '../Icon'
import { Link } from 'react-router-dom'

export default function Sidebar({ tasksFiltered }) {

    const toggleSideBar = () => {
        console.log('toggle sidebar')
    }

    const backToHome = () => {
        console.log('back to home')
    }

    return (
        <div className='sidebar bg-gray-400 h-screen'>
            <div className='hamburger-icon flex items-center justify-between p-4'>
                <button onClick={backToHome} className='flex items-center'>
                    <BackIcon />
                    <span className='ml-2 font-bold'>Home</span>
                </button>
                <button onClick={toggleSideBar} className='ml-4'>
                    <HambuggerIcon />
                </button>
            </div>
            <div className='task-list p-4'>
                {tasksFiltered.length === 0 ? (
                    <p>No urgent tasks to be done, click the back button to go to the home page</p>
                ) : (
                    tasksFiltered.map(task => (
                        <Link
                            to={`/task/${task.id}`}
                            key={task.id}
                            className='block text-blue-500 underline mb-2'
                        >
                            {task.name}
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

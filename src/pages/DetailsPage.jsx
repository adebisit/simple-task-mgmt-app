import React from 'react';
import Sidebar from '../components/layout/Sidebar';

export default function DetailsPage() {
  const tasks = [
    { id: 1, name: 'Task 1', dueDate: new Date('2024-08-06T23:59:59.000Z'), priority: 1 },
    { id: 2, name: 'Task 2', dueDate: new Date('2024-08-09T23:59:59.000Z'), priority: 2 },
    { id: 3, name: 'Task 3', dueDate: new Date('2024-08-15T23:59:59.000Z'), priority: 3 },
    { id: 4, name: 'Task 4', dueDate: new Date('2024-08-09T23:59:59.000Z'), priority: 4 },
    { id: 5, name: 'Task 5', dueDate: new Date('2024-08-09T23:59:59.000Z'), priority: 5 },
  ];

  const tasksFiltered = tasks
    .filter(task => {
      const taskDueDate = new Date(task.dueDate).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      return taskDueDate === today;
    })
    .sort((a, b) => b.priority - a.priority);

  return (
    <div className="flex">
      <div className="w-72">
        <Sidebar tasksFiltered={tasksFiltered} />
      </div>
      <div className="flex-grow">
        Main Content
      </div>
    </div>
  );
}

//importing React packages...
import React from "react";

//importing components...
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import TaskCard from "../components/TaskCard";
import AddTaskButton from "../components/AddTaskButton";
import SeeMoreLink from "../components/SeeMoreLink";
import Modal from "../components/modals/Modal";
import { useState } from "react";

function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(null);
    const [primaryBtn, setPrimaryBtn] = useState('');
    const [secondaryBtn, setSecondaryBtn] = useState('');

    const openAddNewTaskModal = () => {
        setTitle('Add New Task');
        //  setContent(<AddTaskForm />);
        setPrimaryBtn('Cancel');
        setSecondaryBtn('Add Task');
        setShowModal(true);
    }

    const openDeleteTaskModal = () => {
        setTitle('Delete Task');
        // setContent(<DeleteTaskForm />);
        setPrimaryBtn('Cancel');
        setSecondaryBtn('Delete');
        setShowModal(true);
    }

    const onClose = () => {
        setShowModal(false);
    }

    const onCancel = () => {
        setShowModal(false);
    }

    const onSave = () => {
        setShowModal(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4 sm:px-8 md:px-32 lg:px-64 xl:px-64">
            <Navbar />
            <Search />
            <TaskCard />
            <AddTaskButton onClick={openAddNewTaskModal} />
            <SeeMoreLink />
            <Modal
                showModal={showModal}
                title={title}
                content={content}
                onClose={onClose}
                primaryBtn={primaryBtn}
                secondaryBtn={secondaryBtn}
                onCancel={onCancel}
                onSave={onSave}
            />
        </div>
    );
}

export default HomePage;
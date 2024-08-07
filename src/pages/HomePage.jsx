//importing React packages...
import React from "react";

//importing components...
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import TaskCard from "../components/TaskCard";
import AddTaskButton from "../components/AddTaskButton";
import AddTaskForm from "../forms/modal-forms/AddTaskForm"
import SeeMoreLink from "../components/SeeMoreLink";
import Modal from "../modals/Modal";
import { useState } from "react";

function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(null);

    const openAddNewTaskModal = () => {
        setContent(<AddTaskForm />);
        setShowModal(true);
    }

    const openDeleteTaskModal = () => {
        // setContent(<DeleteTaskForm />);
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
                title={"Add New Task"}
                content={content}
                onClose={onClose}
                primaryBtn={"Cancel"}
                secondaryBtn={"Save"}
                onCancel={onCancel}
                onSave={onSave}
            />
        </div>
    );
}

export default HomePage;
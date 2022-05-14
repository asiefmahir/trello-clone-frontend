import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DragDropContext } from 'react-beautiful-dnd'

import { TaskListContext } from "../contexts/taskList";
import { TaskContext } from "../contexts/task";

import { BoardContext } from "../contexts/board";



import TaskList from "../components/TaskList";

import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";


function BoardDetails() {
    const [listTitle, setListTitle] = useState("");
    const [editMode, setEditMode] = useState(false);
    let { boardId } = useParams();
    const { taskLists, dispatchTaskListAction } = useContext(TaskListContext);
    const { dispatchBoardAction } = useContext(BoardContext);
    const { dispatchTaskAction } = useContext(TaskContext);




    const submitHandler = (e) => {
        e.preventDefault();
        const id = Date.now();
        dispatchTaskListAction({ type: 'CREATE_LIST', payload: { id: id, boardId: boardId, title: listTitle } });
        dispatchBoardAction({ type: 'ADD_LIST_ID_TO_BOARD', payload: { id: boardId, taskListId: id } })

        setListTitle("");
        setEditMode(false);
    };

    const dragEndHandler = (result) => {
        console.log(result);
        const { destination, source, draggableId } = result;
        console.log(result);

        if (!destination) {
            return
        }

        if (destination.droppableId !== source.droppableId) {
            dispatchTaskListAction({ type: 'REMOVE_TASK_ID_FROM_LIST', payload: { id: parseInt(source.droppableId), taskId: parseInt(draggableId) } })
            dispatchTaskListAction({ type: 'ADD_TASK_ID_TO_LIST', payload: { id: parseInt(destination.droppableId), taskId: parseInt(draggableId) } })
            dispatchTaskAction({ type: 'CHANGE_LIST_ID_OF_TASK', payload: { id: parseInt(draggableId), taskListId: parseInt(destination.droppableId) } })
        } else if (destination.droppableId === source.droppableId) {
            dispatchTaskListAction({ type: 'SORT_TASK_ID_IN_LIST', payload: { targetIndex: destination.index, sourceIndex: source.index, droppableId: parseInt(source.droppableId) } })
        }
    }

    return (


        <DragDropContext onDragEnd={dragEndHandler}>
            <div className="d-flex m-top-sm flex-direction-row">
                <Link to="/">Back to Boards</Link>

                {taskLists
                    ?.filter((item) => item.boardId === boardId)
                    ?.map((taskList) => (
                        <TaskList taskList={taskList} key={taskList.id} />
                    ))}
                {!editMode ? (
                    <AddItem listAddItem setEditMode={setEditMode} />
                ) : (
                    <AddItemForm
                        setEditMode={setEditMode}
                        listForm
                        submitHandler={submitHandler}
                        title={listTitle}
                        onChangeHandler={(e) => setListTitle(e.target.value)}
                    />
                )}
            </div>
        </DragDropContext>

    );
}

export default BoardDetails;

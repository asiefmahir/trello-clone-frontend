export const taskListReducer = (taskLists, action) => {
    switch (action.type) {
        case 'CREATE_LIST' : {
            const taskList = {
                id: action.payload.id,
                title: action.payload.title,
                tasks: [], // ["1655454545"]
                boardId: action.payload.boardId
            }

            return [...taskLists, taskList]
        }

        case 'UPDATE_LIST': {
            return taskLists.map((taskList) => {
                if (taskList.id === action.payload.id) {
                    taskList.title = action.payload.title || taskList.title
                }

                return taskList;
            })
        }

        case 'DELETE_LIST': {
            return taskLists.filter(item => item.id !== action.payload.id)
        }


        case 'ADD_TASK_ID_TO_LIST' : {
            return taskLists.map((list) => {
                if (list.id === action.payload.id) {
                    list.tasks.push(action.payload.taskId)
                }

                return list
            })
        }

        case 'REMOVE_TASK_ID_FROM_LIST' : {
            return taskLists.map((list) => {
                if (list.id === action.payload.id) {
                    list.tasks = list.tasks.filter(task => task !== action.payload.taskId)
                }

                return list
            })
        }

        case 'CHANGE_BOARD_ID_OF_LIST' : {
            return taskLists.map((list) => {
                if (list.id === action.payload.id) {
                    list.boardId = action.payload.boardId;
                }

                return list
            })
        }

        case 'SORT_TASK_ID_IN_LIST': {
            const {
                targetIndex,
                sourceIndex,
                droppableId
            } = action.payload;

            console.log(targetIndex, sourceIndex)

            // const targetList = taskLists.find(taskList => taskList.id === droppableId);
            // console.log(targetList);
            
            // console.log(targetList)

            return taskLists.map(item => {
                if (item.id === droppableId) {
                    const newArray = item.tasks.splice(sourceIndex, 1)
                    console.log(item.tasks)
                    item.tasks.splice(targetIndex, 0, ...newArray); 
                    console.log(item.tasks)

                }

                return item
            })

            // return [...taskLists] // n ref
        }

        default : {
            return taskLists;
        }
    }
}
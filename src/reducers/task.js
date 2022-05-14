export const taskReducer = (tasks, action) => {
    switch (action.type) {
        case 'CREATE_TASK' : {
            const task = {
                id: action.payload.id,
                title: action.payload.title,
                boardId: action.payload.boardId,
                taskListId: action.payload.taskListId
            }

            return [...tasks, task]
        }

        case 'UPDATE_TASK': {
            return tasks.map((task) => {
                if (task.id === action.payload.id) {
                    task.title = action.payload.title
                }

                return task
            })
        }

        case 'DELETE_TASK': {
            return tasks.filter((task) => task.id !== action.payload.id)
        }

        case 'CHANGE_BOARD_ID_OF_TASK' : {
            return tasks.map((task) => {
                if (task.id === action.payload.id) {
                    task.boardId = action.payload.boardId
                }

                return task
            })
        }

        case 'CHANGE_LIST_ID_OF_TASK' : {
            return tasks.map((task) => {
                if (task.id === action.payload.id) {
                    task.taskListId = action.payload.taskListId
                }

                return task
            })
        }

        default : {
            return tasks
        }
    }
}

// const newArray =  tasks.map(item => {
//     // logic
//     return item.product * 2
// })

// newArray = [20, 60, ]

// (a, b) => a + b
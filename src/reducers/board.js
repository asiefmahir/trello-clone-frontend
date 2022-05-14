export const boardReducer = (boards, action) => {
    switch (action.type) {
        case 'CREATE_BOARD' : {
            const board = {
                id: Date.now(),
                title: action.payload.title,
                taskLists: [],
                tasks: [],
                createdAt: new Date().toLocaleDateString(),
            }

            return [...boards, board]

        }
        // case 'EDIT_BOARD' : {

        // }

        case 'UPDATE_BOARD' : {
            const toBeUpdatedBoard = boards.find((item) => item.id === action.payload.id);
            return boards.map((board) => {
                if (board.id === toBeUpdatedBoard.id) {
                    board.title = action.payload.title;
                }

                return board
            }) //  [{}, {title: action.payload.tile}, {}]
        }

        case 'DELETE_BOARD' : {
            return boards.filter(board => board.id !== action.payload.id)
        }

        case 'ADD_LIST_ID_TO_BOARD' : {
            // const board = boards.find(item => item.id === action.payload.id);

            return boards.map((board) => {
                if (board.id === action.payload.id) {
                    board.taskLists.push(action.payload.taskListId)
                }

                return board
            })
        }

        case 'REMOVE_LIST_ID_FROM_BOARD' : {
            return boards.map((board) => {
                if (board.id === action.payload.id) {
                    board.taskLists = board.taskLists.filter(item => item !== action.payload.taskListId)
                }

                return board
            })
        }

        case 'ADD_TASK_ID_TO_BOARD' : {
            return boards.map((board) => {
                if (board.id === action.payload.id) {
                    board.tasks.push(action.payload.taskId)
                }

                return board
            })
        }

        case 'REMOVE_TASK_ID_FROM_BOARD' : {
            return boards.map((board) => {
                if (board.id === action.payload.id) {
                    board.tasks = board.tasks.filter(item => item !== action.payload.taskId)
                }

                return board
            })
        }

        default : {
            return boards
        }
    }
};
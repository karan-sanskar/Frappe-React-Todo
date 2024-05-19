import React, { useEffect } from 'react'
import { useFrappeAuth, useFrappeGetDocList } from 'frappe-react-sdk'
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TodoView from './TodoView';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const TodoList = () => {
    //! FRAPPE GET LIST OF THE TODO LIST 
    const { data: TodoListData, isLoading, error } = useFrappeGetDocList('Event', {
        fields: ["name", "subject", "starts_on", "ends_on", "status", "event_type"],
        filters: { "status": "Open" },
        orderBy: {
            field: 'starts_on',
            order: 'asc',
        },
    });
    // console.log(TodoListData, isLoading)
    // console.log(useFrappeAuth)



    return (
        <section className='container-main todo-list-data'>
            {/* TODO HEADING */}
            <div className="todo-head grid grid-cols-12 text-sm bg-slate-100 p-2">
                <div className="status col-span-1">
                    Status
                </div>
                <div className="title col-span-5">
                    Title
                </div>
                <div className="start-date-time col-span-3">
                    Start Date Time
                </div>
                <div className="end-date-time col-span-3">
                    End Date Time
                </div>
            </div>
            {/* END TODO HEADING */}

            {/* TODO LIST */}
            <div className="todo-list">
                {
                    !isLoading && TodoListData.map((item) =>
                        <TodoView name={item.name} key={item.name} title={item.subject} start_date_time={item.starts_on} end_date_time={item.ends_on} />
                    )
                }
            </div>
            {/* END TODO LIST */}

            {isLoading && <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
            {error && console.log("Error", error)}
        </section>

    )
}

export default TodoList
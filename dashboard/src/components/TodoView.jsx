import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useFrappeUpdateDoc } from 'frappe-react-sdk'
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



const TodoView = ({ name, title, start_date_time, end_date_time }) => {

    //! DEFINE STATES
    const [EventName, useEventName] = useState(name);
    const [ShowEvent, useEventShowEvent] = useState("show");
    const [EventSubject, useEventSubject] = useState(title);
    const [EventStartsOn, useEventStartsOn] = useState(dayjs(start_date_time));
    const [EventEndsOn, useEventEndsOn] = useState(dayjs(end_date_time));

    //! UPDATE FRAPPE DOC
    const { updateDoc, loading, error, isCompleted } = useFrappeUpdateDoc();

    //! UPDATE EVENT STATUS
    const UpdateStatus = () => {
        //! UPDATE FRAPPE DOC
        updateDoc('Event',
            EventName,
            { status: "Completed" }
        ).then((doc) => {
            //! SUCCESS 
            console.log("Status Updated!", doc.status)
            setTimeout(() => {
                useEventShowEvent("hidden")
            }, 250);
        }).catch((error) => {
            //! ERROR
            console.error(error);
        });
    }

    //! UPDATE EVENT SUBJECT
    const UpdateSubject = (Subject) => {
        if (Subject != EventSubject) {
            //! UPDATE FRAPPE DOC
            updateDoc('Event',
                EventName,
                { subject: Subject }
            ).then((doc) => {
                //! SUCCESS 
                console.log("Subject Updated!", doc.subject)
                useEventSubject(Subject);
            }).catch((error) => {
                //! ERROR
                console.error(error);
            });
        }
    }

    //! UPDATE EVENT STARTS ON
    const UpdateStartsOn = (StartsOn) => {
        //! FORMAT DATE TO THE STANDARD FORMAT 
        const NewStartsOn = String(StartsOn.format('YYYY-MM-DD HH:mm:ss'));
        if (NewStartsOn != start_date_time) {
            //! UPDATE FRAPPE DOC
            updateDoc('Event',
                EventName,
                { starts_on: NewStartsOn }
            ).then((doc) => {
                //! SUCCESS 
                console.log("Starts On Updated!", doc.starts_on)
                useEventStartsOn(dayjs(NewStartsOn));
            }).catch((error) => {
                //! ERROR
                console.error(error);
            });
        }
    }

    //! UPDATE EVENT ENDS ON
    const UpdateEndsOn = (EndsOn) => {
        //! FORMAT DATE TO THE STANDARD FORMAT 
        const NewEndsOn = String(EndsOn.format('YYYY-MM-DD HH:mm:ss'));
        if (NewEndsOn != end_date_time) {
            //! UPDATE FRAPPE DOC
            updateDoc('Event',
                EventName,
                { ends_on: NewEndsOn }
            ).then((doc) => {
                //! SUCCESS 
                console.log("Ends On Updated!", doc.ends_on)
                useEventEndsOn(dayjs(NewEndsOn));
            }).catch((error) => {
                //! ERROR
                console.error(error);
            });
        }
    }

    return (
        <div className={`todo-1 grid grid-cols-12 items-center bg-white p-2 border-b border-gray-300 ${ShowEvent}`} >
            {/* STATUS */}
            <div className="status col-span-1">
                <Checkbox
                    aria-label='todo-1'
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleOutlinedIcon />}
                    onClick={() => { UpdateStatus() }}
                />
            </div>
            {/* END STATUS */}

            {/* SUBJECT */}
            <div className="title col-span-5">
                <TextField
                    id="standard-basic"
                    // label="Title"
                    variant="standard"
                    className='w-[90%]'
                    defaultValue={EventSubject}
                    onBlur={(e) => { UpdateSubject(e.target.value) }}
                />
            </div>
            {/* END SUBJECT */}

            {/* STARTS ON */}
            <div className="start-date-time col-span-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        // label="Select Date and Time"
                        ampm={false}
                        value={EventStartsOn}
                        className='w-[80%] border-0'
                        onChange={(StartsOn) => UpdateStartsOn(StartsOn)}
                    />
                </LocalizationProvider>
            </div>
            {/* END STARTS ON */}

            {/* ENDS ON */}
            <div className="end-date-time col-span-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        // label="Select Date and Time"
                        ampm={false}
                        value={EventEndsOn}
                        className='w-[80%] border-0'
                        onChange={(EndsOn) => UpdateEndsOn(EndsOn)}
                    />
                </LocalizationProvider>
            </div>
            {/* END ENDS ON */}
        </div>
    )
}

export default TodoView
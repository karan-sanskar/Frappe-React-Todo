import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useFrappeUpdateDoc } from 'frappe-react-sdk'


const TodoView = ({ name, title, start_date_time, end_date_time }) => {

    //! DEFINE STATES
    const [EventName, useEventName] = useState(name);
    const [ShowEvent, useEventShowEvent] = useState("show");
    const [EventSubject, useEventSubject] = useState(title);
    const [EventStartsOn, useEventStartsOn] = useState(start_date_time ? start_date_time : "");
    const [EventEndsOn, useEventEndsOn] = useState(end_date_time ? end_date_time : "");

    //! UPDATE FRAPPE DOC
    const { updateDoc, loading, error, isCompleted } = useFrappeUpdateDoc();

    //! UPDATE THE EVENT DOC FUNCTION
    const UpdateEventDoc = (DocName, UpdateData) => {
        updateDoc('Event', DocName, UpdateData).then((r) => {
            console.log(r, "Doneee")
        })
    }

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
        if (StartsOn != EventStartsOn) {
            //! UPDATE FRAPPE DOC
            updateDoc('Event',
                EventName,
                { starts_on: StartsOn }
            ).then((doc) => {
                //! SUCCESS 
                console.log("Starts On Updated!", doc.starts_on)
                useEventStartsOn(StartsOn);
            }).catch((error) => {
                //! ERROR
                console.error(error);
            });
        }
    }

    //! UPDATE EVENT ENDS ON
    const UpdateEndsOn = (EndsOn) => {
        if (EndsOn != EventEndsOn) {
            //! UPDATE FRAPPE DOC
            updateDoc('Event',
                EventName,
                { ends_on: EndsOn }
            ).then((doc) => {
                //! SUCCESS 
                console.log("Ends On Updated!", doc.ends_on)
                useEventStartsOn(EndsOn);
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
                <input
                    type="text"
                    id='subject'
                    name='subject'
                    defaultValue={EventSubject}
                    className='outline-0 w-full focus:underline underline-offset-[5px] decoration-gray-500'
                    onBlur={(e) => { UpdateSubject(e.target.value) }}
                />
            </div>
            {/* END SUBJECT */}

            {/* STARTS ON */}
            <div className="start-date-time col-span-3">
                <input
                    type="datetime-local"
                    id='starts_on'
                    name='starts_on'
                    defaultValue={EventStartsOn}
                    className='outline-gray-400 outline-offset-2 cursor-pointer'
                    onBlur={(e) => { UpdateStartsOn(e.target.value) }}
                />
            </div>
            {/* END STARTS ON */}

            {/* ENDS ON */}
            <div className="end-date-time col-span-3">
                <input
                    type="datetime-local"
                    id='starts_on'
                    name='starts_on'
                    defaultValue={EventEndsOn}
                    className='outline-gray-400 outline-offset-2 cursor-pointer'
                    onBlur={(e) => { UpdateEndsOn(e.target.value) }}
                />
            </div>
            {/* END ENDS ON */}
        </div>
    )
}

export default TodoView
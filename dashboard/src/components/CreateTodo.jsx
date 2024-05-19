import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useFrappeCreateDoc } from 'frappe-react-sdk'
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


const CreateTodo = () => {
    const TodayDateTime = new Date();
    const EndDateTime = new Date();
    EndDateTime.setHours(TodayDateTime.getHours() + 2)

    //! DEFINE STATES
    const [EventSubject, useEventSubject] = useState('');
    const [CreateBox, useCreateBox] = useState(false);

    //! ISO DATE TIME 
    const [TodayISODateTime, useTodayISODateTime] = useState(TodayDateTime.toISOString());
    const [EndISODateTime, useEndISODateTime] = useState(EndDateTime.toISOString());

    //! DEFAULT DAY JS DATE TIME FOR TODAY
    const [DayJsStartsOn, useDayJsStartsOn] = useState(dayjs(TodayISODateTime));
    const [DayJSEndsOn, useDayJsEndsOn] = useState(dayjs(EndISODateTime));

    //! UPDATED DAY JS DATE TIME FOR TODAY
    const [StartsOnISODateTime, useStartsOnISODateTime] = useState(String(DayJsStartsOn.format('YYYY-MM-DD HH:mm:ss')));
    const [EndsOnISODateTime, useEndsOnISODateTime] = useState(String(DayJSEndsOn.format('YYYY-MM-DD HH:mm:ss')));

    //! UPDATE FRAPPE DOC
    const { createDoc, loading, error, isCompleted } = useFrappeCreateDoc();

    //! UPDATE EVENT STATUS
    const UpdateStatus = () => {
        if (EventSubject) {
            useCreateBox(true);
            console.log({
                status: "Open",
                subject: EventSubject,
                starts_on: StartsOnISODateTime,
                ends_on: EndsOnISODateTime,
            })
            //! UPDATE FRAPPE DOC
            createDoc('Event',
                {
                    status: "Open",
                    subject: EventSubject,
                    starts_on: StartsOnISODateTime,
                    ends_on: EndsOnISODateTime,
                }
            ).then((doc) => {
                //! SUCCESS 
                console.log("Event Created", doc)
                setTimeout(() => {
                    useCreateBox(false);
                    useEventSubject('')
                    useDayJsStartsOn(dayjs(TodayISODateTime));
                    useDayJsEndsOn(dayjs(EndISODateTime));
                    useStartsOnISODateTime(DayJsStartsOn);
                    useEndsOnISODateTime(DayJSEndsOn);
                }, 250);
            }).catch((error) => {
                //! ERROR
                console.error(error);
            });
        }
    }

    //! UPDATE EVENT SUBJECT
    const UpdateSubject = (Subject) => {
        console.log("Subject Updated!", Subject)
        useEventSubject(Subject);
    }

    //! UPDATE EVENT STARTS ON
    const UpdateStartsOn = (StartsOn) => {
        const NewStartsOn = String(StartsOn.format('YYYY-MM-DD HH:mm:ss'));
        console.log("Starts On Updated!", NewStartsOn)
        useStartsOnISODateTime(NewStartsOn);
        useDayJsStartsOn(dayjs(NewStartsOn));
    }

    //! UPDATE EVENT ENDS ON
    const UpdateEndsOn = (EndsOn) => {
        const NewEndsOn = String(EndsOn.format('YYYY-MM-DD HH:mm:ss'));
        console.log("Ends On Updated!", NewEndsOn)
        useEndsOnISODateTime(NewEndsOn);
        useDayJsEndsOn(dayjs(NewEndsOn));
    }

    return (
        <section className="create-todo my-8">
            {/* TODO HEADING */}
            <div className="todo-list-data-heading text-2xl mb-2">
                Create ToDo
            </div>
            <div className="todo-head grid grid-cols-12 text-sm bg-slate-100 p-2">
                <div className="status col-span-1">
                    Create
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

            <div className='todo-1 grid grid-cols-12 items-center bg-white p-2 border-b border-gray-300' >
                {/* STATUS */}
                <div className="status col-span-1">
                    <Checkbox
                        aria-label='Create Todo'
                        label="Create Todo"
                        icon={<CheckBoxOutlineBlankIcon />}
                        checkedIcon={<CheckIcon />}
                        onClick={() => { UpdateStatus() }}
                        checked={CreateBox}
                    // required={true}
                    />
                </div>
                {/* END STATUS */}

                {/* SUBJECT */}
                <div className="title col-span-5">
                    <TextField
                        id="standard-basic"
                        label="Add a Todo..."
                        variant="standard"
                        className='w-[90%]'
                        value={EventSubject}
                        onChange={(e) => { UpdateSubject(e.target.value) }}
                    />
                </div>
                {/* END SUBJECT */}

                {/* STARTS ON */}
                <div className="start-date-time col-span-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            // label="Start Date Time"
                            ampm={false}
                            value={DayJsStartsOn}
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
                            // label="End Date Time"
                            ampm={false}
                            value={DayJSEndsOn}
                            className='w-[80%] border-0'
                            onChange={(EndsOn) => UpdateEndsOn(EndsOn)}
                        />
                    </LocalizationProvider>
                </div>
                {/* END ENDS ON */}
            </div>

        </section>
    )
}

export default CreateTodo
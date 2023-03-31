import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CardsForm from "./component/cards/CardsForm";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function App() {
    const [list, setList] = useState([
        {
            "firstName": "test1",
            "lastName": "test1",
            "format": "3D",
            "sessions": [
                {
                    "time": "11:00",
                    "msTime": 39600000,
                    "price": "120"
                },
                {
                    "time": "16:00",
                    "msTime": 57600000,
                    "price": "180"
                }
            ]
        },
        {
            "firstName": "test2",
            "lastName": "test2",
            "format": "2D",
            "sessions": [
                {
                    "time": "21:00",
                    "msTime": 75600000,
                    "price": "200"
                },
                {
                    "time": "15:00",
                    "msTime": 54000000,
                    "price": "220"
                }
            ]
        }
    ]);

    const [listItem, setListItem] = useState({});

    const handleListItem = (newValue) => {
        setListItem({ ...listItem, [newValue.target.name]: newValue.target.value });
    };

    const [listItemEditting, setListItemEditting] = useState(-1);

    const schema = yup.object().shape({
        firstName: yup.string().required('First name is a required field'),
        lastName: yup.string().required('Last name is a required field'),
        format: yup.string().required('Select format!'),
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmitAdd = (data) => {
        if (!sessions.length) {
            console.log(sessions);
            handleSessionShow();
            return false;
        }

        const secList = list.slice();
        const secListItem = data;
        secListItem.sessions = sessions;
        secList.push(secListItem);

        setList(secList.sort((a, b) => a.sessions[0].msTime - b.sessions[0].msTime));
        reset();
        setListItem({});
        setSessions([]);
    };


    const onEdit = (index) => {
        setEditSessionIndex(null);
        setListItemEditting(index);

        setListItem(list[index]);
        for (const key in list[index]) {
            setValue(key, list[index][key]);
        }

        setSessions(list[index]?.sessions || '');
    };

    const onSubmitEdit = (data) => {
        const secList = list.slice();
        const secListItem = data;

        secListItem.sessions = sessions;
        secList.splice(listItemEditting, 1, secListItem);
        setList(secList.sort((a, b) => a.sessions[0].msTime - b.sessions[0].msTime));

        setListItem({});
        setSessions([]);
        reset();
        setListItemEditting(-1);
    };

    //----------------------
    const schemaSession = yup.object().shape({
        time: yup.string().required('First name is a required field'),
        price: yup.string().matches(/^(^[0-9]*)$/, `You have to enter numbers`).required('Price is a required field'),
    });
    const {
        register: registerSession,
        handleSubmit: handleSubmitSession,
        formState: { errors: errorsSession },
        reset: resetSession,
        setFocus: setFocusSession,
        setError: setErrorSession,
        getValues: getValuesSession,
    } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaSession),
    });
    const [sessions, setSessions] = useState([]);
    const [sessionItem, setSessionItem] = useState({});
    const [sesseionShow, setSessionShow] = useState(false);
    const [sessionEditting, setSessionEditting] = useState(-1);
    const [viewClock, setViewClock] = useState('hours');

    const handleSessionShow = () => {
        setSessionShow(!sesseionShow);
    };

    const checkSessionItemErrors = () => {
        const data = getValuesSession();
        if (!sessionItem.time) {
            console.log(sessionItem);
            setErrorSession('time', {message: 'Time'});
            setFocusSession('time');
            return true;
        }
        for (const key in data) {
            console.log(data[key]);
            if (data[key] === '') {
                setFocusSession(key);
                setErrorSession(key, {message: 'Price'});
                return true;
            }
        }
        return false;
    };

    const handleAddSessionItemTime = (newValue) => {
        if (viewClock === 'hours') {
            setViewClock('minutes');
        }
        const ms = (((newValue.$H * 60) + newValue.$m) * 60) * 1000;
        setSessionItem({ ...sessionItem, time: `${newValue.$H.toString().padStart(2, '0')}:${newValue.$m.toString().padStart(2, '0')}`, msTime: ms });
    };
    const handleAddSessionItem = (newValue) => {
        setSessionItem({ ...sessionItem, [newValue.target.name]: newValue.target.value });
    };

    const handleAddSessionCancel = () => {
        setSessionShow(false);
        setSessionItem({})
        setViewClock('hours');
    };

    const handleAddSessionEditting = (index) => {
        setSessionItem(sessions[index]);
        setSessionEditting(index);
        setSessionShow(true);
    };

    const onEditSession = () => {
        const secSessions = sessions.slice();
        secSessions.splice(sessionEditting, 1, sessionItem);
        setSessionShow(false);
        setSessions(secSessions.sort((a, b) => a.msTime - b.msTime));
        setSessionEditting(-1);
        setSessionItem([]);
    };

    const handleAddSessionDelete = (index) => {
        const secSessions = sessions.slice();
        secSessions.splice(index, 1);
        setSessions(secSessions);
        if (sessionEditting === index) {
            setSessionShow(false);
            setSessions(secSessions);
            setSessionEditting(-1);
            setSessionItem([]);
        }
    };

    const onAddSession = () => {
        if (checkSessionItemErrors()) {
            return false;
        }
        console.log(sessionItem);
        const secSessions = sessions;
        secSessions.push(sessionItem);
        setSessions(secSessions.sort((a, b) => a.msTime - b.msTime));
        resetSession();
        setSessionItem({});
        setViewClock('hours');
    };

    //---------------------

    const [editInlineSessionIndex, setEditInlineSessionIndex] = useState(-1);
    const [editInlineSessionData, setEditInlineSessionData] = useState({});

    const handleEditInlineSession = (index, data) => {
        if (editSessionIndex >= 0) {
            resetSession();
        }

        setEditInlineSessionIndex(index);
        setEditInlineSessionData(data);
    };
    const handleInlineSessionItem = (e) => {
        setEditInlineSessionData({ ...editInlineSessionData, [e.target.name]: e.target.value });
    };

    const onSubmitEditInlineSession = () => {
        const secSessions = sessions.slice();

        secSessions.splice(editInlineSessionIndex, 1, editInlineSessionData);

        setSessions(secSessions);
        setEditInlineSessionIndex(null);
    };

    const handleInlineItemDeleteSession = (childIndex) => {
        const secSessions = sessions.slice();
        secSessions.splice(childIndex, 1);

        if (editInlineSessionIndex >= 0) {
            resetSession();
            setEditInlineSessionIndex(-1);
        }

        setSessions(secSessions);
    };

    //--------------------
    const [editSessionIndex, setEditSessionIndex] = useState({});
    const [editSessionData, setEditSessionData] = useState({});

    const handleEditSession = (index, data, parIndex) => {
        if (editSessionIndex) {
            resetSession();
        }

        setEditSessionData(data);
        setEditSessionIndex({ parrent: parIndex, child: index });
    };

    const handleSessionItem = (e) => {
        setEditSessionData({ ...editSessionData, [e.target.name]: e.target.value });
    };

    const onSubmitEditSession = () => {
        const secList = list.slice();

        secList[editSessionIndex.parrent].sessions.splice(editSessionIndex.child, 1, editSessionData);

        setList(secList);
        setEditSessionIndex({});
    };

    const handleItemDeleteSession = (parIndex, childIndex) => {
        const secList = list.slice();
        secList[parIndex].sessions.splice(childIndex, 1);
        if (editSessionIndex) {
            resetSession();
            setEditSessionIndex({});
        }

        setList(secList);
    };

    return (
        <div className="App" style={{ display: 'flex' }}>
            <div style={{ width: '50%', margin: '10px 15px' }}>

                {listItemEditting >= 0 ? (
                    <CardsForm
                        isEdit={listItemEditting >= 0}
                        register={register}
                        errors={errors}
                        listItem={listItem}
                        sessions={sessions}
                        sessionEditting={sessionEditting}
                        sesseionShow={sesseionShow}
                        viewClock={viewClock}
                        setViewClock={setViewClock}
                        sessionItem={sessionItem}
                        registerSession={registerSession}
                        errorsSession={errorsSession}
                        handleAddSessionItemTime={handleAddSessionItemTime}
                        handleAddSessionItem={handleAddSessionItem}
                        handleAddSessionCancel={handleAddSessionCancel}
                        onEditSession={onEditSession}
                        onAddSession={onAddSession}
                        handleSessionShow={handleSessionShow}
                        handleListItem={handleListItem}
                        handleAddSessionDelete={handleAddSessionDelete}
                        handleAddSessionEditting={handleAddSessionEditting}
                        onSubmit={handleSubmit(onSubmitEdit)}
                    />
                ) : (
                    <CardsForm
                        register={register}
                        errors={errors}
                        listItem={listItem}
                        sessions={sessions}
                        sessionEditting={sessionEditting}
                        sesseionShow={sesseionShow}
                        viewClock={viewClock}
                        setViewClock={setViewClock}
                        sessionItem={sessionItem}
                        registerSession={registerSession}
                        errorsSession={errorsSession}
                        handleAddSessionItemTime={handleAddSessionItemTime}
                        handleAddSessionItem={handleAddSessionItem}
                        handleAddSessionCancel={handleAddSessionCancel}
                        onEditSession={onEditSession}
                        onAddSession={onAddSession}
                        handleSessionShow={handleSessionShow}
                        handleListItem={handleListItem}
                        handleAddSessionDelete={handleAddSessionDelete}
                        handleAddSessionEditting={handleAddSessionEditting}
                        onSubmit={handleSubmit(onSubmitAdd)}
                    />
                )}

            </div>

            <div style={{ width: '50%', margin: '10px 15px' }}>
                {list.map((item, i) => (
                    <div key={i} style={{ marginTop: 20, background: '#e8e8e8' }}>
                        <span>{item?.order} - {item.firstName} - {item.lastName}</span>
                        <span>--{item.format}--</span>
                        {(item.sessions) ? (
                            <div>
                                {item?.sessions.map((jitem, j) => (
                                    <div key={j}>
                                        {(j === editSessionIndex?.child && i === editSessionIndex?.parrent) ? (
                                            <form onSubmit={handleSubmitSession(onSubmitEditSession)}>
                                                <input {...registerSession('time')} type="text" onChange={handleSessionItem} value={editSessionData.time} />
                                                <input {...registerSession('price')} type="text" onChange={handleSessionItem} value={editSessionData.price} />
                                                <button type="submit">Edit sessions (form)</button>
                                                <button type="button" onClick={() => handleItemDeleteSession(i, j)}>delete</button>
                                            </form>
                                        ) : (
                                            <>
                                                <span>{jitem.time}</span> |
                                                | <span>{jitem.price}</span>
                                                <button type="button" onClick={() => handleEditSession(j, jitem, i)}>
                                                    to active edit
                                                </button>
                                                <button type="button" onClick={() => handleItemDeleteSession(i, j)}>delete</button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (<></>)}

                        <button onClick={() => onEdit(i)}>Edit item</button>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default App;

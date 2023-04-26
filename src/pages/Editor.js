import React, { useEffect, useRef, useState } from "react";
import CardsForm from "../component/cards/CardsForm";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as htmlToImage from 'html-to-image';
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import EdittingDates from "../component/Editor/EdittingDates";
import CardsOut from "../component/CardsOut/CardsOut";
import './index.scss';

const Editor = () => {
    const Navigate = useNavigate();
    const Params = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const [lists, setLists] = useState([]);
    const [listItemDates, setListItemDates] = useState({
        dateStart: null,
        dateEnd: null,
    });
    //safe progress state
    const [safeSuccess, setSafeSuccess] = useState(false);
    const [safeLoading, setSafeLoading] = useState(false);


    //change listItemDates from DataPicker
    const handleItemDate = (newValue, keyName) => {
        setListItemDates({ ...listItemDates, [keyName]: newValue });
    };

    //add new listItem
    //edit current listItem
    const handleListItemEdit = (index) => {
        if (!list) {
            alert('No data safe!');
            return false;
        } else if (!listItemDates.dateStart) {
            alert('Enter date start!');
            return false;
        } else if (!listItemDates.dateEnd) {
            alert('Enter date end!');
            return false;
        }

        setSafeLoading(true);

        const jsonLists = localStorage.getItem('lists');
        const secLists = JSON.parse(jsonLists) || [];

        const { dateStart, dateEnd } = listItemDates;
        const listItem = {
            id: index || secLists.length,
            dateStart: dayjs(dateStart).format('YYYY-MM-DD'),
            dateEnd: dayjs(dateEnd).format('YYYY-MM-DD'),
            list: list, //временно до переименования на cards
        };

        if (index) {
            secLists.splice(index, 1, listItem);
        } else {
            secLists.push(listItem);
        }

        setTimeout(() => {
            setLists(secLists);
            localStorage.setItem('lists', JSON.stringify(secLists));
            setSafeLoading(false);
            setSafeSuccess(true);
        }, 2000);
        setTimeout(() => {
            setSafeSuccess(false);
            if (!index) {
                Navigate(`/editting/${listItem.id}`);
            }
        }, 3000);
    };

    const handleMovieDuration = (newValue) => {
        const hours = newValue.$H || 0;
        const minutes = newValue.$m || 0;
        const timeText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setMovieCard({ ...movieCard, duration: timeText });
        setValue('duration', timeText);
    };

    const handleMovieChacked = (e) => {
        setMovieCard({ ...movieCard, [e.target.id]: e.target.checked });
        setValue(e.target.id, e.target.checked);
    };

    useEffect(() => {
        if (Params.id) {
            const jsonLists = localStorage.getItem('lists');
            const storeLists = JSON.parse(jsonLists) || [];
            const storeListItem = storeLists[Params.id];

            setLists(storeLists);
            setListItemDates({ dateStart: dayjs(storeListItem.dateStart), dateEnd: dayjs(storeListItem.dateEnd) });
            setList(storeListItem.list);
        }
        setIsLoading(true);
    }, [Params]);
















    const [list, setList] = useState([]);

    const [movieCard, setMovieCard] = useState({});

    const handleListItem = (newValue, e, fieldName) => {
        if (e) {
            setMovieCard({ ...movieCard, [e.target.id.split('-')[0]]: newValue });
            setValue(e.target.id.split('-')[0], newValue);
        } else if (fieldName) {
            setMovieCard({ ...movieCard, [fieldName]: newValue });
            setValue(fieldName, newValue);
        } else {
            setMovieCard({ ...movieCard, [newValue.target.name]: newValue.target.value });
        }
    };

    const [listItemEditting, setListItemEditting] = useState(-1);

    const schema = yup.object().shape({
        movieImageUrl: yup.string().required('Please past the movie\'s image url'),
        movieName: yup.string().required('Movie name is a required field'),
        movieRate: yup.string().required('Select rate!'),
        movieFormat: yup.string().required('Select format!'),
        duration: yup.string().required('Enter duration!'),
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue, setFocus, setError } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmitAdd = (data, e) => {
        if (!sessions.length) {
            handleSessionShow();
            return false;
        }

        const secList = list.slice();
        const secListItem = data;
        secListItem.sessions = sessions;
        secList.push(secListItem);

        setList(secList.sort((a, b) => a.sessions[0].msTime - b.sessions[0].msTime));
        reset();
        setMovieCard({});
        setSessions([]);
    };


    const onEdit = (index) => {
        setListItemEditting(index);

        setMovieCard(list[index]);
        for (const key in list[index]) {
            setValue(key, list[index][key]);
        }

        setSessions(list[index]?.sessions || '');
    };

    const onSubmitEdit = (data) => {
        if (!sessions.length) {
            handleSessionShow();
            return false;
        }

        const secList = list.slice();
        const secListItem = data;
        secListItem.sessions = sessions;

        secList.splice(listItemEditting, 1, secListItem);

        setList(secList.sort((a, b) => a.sessions[0].msTime - b.sessions[0].msTime));
        reset();
        setMovieCard({});
        setSessions([]);
        setListItemEditting(-1);
    };

    const onRemove = (index) => {
        const secList = list.slice();

        secList.splice(index, 1);

        setList(secList.sort((a, b) => a.sessions[0].msTime - b.sessions[0].msTime));
        reset();
        setMovieCard({});
        setSessions([]);
        setListItemEditting(-1);
    };

    if (localStorage.getItem('list')) {
        const jsonList = localStorage.getItem('list');
        const obj = JSON.parse(jsonList);
        console.log(obj);
    }

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
            setErrorSession('time', { message: 'Time' });
            setFocusSession('time');
            return true;
        }
        for (const key in data) {
            console.log(data[key]);
            if (data[key] === '') {
                setFocusSession(key);
                setErrorSession(key, { message: 'Price' });
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

    //image
    const aImage = useRef();
    const downloadImage = async () => {
        await htmlToImage.toJpeg(aImage.current, { cacheBust: true, pixelRatio: 2 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'a-edit.jpeg';
                link.href = dataUrl;
                link.click();
            });
    };

    //movie data from kinopoisk
    const [isLoadData, setIsLoadData] = useState(false);

    const getFromKinoDev = () => {
        if (!movieCard.kinopoiskUrl) {
            setError('kinopoiskUrl', { message: 'Please, enter the URL' });
            setFocus('kinopoiskUrl');
            return false;
        } else if (!movieCard.kinopoiskUrl.match(/kinopoisk/)) {
            setError('kinopoiskUrl', { message: 'Invalid URL!' });
            setFocus('kinopoiskUrl');
            return false;
        }
        setIsLoadData(true);

        const id = movieCard.kinopoiskUrl.match(/[\d]+/)[0];
        fetch(`https://api.kinopoisk.dev/v1/movie/${id}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'XFP5H8X-Y48446X-NXCTEV2-XATNMW1',
                'Content-Type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                const { poster, name, ageRating, movieLength, genres } = data;

                const durTime = new Date(0);
                durTime.setMinutes(movieLength);
                const duration = `${durTime.getUTCHours().toString().padStart(2, '0')}:${durTime.getUTCMinutes().toString().padStart(2, '0')}`;

                const movieRate = `${ageRating}+`;

                const movieGenres = [];
                genres.forEach(el => movieGenres.push(el.name));

                setMovieCard({
                    ...movieCard,
                    movieImageUrl: poster.url,
                    movieName: name,
                    movieRate: movieRate,
                    movieGenres: movieGenres,
                    duration: duration,
                });
                setValue('movieImageUrl', poster.url);
                setValue('movieName', name);
                setValue('movieRate', movieRate);
                setValue('movieGenres', movieGenres);
                setValue('duration', duration);

                setIsLoadData(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoadData(false);
            });
    };

    return (
        <>
            <div style={{ margin: '10px 15px' }}>
                {isLoading && (
                    <EdittingDates
                        Params={Params}
                        dates={listItemDates}
                        safeSuccess={safeSuccess}
                        safeLoading={safeLoading}
                        isSafeNew={!!list.length}
                        handleItemDate={handleItemDate}
                        handleListItemEdit={handleListItemEdit}
                    />
                )}
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '40%' }}>

                    {listItemEditting >= 0 ? (
                        <CardsForm
                            isEdit={listItemEditting >= 0}
                            register={register}
                            errors={errors}
                            getFromKinoDev={getFromKinoDev}
                            isLoadData={isLoadData}
                            movieCard={movieCard}
                            sessions={sessions}
                            sessionEditting={sessionEditting}
                            sesseionShow={sesseionShow}
                            viewClock={viewClock}
                            setViewClock={setViewClock}
                            sessionItem={sessionItem}
                            registerSession={registerSession}
                            errorsSession={errorsSession}
                            handleMovieDuration={handleMovieDuration}
                            handleMovieChacked={handleMovieChacked}
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
                            getFromKinoDev={getFromKinoDev}
                            isLoadData={isLoadData}
                            movieCard={movieCard}
                            sessions={sessions}
                            sessionEditting={sessionEditting}
                            sesseionShow={sesseionShow}
                            viewClock={viewClock}
                            setViewClock={setViewClock}
                            sessionItem={sessionItem}
                            registerSession={registerSession}
                            errorsSession={errorsSession}
                            handleMovieDuration={handleMovieDuration}
                            handleMovieChacked={handleMovieChacked}
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

                <div style={{ width: '60%', overflow: 'scroll' }}>
                    <button onClick={downloadImage}>Download image</button>
                    <div className="cards-wrap">
                        <CardsOut
                            aImageRef={aImage}
                            listItemDates={listItemDates}
                            cards={list}
                            onEdit={onEdit}
                            onRemove={onRemove}
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Editor;
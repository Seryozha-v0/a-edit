import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const Navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [sortLists, setSortLists] = useState([]);

    useEffect(() => {
        const jsonLists = localStorage.getItem('lists');
        const storeLists = JSON.parse(jsonLists) || [];

        setLists(storeLists);
    }, []);

    useEffect(() => {
        if (lists.length) {
            const secLists = lists;
            secLists.sort((a, b) => {
                const dateA = new Date(a.dateStart);
                const dateB = new Date(b.dateStart);
                return dateA - dateB;
            });
            setSortLists(secLists);
        }
    }, [lists]);

    return (
        <div style={{ margin: '10px 15px' }}>
            <Stack spacing={3} direction='row'>
                {sortLists.length && sortLists.map((item, i) => (
                    <Stack spacing={1} direction='column' key={i}>
                        <div>{dayjs(item.dateStart).format('DD.MM.YYYY')} - {dayjs(item.dateEnd).format('DD.MM.YYYY')}</div>
                        <Button onClick={() => Navigate(`/editting/${item.id}`)}>Open</Button>
                    </Stack>
                ))}
                <Button onClick={() => Navigate(`/editor`)}>Create new</Button>
            </Stack>
        </div>
    )
};

export default Home;
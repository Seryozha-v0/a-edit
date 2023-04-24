import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React from "react";
import './cardItem.scss';

const CardItemsOut = ({
    cards,
    onEdit,
    onRemove,
}) => {
    return (
        <>
            {cards.map((item, i) => (
                <div key={i} className="cardItem">
                    <div className="cardItem__movie">
                        <div className="cardItem__poster">
                            <img src={item.movieImageUrl} alt="a-edit" />
                        </div>
                        <div className="cardItem__descr">
                            <div className="cardItem__details">
                                <div>
                                    <div className="cardItem__rate">{item.movieRate}</div>
                                    <div className="cardItem__format">{item.movieFormat}</div>
                                    <div className="cardItem__duration">{item.duration}</div>
                                    {item.pushkin && (
                                        <div className="cardItem__pushkin">
                                            <img src="/assets/icons/pushkin2.png" />
                                        </div>
                                    )}
                                </div>
                                <div className="cardItem__genres">
                                    {!!item.movieGenres && item.movieGenres.slice(0, 2).map((genresItem, genresKey) => (
                                        <span key={genresKey}>
                                            {genresItem}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <h3 className="cardItem__name">{item.movieName.substring(0, 100)}</h3>
                        </div>

                        <div className="cardItem__controls">
                            <Stack spacing={1} direction="row" justifyContent={"space-around"}>
                                <IconButton
                                    edge='end'
                                    aria-label="edit"
                                    title="edit"
                                    className="cardItem__iconBtn cardItem__edit"
                                    onClick={() => onEdit(i)}
                                >
                                    <Edit fontSize="small" className="cardItem__icons" />
                                </IconButton>
                                <IconButton
                                    edge='end'
                                    aria-label="delete"
                                    title="delete"
                                    className="cardItem__iconBtn cardItem__remove"
                                    onClick={() => onRemove(i)}
                                >
                                    <Delete fontSize="small" className="cardItem__icons" />
                                </IconButton>
                            </Stack>
                        </div>
                    </div>
                    <div className="cardItem__sessions">
                        {!!item.sessions && item.sessions.map((sessionItem, sessionKey) => (
                            <div className="sessionItem" key={sessionKey}>
                                <div className="sessionItem__time">{sessionItem.time}</div>
                                <div className="sessionItem__price">
                                    <div className="sessionItem__priceIcon">
                                        <img src="/assets/icons/price.png" />
                                    </div>
                                    <span>
                                        {sessionItem.price} ₽
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
}

export default CardItemsOut;
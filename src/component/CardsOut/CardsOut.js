import React from "react";
import CardItemsOut from "./CardItemsOut";
import './cards.scss'

const CardsOut = ({
    aImageRef,
    cards,
    listItemDates,
    onEdit,
    onRemove,
}) => {
    const { dateStart, dateEnd } = listItemDates;

    const getMonth = (numb) => {
        switch (numb) {
            case 0:
                return 'Январь';
            case 1:
                return 'Февраль';
            case 2:
                return 'Март';
            case 3:
                return 'Апрель';
            case 4:
                return 'Май';
            case 5:
                return 'Июнь';
            case 6:
                return 'Июль';
            case 7:
                return 'Август';
            case 8:
                return 'Сентябрь';
            case 9:
                return 'Октябрь';
            case 10:
                return 'Ноябрь';
            case 11:
                return 'Декабрь';

            default:
                return '';
        }
    };

    return (
        <div ref={aImageRef} className="cards">
            <div className="cards__header">
                <div className="cards__logo">
                    <div>Кинотеатр</div>
                    <div>МИР</div>
                </div>
                <div className="cards__dates">
                    {(dateStart?.$y && dateEnd?.$y) ? (
                        <>
                            <div className="cards__days">
                                {dateStart.$D === dateEnd.$D ? dateStart.$D.toString().padStart(2, '0') : `${dateStart.$D.toString().padStart(2, '0')}-${dateEnd.$D.toString().padStart(2, '0')}`}
                            </div>
                            <div className="cards__months">
                                {dateStart.$M === dateEnd.$M ? getMonth(dateStart.$M) : `${getMonth(dateStart.$M).substring(0, 3)}-${getMonth(dateEnd.$M).substring(0, 3)}`}
                            </div>
                            <div className={`cards__years${dateStart.$y != dateEnd.$y ? ' cards__years_up' : ''}`}>
                                {dateStart.$y === dateEnd.$y ? dateStart.$y : (
                                    <>
                                        <div>{dateStart.$y}</div>
                                        <div>{dateEnd.$y}</div>
                                    </>
                                )}
                            </div>
                        </>
                    ) : ''}
                </div>
            </div>
            <CardItemsOut
                cards={cards}
                onEdit={onEdit}
                onRemove={onRemove}
            />
        </div>
    )
};

export default CardsOut;
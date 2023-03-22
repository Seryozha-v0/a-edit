import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
    const [list, setList] = useState([
        {firstName: 'cbfdfgdfgs', lastName: 'gfdfv', format: '2d'},
        {firstName: '92384drwe', lastName: 'SDFs32', format: '3d'},
        {firstName: 'gvbdfgbbfdhyh5653et', lastName: 'sdfgvsdrcvr', format: '3d'}
    ]);
    const [isEdit, setIsEdit] = useState({
        enable: false,
        elementID: '',
    });

    const { register, handleSubmit, errors, reset } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => {
        setList([...list, data]);
        reset();
    };

    const onSubmitEdit = (data) => {
        const secList = list.slice();
        secList.splice(isEdit.elementID, 1, data);

        setList(secList);
        setIsEdit({ ...isEdit, enable: false });
    }

    const onEdit = (i) => {
        setIsEdit({
            enable: true,
            elementID: i,
        });
    }

    return (
        <div className="App">

            {isEdit.enable ? (
                <form onSubmit={handleSubmit(onSubmitEdit)}>
                    <input {...register('firstName')} type="text" name="firstName" />
                    <input {...register('lastName')} type="text" name="lastName" />
                    <select {...register("format")}>
                        <option value="2d">2D</option>
                        <option value="3d">3D</option>
                    </select>
                    <button type="submit">Edit</button>
                </form>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('firstName')} type="text" name="firstName" />
                    <input {...register('lastName')} type="text" name="lastName" />
                    <select {...register("format")}>
                        <option value="2d">2D</option>
                        <option value="3d">3D</option>
                    </select>
                    <button type="submit">Add</button>
                </form>
            )}

            {list.map((item, i) => (
                <div key={i}>
                    <span>{item.firstName} - {item.lastName}</span>
                    <span>--{item.format}--</span>
                    <button onClick={() => onEdit(i)}>Edit</button>
                </div>
            ))}
        </div>
    );
}

export default App;

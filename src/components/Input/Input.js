import React from 'react'
import classes from './Input.scss'


const Input = props => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                name="title"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
};

export default Input;
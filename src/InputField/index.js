import React from 'react';
import './style.css';


const InputField = ({inputType, placeholder, value, onChangeFunc, errorMessage}) => {
    
    return (
        <div className={errorMessage ? 'inputField error' : 'inputField'}>
            <input type={inputType}
                   placeholder={placeholder} 
                   value={value}
                   onChange={onChangeFunc}/>
                   {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
        </div>
    );
}

export default InputField;

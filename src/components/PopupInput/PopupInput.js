import './PopupInput.css';
import { useEffect } from 'react';

function PopupInput(props) {
  const name = props.name.split(' ')[1];
  const handleChange = (evt) => {
    props.handleChange(evt.target.value);
    props.validateChange(evt);
  }
  const errors = props.errors;
  return (
    <>
      <h3 className='popup__subtitle'>{name}</h3>
      <input
        minLength={name === 'Password' ? 8 : 0}
        id={props.name}
        type={name}
        className='form__edit-form'
        name={props.name}
        placeholder={`Enter ${name}`}
        required
        onChange={handleChange}
        value={props.value}
      />
      {errors[name] === undefined ? (
        ''
      ) : errors[name] === '' ? (
        ''
      ) : (
        <p className='form__errors'>{errors[name]}</p>
      )}
    </>
  );
}

export default PopupInput;

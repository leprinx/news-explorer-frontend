import './Popup.css';
import button from '../../images/button_type_close/close.svg';
import { useEffect } from "react";

function Popup(props) {
  useEffect(() => {
    if (!props.isLogPopupOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        props.closePopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [props.isLogPopupOpen, props.closePopups])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      props.closePopups();
    }
  }
  const onSubmit = (evt) => {
    props.onSubmit();
    props.resetForm();
    evt.preventDefault();
  };
  const name = props.name.split(' ')[1];
  return (
    <section className='popup-section'>
      <div
        onClick={handleOverlay}
        className={`popup popup_type_sign-${name} ${
          props.isLogPopupOpen ? 'popup_open' : ''
        }`}
      >
        <div className='popup__box'>
          <h2 className='popup__title'>{props.name}</h2>
          <form
            onSubmit={onSubmit}
            className={`form form_type_sign-${name}`}
            name={props.name}
          >
            {props.children}
            {props.submitError !== undefined ? (
              <p className='form__submit-error'>{props.submitError}</p>
            ) : (
              ''
            )}
            <button
              className={`form__save-button ${
                props.isValid
                  ? 'form__save-button_active'
                  : 'form__save-button_disabled'
              }`}
              type='submit'
              disabled={!props.isValid}
            >
              {props.name}
            </button>
          </form>
          <button className='form__close-button' type='reset'>
            <img
              src={button}
              alt='close icon'
              className='button button_type_close'
              onClick={props.closePopups}
            />
          </button>
          <p className='popup__change'>
            Or
            <button
              type='button'
              className='popup__change-button'
              onClick={props.changePopup}
            >
              {props.changeName}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Popup;

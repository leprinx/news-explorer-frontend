import button from '../../images/button_type_close/close.svg';

function SuccesPopup(props) {
  return(
    <section className='popup-section'>
    <div
      className={`popup popup_type_succes ${
        props.isOpen ? 'popup_open' : ''
      }`}
    >
      <div className='popup__box'>
        <h2 className='popup__title'>Registration succesfully completed</h2>
        <button className='reset-button form__close-button' type='reset'>
          <img
            src={button}
            alt='close icon'
            className='button button_type_close'
            onClick={props.closePopups}
          />
        </button>
        <p className='popup__change'>
          <button type='button' className='popup__change-button' onClick={props.changePopup}>
              Sign In
          </button>
        </p>
      </div>
      </div>
      </section>
  )
}

export default SuccesPopup;

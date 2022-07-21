import Popup from '../Popup/Popup';
import PopupInput from '../PopupInput/PopupInput';
import { useCallback, useState, useEffect } from 'react';

function Signup(props) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const handleChange = (evt) => {
    const target = evt.target;
    const targetName = target.name.split(' ')[1];
    const value = target.value;
    setValues({ ...values, [targetName]: value });
    setErrors({ ...errors, [targetName]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  useEffect(() => {
    resetForm();
  }, [props.isRegisterPopupOpen]);
  return (
    <>
        <Popup
          name={'Sign up'}
          isLogPopupOpen={props.isLogPopupOpen}
          isRegisterPopupOpen={props.isRegisterPopupOpen}
          closePopups={props.closePopups}
          changePopup={props.changePopup}
          changeName={'Sign in'}
          email={props.email}
          password={props.password}
          onSubmit={props.onSubmit}
          resetForm={resetForm}
          isValid={isValid}
          submitError={props.submitError}
        >
          <PopupInput
            value={props.email}
            handleChange={props.setEmail}
            validateChange={handleChange}
            name='Sign-up Email'
            errors={errors}
            resetForm={resetForm}
          />
          <PopupInput
            value={props.password}
            handleChange={props.setPassword}
            validateChange={handleChange}
            name='Sign-up Password'
            errors={errors}
            resetForm={resetForm}
          />
          <PopupInput
            value={props.username}
            handleChange={props.setUsername}
            validateChange={handleChange}
            name='Sign-up Username'
            errors={errors}
            resetForm={resetForm}
          />
        </Popup>
    </>
  );
}

export default Signup;

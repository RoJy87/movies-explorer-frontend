import ClosePopupOnEscape from '../../utils/ClosePopupOnEscape';
import confirm__img from '../../images/confirm__img.png';
import reject__img from '../../images/reject__img.png';

function InfoTooltip(props) {
  return (
    <div
      className={`popup ${props.isOpen && 'popup_opened'}`}
      onMouseDown={(evt) => evt.target.classList.contains('popup') && props.onClose()}>
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className="popup__close-btn button"
          type="button"
          onClick={props.onClose}></button>
        {props.isSuccessful && (
          <div className="confirm">
            <img src={confirm__img} alt="Регистрация успешна" className="confirm__image" />
            <p className="confirm__message">{props.message}</p>
          </div>
        )}
        {!props.isSuccessful && (
          <div className="confirm">
            <img src={reject__img} alt="Ошибка регистрации" className="confirm__image" />
            <p className="confirm__message">{props.message}</p>
          </div>
        )}
      </div>
      {props.isOpen && <ClosePopupOnEscape action={props.onClose} />}
    </div>
  );
}

export default InfoTooltip;

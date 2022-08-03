import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_class_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button type="button" className={`popup__close popup__close_class_${props.name}`} aria-label="Закрыть" onClick={props.onClose}></button>
                <div className="popup__content">
                    <h2 className={`popup__heading popup__heading_class_${props.name}`}>{props.heading}</h2>
                    <form className={`popup__input-container popup__input-container_class_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
                        {props.children}
                        <button type="submit" aria-label="Сохранить" className={`popup__save popup__save_class_${props.name}`}>{props.saveButton}</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default PopupWithForm;
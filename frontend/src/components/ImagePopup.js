import React from "react";

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_class_image ${card && 'popup_opened'}`}>
            <div className="popup__container popup__container_class_image">
                <img src={card && card.link} alt={card && card.name} className="popup__image" />
                <p className="popup__subtitel">{card && card.name}</p>
                <button type="button" className="popup__close popup__close_class_image" aria-label="Закрыть" onClick={onClose}></button>
            </div>
        </div>
    )

}

export default ImagePopup;
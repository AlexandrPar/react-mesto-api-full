import React from "react";


function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container popup__container_status">
                <button type="button" className={`popup__close`} aria-label="Закрыть" onClick={props.onClose}></button>
                <img src={props.data.url} className="popup__status-img" alt="Статус"/>
                <h3 className="popup__status-title">{props.data.title}</h3>
            </div>
        </div>
    )
}

export default InfoTooltip;
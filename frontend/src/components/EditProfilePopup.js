import {useEffect, useContext, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    function handleChangeName(evt) {
        setName(evt.target.value)
    };

    function handleChangeAbout(evt) {
        setAbout(evt.target.value)
    };

    function handleSubmit(evt) {
        evt.preventDefault()

        onUpdateUser({
            name,
            about,
        });
    };

    useEffect(() => {
        if (isOpen) {
            setName(currentUser.name)
            setAbout(currentUser.about)
        }
    }, [currentUser, isOpen]);


    return (
        <PopupWithForm
            name='profile'
            heading="Редактировать профиль"
            saveButton="Сохранить"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}>
            <input
                type="text"
                className="popup__item popup__item_el_name"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                id="name-input"
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="name-input-error popup__input-error"></span>
            <input
                type="text"
                className="popup__item popup__item_el_profession"
                name="about"
                placeholder="О себе"
                required
                minLength="2"
                maxLength="200"
                id="profession-input"
                value={about || ''}
                onChange={handleChangeAbout}
            />
            <span className="profession-input-error popup__input-error"></span>
        </PopupWithForm>
    )

}
export default EditProfilePopup;
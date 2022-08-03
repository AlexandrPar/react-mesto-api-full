import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [nameCard, setNameCard] = useState('')
    const [linkCard, setLinkCard] = useState('')

    function handleChangeCardName(evt) {
        setNameCard(evt.target.value);
    }

    function handleChangeCardLink(evt) {
        setLinkCard(evt.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: nameCard,
            link: linkCard,
        });
    }

    useEffect(() => {
        setNameCard('');
        setLinkCard('');
    }, [isOpen]
    );

    return (
        <PopupWithForm
            name='card'
            heading="Новое место"
            saveButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__item popup__item_el_title"
                name="name"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                id="title-input"
                onChange={handleChangeCardName}
                value={nameCard}
            />
            <span className="title-input-error popup__input-error"></span>
            <input
                type="url"
                className="popup__item popup__item_el_link"
                name="link"
                placeholder="Ссылка на картинку"
                id="link-input"
                onChange={handleChangeCardLink}
                value={linkCard}
            />
            <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
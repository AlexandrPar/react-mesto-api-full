import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({ avatar: avatarRef.current.value });
    }

    useEffect(() => {
        avatarRef.current.value = ''
    }, [isOpen]
    );

    return (
        <PopupWithForm
            name='avatar'
            heading="Обновить аватар"
            saveButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="popup__item popup__item_el_link"
                name="avatar"
                placeholder="Ссылка на картинку"
                id="link-input-avatar"
                ref={avatarRef}
                required
            />
            <span className="link-input-avatar-error popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
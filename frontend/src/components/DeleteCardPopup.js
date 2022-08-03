import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, card }) {
    
    function handleSubmit(evt) {
        evt.preventDefault()
        onDeleteCard(card)
      }

    return (
        <PopupWithForm
                    name='delete'
                    heading="Вы уверены?"
                    saveButton="Да"
                    isOpen={isOpen}
                    onClose={onClose}
                    onSubmit={handleSubmit}>
        </PopupWithForm>
    );
}

export default DeleteCardPopup;
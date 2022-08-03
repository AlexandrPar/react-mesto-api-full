import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Card({ card, link, name, likes, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext)

    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClass = (`card__like ${isLiked && 'card__like_active'}`);

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <div className="card">
            {isOwn && <button className="card__delete" type="button" onClick={handleDeleteClick}></button>}
            <img src={link} alt={name} className="card__image" onClick={handleClick} />
            <div className="card__caption">
                <h2 className="card__name">{name}</h2>
                <div className="card__like-box">
                    <button type="button" aria-label="Лайк" className={cardLikeButtonClass} onClick={handleLikeClick}></button>
                    <span className="card__like-amount">{likes}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
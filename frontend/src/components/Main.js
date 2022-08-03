import {useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = useContext(CurrentUserContext);


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-block">
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                    <button className="profile__avatar-replace" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__profession">{currentUser.about}</p>
                    <button type="button" aria-label="Редактор профиля" className="profile__edit-button" onClick={onEditProfile}></button>
                </div>
                <button type="button" aria-label="Добавить картинку" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="gallery">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        link={card.link}
                        name={card.name}
                        likes={card.likes.length}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                )
                )}
            </section>
        </main>
    );
}

export default Main;
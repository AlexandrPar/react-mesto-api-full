import { useEffect, useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js'
import { Switch, Redirect, Route, useHistory } from "react-router-dom";
import success from "../images/okImg.svg";
import fail from "../images/failsImg.svg";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setiIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [removedCardId, setRemovedCardId] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState({ url: "", title: "" });
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [email, setEmail] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getProfileInfo(), api.getMassivCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(`Ошибка получения данных: ${err}`);
                });
        }
    }, [loggedIn]);

    function handleRegister({ email, password }) {
        return auth
            .signup(email, password)
            .then((res) => {
                if (res) {
                    handleInfoTooltip();
                    history.push("/login");
                    setTooltipStatus({
                        url: success,
                        title: "Вы успешно зарегистрировались!",
                    });
                }
            })
            .catch((err) => {
                console.log(`Ошибка регистрации: ${err}`);
                handleInfoTooltip();
                setTooltipStatus({
                    url: fail,
                    title: "Что-то пошло не так! Попробуйте ещё раз.",
                });
            });
    };

    function handleLogin(email, password) {
        auth
            .signin(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    tokenCheck(localStorage.getItem("token"));
                }
            })
            .catch((err) => {
                setIsInfoTooltipOpen(true);
                setTooltipStatus({
                    url: fail,
                    title: "Что-то пошло не так! Попробуйте ещё раз.",
                });
                console.log(`Ошибка авторизации: ${err}`);
            });
    };

    function tokenCheck() {
        const token = localStorage.getItem("token");
        if (token) {
            auth
                .tokenCheck(token)
                .then((res) => {
                    if (res) {
                        setCurrentUser(res)
                        setEmail(res.email);
                        setLoggedIn(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const signOut = () => {
        setLoggedIn(false);
        setEmail('');
        setCurrentUser('');
        localStorage.removeItem('jwt');
        history.push("/login");
    };

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            history.push("/main");
        }
    }, [loggedIn, history]);

    function handleCardDeleteClick(card) {
        setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
        setRemovedCardId(card);
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter(c => c._id !== card._id))
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Ошибка удаления карточки: ${err}`)
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((user) => user === currentUser._id);
        const request = isLiked ? api.deleteCardLike(card._id) : api.getCardLike(card._id);
        request
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(`Ошибка лайка: ${err}`);
            });
    }

    function handleUpdateUser(item) {
        api.renameProfileInfo(item)
            .then((user) => {
                setCurrentUser(user);
                console.log(item)
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка обновления данных: ${err}`);
            });
    }

    function handleUpdateAvatar(avatar) {
        api.replaceProfileAvatar(avatar)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка аватара: ${err}`);
            });
    }

    function handleAddPlaceSubmit(item) {
        api.addNewCard(item)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка отправки данных карточки: ${err}`);
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    function handleAddPlaceClick() {
        setiIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function handleInfoTooltip() {
        setIsInfoTooltipOpen(!isInfoTooltipOpen)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setiIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setIsInfoTooltipOpen(false)
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                        <Header
                            onClick={signOut}
                            nameLink="Выйти"
                            email={email}
                            toLink="/login"
                        />

                        <Main
                            onCardClick={handleCardClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDeleteClick}
                        />
                    </ProtectedRoute>
                    <Route path="/login">
                        <Header toLink="/register" nameLink="Регистрация" />
                        <div className="loginContainer">
                            <Login handleLogin={handleLogin} />
                        </div>
                    </Route>
                    <Route path="/register">
                        <Header toLink="login" nameLink="Войти" />
                        <div className="registerContainer">
                            <Register handleRegister={handleRegister} />
                        </div>
                    </Route>
                    <Route path="/">
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
                    </Route>
                </Switch>

                <Route>{loggedIn && <Footer />}</Route>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <DeleteCardPopup
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onDeleteCard={handleCardDelete}
                    card={removedCardId}
                />
                <ImagePopup
                    onClose={closeAllPopups}
                    card={selectedCard}
                />
                <InfoTooltip
                    onClose={closeAllPopups}
                    data={tooltipStatus}
                    isOpen={isInfoTooltipOpen}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

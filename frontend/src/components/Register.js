import React, { useState } from "react";
import { Link } from "react-router-dom";
 
const Register = ({ handleRegister }) => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    function handleChange(evt){
        const { name, value } = evt.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    function handleSubmit(evt){
        evt.preventDefault();
        const { email, password } = form;
        handleRegister({ email, password });
    };
    return (
        <div className="welcome-page">
            <h2 className="welcome-page__header">Регистрация</h2>
            <form className="welcome-page__form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="welcome-page__item welcome-page__item_el_email"
                    name="email"
                    placeholder="Email"
                    required
                    minLength="2"
                    maxLength="40"
                    id="email-input"
                    value={form.email}
                    onChange={handleChange}
                />
                <span className="email-input-error welcome-page__input-error"></span>
                <input
                    type="password"
                    className="welcome-page__item welcome-page__item_el_password"
                    name="password"
                    placeholder="Пароль"
                    required
                    minLength="2"
                    maxLength="200"
                    id="password-input"
                    value={form.password}
                    onChange={handleChange}
                />
                <span className="profession-input-error welcome-page__input-error"></span>
                <button type="submit" aria-label="Зарегистрироваться" className="welcome-page__submit">Зарегистрироваться</button>
            </form>
            <p className="welcome-page__bottom">Уже зарегистрированы? <Link className="welcome-page__button" to="login">Войти</Link></p>
        </div>
    );
}
export default Register;
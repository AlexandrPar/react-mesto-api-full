import React, { useState } from "react";
 
const Login = ({ handleLogin }) => {
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

        handleLogin({
            email: form.email,
            password: form.password,
        });
    };


    return (
        <div className="welcome-page">
            <h2 className="welcome-page__header">Вход</h2>
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
                    id="password-input"
                    value={form.password}
                    onChange={handleChange}
                />
                <span className="profession-input-error welcome-page__input-error"></span>
                <button type="submit" aria-label="Войти" className="welcome-page__submit">Войти</button>
            </form>
        </div>
    );
}
export default Login;
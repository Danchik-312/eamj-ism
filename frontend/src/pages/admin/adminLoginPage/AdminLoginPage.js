import React from "react";
import styles from "./AdminLoginPage.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const AdminLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "password123") {

            localStorage.setItem("isAdmin", "true");

            navigate("/admin/main"); // Переход в админку
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit} className={styles.login__content}>
                <h2 className={styles.login__content__title}>Admin Login</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.login__content__input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.login__content__input}
                    required
                />

                <button
                    type="submit"
                    className={styles.login__content__button}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}

export default AdminLoginPage;
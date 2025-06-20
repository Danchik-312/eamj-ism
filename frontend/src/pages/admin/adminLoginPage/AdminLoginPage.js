import React from "react";
import styles from "./AdminLoginPage.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const AdminLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:3001/admin/login", { email, password });
            const { token } = res.data;
            localStorage.setItem("adminToken", token);
            navigate("/admin/main"); // переход в админку после успешного логина
        } catch (err) {
            setError("Неверный email или пароль");
        }
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                       required/>
                <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}
                       required/>
                <button type="submit">Войти</button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form>
        </div>
    )
}

export default AdminLoginPage;
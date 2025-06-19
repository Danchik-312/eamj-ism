import React from 'react';
import styles from './Header.module.css';
import {NavLink, Link} from "react-dom";
import classes from 'classes';

const Header = () => {
    return (
        <header className={classes(styles.header)}>
            <div className={classes(styles.header__container, '_container')}>
                <div className={classes(styles.header__logo)}></div>
                <nav className={classes(styles.header__menu)}>
                    <ul className={classes(styles.menu__list)}>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Home</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Current</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Archives</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Indexing</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Editorial Team</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Publication Ethics</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Announcements</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Contact</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/" className="menu__link">Submissions</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
import React from 'react'
import styles from './Header.module.scss'
import { navLinks } from './Links'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className={styles['nav']}>
        <div className={styles['nav-wrapper']}>
            <div className={styles['nav-logo__wrapper']}>
                <Link to='/' className={styles['nav-logo']}>
                    <svg width="48" height="48" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="89.6572" width="76.6806" height="167.518" fill="#111111"/>
                        <path d="M0.000488281 256H98.8438L255.996 98.8481V0.00488281L0.000488281 256Z" fill="#111111"/>
                        <path d="M255.995 256H157.152L6.55651e-06 98.8481V0.00488281L255.995 256Z" fill="#111111"/>
                    </svg>
                </Link>
            </div>
            <ul className={styles['nav-list']}>
                {navLinks.map((item, idx) => (
                    <li className={styles['nav-item']} key={`menu item ${idx}`}>
                        <Link to={item.link} className={styles['nav-link']}>
                            <span>{item.title}</span>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
                <li className={styles['nav-item']} key={`menu item admin-link`}>
                    <Link to="/dashboard" className={styles['nav-link']}>
                        <span>Dashboard</span>
                        <span>Dashboard</span>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Header
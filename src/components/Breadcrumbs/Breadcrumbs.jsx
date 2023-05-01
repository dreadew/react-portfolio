import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = () => {
    const location = useLocation();
    let currentLink = '';
    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`;
            return (
                <div className={styles['crumb']} key={crumb}>
                    <Link className={styles['crumb-link']} to={currentLink}>{crumb.toLowerCase().replace('%20', " ")}</Link>
                </div>
            )
        })
  return (
    <div className={styles['breadcrumbs-wrapper']}>
        {crumbs}
    </div>
  )
}

export default Breadcrumbs;
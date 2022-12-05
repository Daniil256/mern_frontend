import SyncIcon2 from '@mui/icons-material/Sync';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import React, { useState } from 'react';
import styles from './SyncIcon.module.scss';

export const SyncIcon = ({status}) => {
    const [error, setError] = useState(status || 'Loading')
    setTimeout(() => {
        setError('Error')
    }, 5000)
    return (
        <div className={styles.SyncIcon}>
            <ul className={styles.list}>
                <li>send again</li>
                <li>delete</li>
            </ul>
            {
                error==='Error'
                ?
                <SyncProblemIcon />
                :
                <SyncIcon2 />
            }
        </div>
    )
}
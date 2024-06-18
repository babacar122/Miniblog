import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlockedAccounts.css';

const BlockedAccounts = () => {
    const [blockedAccounts, setBlockedAccounts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/users/me')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, []);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:4000/users/blocked-accounts`)
                .then(response => {
                    setBlockedAccounts(response.data);
                    document.querySelector('.blocked-container').classList.add('fade-in');
                })
                .catch(error => {
                    console.error('Error fetching blocked accounts:', error);
                });
        }
    }, [user]);

    return (
        <div className="blocked-container">
            <h2>Blocked Accounts</h2>
            <ul className="blocked-list">
                {blockedAccounts.map(account => (
                    <li key={account._id} className="blocked-item">
                        {account.blockedId.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlockedAccounts;


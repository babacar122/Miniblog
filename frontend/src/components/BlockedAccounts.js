import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlockedAccounts.css';

const BlockedAccounts = () => {
    const { id } = useParams();
    const [blockedAccounts, setBlockedAccounts] = useState([]);

    useEffect(() => {
        axios.get(`/blocked/${id}`, )
            .then(response => {
                setBlockedAccounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching blocked accounts:', error);
            });
    }, [id]);

    return (
        <div className="blocked-container fade-in">
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


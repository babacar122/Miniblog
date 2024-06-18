import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

axios.defaults.withCredentials = true;

const Profile = () => {
    const [profile, setProfile] = useState(null);
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
            console.log(user)
            axios.get(`http://localhost:4000/users/profile/${user.user_id}`)
                .then(response => {
                    setProfile(response.data);
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled:', error.message);
                    } else {
                        console.error('Error fetching profile details:', error);
                        if (error.response) {
                            console.error('Error status:', error.response.status);
                            console.error('Error data:', error.response.data);
                            console.error('Error headers:', error.response.headers);
                        } else if (error.request) {
                            console.error('No response received:', error.request);
                        } else {
                            console.error('Error message:', error.message);
                        }
                    }
                });
        }
    }, [user]);

    return (
        <div className="profile-container">
            {profile ? (
                <div className="profile-info">
                    <h2>{profile.username}'s Profile</h2>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>First Name:</strong> {profile.firstName || 'N/A'}</p>
                    <p><strong>Last Name:</strong> {profile.lastName || 'N/A'}</p>
                    <p><strong>Birth Date:</strong> {profile.birthDate || 'N/A'}</p>
                    <p><strong>Birth Place:</strong> {profile.birthPlace || 'N/A'}</p>
                    <p><strong>Account Created:</strong> {new Date(profile.accountCreationDate).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;


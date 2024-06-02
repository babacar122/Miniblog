import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get(`/profile/${id}`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, [id]);

    return (
        <div className="profile-container fade-in">
            {profile ? (
                <div className="profile-info">
                    <h2>{profile.username}'s Profile</h2>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>First Name:</strong> {profile.firstName || 'N/A'}</p>
                    <p><strong>Last Name:</strong> {profile.lastName || 'N/A'}</p>
                    <p><strong>Birth Date:</strong> {profile.birthDate || 'N/A'}</p>
                    <p><strong>Birth Place:</strong> {profile.birthPlace || 'N/A'}</p>
                    <p><strong>Account Created:</strong> {new Date(profile.accountCreationDate).toLocaleDateString()}</p>
                    <p><strong>Posts Count:</strong> {profile.postCount}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;


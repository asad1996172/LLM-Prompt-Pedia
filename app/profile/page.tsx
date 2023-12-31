"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import LoadingSpinner from '@components/LoadingSpinner';

import React from 'react'

const MyProfile = () => {
    const router = useRouter();

    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        // Check if the user is not authenticated.
        if (!session) {
            router.push('/');
            return;
        }
        const fetchPosts = async () => {
            const userId = (session?.user as any)?.id;
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();

            setMyPosts(data);
        }

        const userId = (session?.user as any)?.id;
        if (userId) fetchPosts();
    }, [session?.user])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
        if (hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE',
                });

                const filteredPosts = myPosts.filter((myPost) => myPost._id !== post._id);
                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    if (!session) {
        return <LoadingSpinner />;
    }
    
    return (
        <Profile
            name="My"
            desc="Welcome to you personalized profile page"
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
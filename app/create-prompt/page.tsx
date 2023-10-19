"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';
import LoadingSpinner from '@components/LoadingSpinner';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        'title': '',
        'prompt': '',
        'tag': '',
    });

    useEffect(() => {
        // Check if the user is not authenticated.
        if (!session) {
            router.push('/');
            return;
        }
    }, [])

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: (session?.user as any)?.id,
                    tag: post.tag,
                    title: post.title,
                })
            })
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    if (!session) {
        return <LoadingSpinner />;
    }

    return (
        <Form 
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt
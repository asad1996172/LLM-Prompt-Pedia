"use client";

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@components/LoadingSpinner';

import Form from '@components/Form';

const EditPrompt = () => {
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const { data: session } = useSession();

    const router = useRouter();
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
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            
            setPost({
                title: data.title,
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt
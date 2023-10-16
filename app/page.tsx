import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='head_text text-center'>
                Explore
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'>Prompts for LLMs</span>
            </h1>
            <p className='desc text-center'>
                A platform to share working prompts for different LLMs like ChatGPT, LLAMA to help each other navigate the LLM experience.
            </p>

            <Feed />
        </section>
    )
}

export default Home
import '@styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
    title: 'LLMs Prompt Pedia',
    description: 'Discover and Share AI Prompts',
    keywords: 'prompt, llm, chat-gpt',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='en'>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout
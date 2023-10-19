import '@styles/globals.css'
import { ReactNode } from 'react'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'LLMs Prompt Pedia',
    description: 'Discover and Share AI Prompts',
    keywords: 'prompt, llm, chat-gpt',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='en'>
            <body>
                <Provider session={undefined as any}>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
import axios from 'axios'
import { showConsoleLibraryError } from './general.util.js'
import botTexts from '../helpers/bot.texts.helper.js'

export async function questionAI(text: string): Promise<string> {
    try {
        const prompt = encodeURIComponent(
            `Você é o KBot, um assistente simpático e direto. Responda em português do Brasil de forma clara e útil. Pergunta: ${text}`
        )
        const { data } = await axios.get(`https://text.pollinations.ai/${prompt}`, {
            responseType: 'text',
            timeout: 30000,
            headers: { 'Accept': 'text/plain' }
        })
        return data as string
    } catch(err) {
        showConsoleLibraryError(err, 'questionAI')
        throw new Error(botTexts.library_error)
    }
}

export async function imageAI(text: string): Promise<string> {
    try {
        const prompt = encodeURIComponent(text)
        const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&nologo=true`
        await axios.head(imageUrl, { timeout: 30000 })
        return imageUrl
    } catch(err) {
        showConsoleLibraryError(err, 'imageAI')
        throw new Error(botTexts.library_error)
    }
}

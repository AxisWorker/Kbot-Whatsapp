import {formatSeconds, showConsoleLibraryError} from './general.util.js'
import {instagramGetUrl} from 'instagram-url-direct'
import { getFbVideoInfo } from 'fb-downloader-scrapper'
import Tiktok from '@tobyg74/tiktok-api-dl'
import axios from 'axios'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { FacebookMedia, InstagramMedia, TiktokMedia, XMedia, YTInfo } from '../interfaces/library.interface.js'
import botTexts from '../helpers/bot.texts.helper.js'

const execAsync = promisify(exec)

export async function xMedia (url: string){
    try {
        const newURL = url.replace(/twitter\.com|x\.com/g, 'api.vxtwitter.com')
        const {data : xResponse} = await axios.get(newURL)
        if (!xResponse.media_extended) return null
        const xMedia : XMedia = {
            text: xResponse.text,
            media : xResponse.media_extended.map((media : {type: string, url: string}) => ({
                type: (media.type === 'video') ? 'video' : 'image',
                url: media.url
            }))
        }
        return xMedia
    } catch(err) {
        showConsoleLibraryError(err, 'xMedia')
        throw new Error(botTexts.library_error)
    }
}

export async function tiktokMedia (url : string){
    try {
        const tiktokResponse = await Tiktok.Downloader(url, { version: "v1" })
        let mediaUrl: string | string[]
        if (tiktokResponse.status === 'error') return null
        if (tiktokResponse.result?.type == 'video'){
            if (tiktokResponse.result?.video?.playAddr?.length) {
                mediaUrl = tiktokResponse.result?.video?.playAddr[0]
            } else return null
        } else if(tiktokResponse.result?.type == 'image'){
            if (tiktokResponse.result?.images) {
                mediaUrl = tiktokResponse.result?.images
            } else return null
        } else return null
        const tiktokMedia : TiktokMedia = {
            author_profile: tiktokResponse.result?.author?.nickname,
            description : tiktokResponse.result?.desc,
            type: tiktokResponse.result?.type,
            duration: tiktokResponse.result?.type == "video" ? parseInt(((tiktokResponse.result?.video?.duration as number)/1000).toFixed(0)) : null,
            url: mediaUrl
        }
        return tiktokMedia
    } catch(err) {
        showConsoleLibraryError(err, 'tiktokMedia')
        throw new Error(botTexts.library_error)
    }
}

export async function facebookMedia(url : string) {
    try {
        const facebookResponse = await getFbVideoInfo(url)
        const facebookMedia : FacebookMedia = {
            url: facebookResponse.url,
            duration: parseInt((facebookResponse.duration_ms/1000).toFixed(0)),
            sd: facebookResponse.sd,
            hd: facebookResponse.hd,
            title: facebookResponse.title,
            thumbnail: facebookResponse.thumbnail
        }
        return facebookMedia
    } catch(err) {
        showConsoleLibraryError(err, 'facebookMedia')
        throw new Error(botTexts.library_error)
    }
}

export async function instagramMedia (url: string){
    try {
        const instagramResponse = await instagramGetUrl(url)
        let instagramMedia : InstagramMedia = {
            author_username : instagramResponse.post_info.owner_username,
            author_fullname: instagramResponse.post_info.owner_fullname,
            caption: instagramResponse.post_info.caption,
            likes: instagramResponse.post_info.likes,
            media : []
        }
        for (const url of instagramResponse.url_list) {
            const {headers} = await axios.head(url)
            const type = headers['content-type'] === 'video/mp4' ? 'video' : 'image'
            instagramMedia.media.push({type, url})
        }
        return instagramMedia
    } catch(err) {
        showConsoleLibraryError(err, 'instagramMedia')
        throw new Error(botTexts.library_error)
    }
}

export async function youtubeMedia (text : string){
    try {
        let videoUrl = text
        if (!text.match(/youtube\.com\/watch|youtu\.be\//)) {
            const { stdout: searchResult } = await execAsync(
                `yt-dlp "ytsearch1:${text.replace(/"/g, '')}" --print webpage_url --no-playlist --quiet 2>/dev/null`
            )
            videoUrl = searchResult.trim()
            if (!videoUrl) return null
        }
        const { stdout: infoRaw } = await execAsync(
            `yt-dlp --dump-single-json --no-playlist --quiet "${videoUrl}" 2>/dev/null`
        )
        const info = JSON.parse(infoRaw)
        const { stdout: streamUrl } = await execAsync(
            `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" --get-url --no-playlist --quiet "${videoUrl}" 2>/dev/null`
        )
        const ytInfo : YTInfo = {
            id_video : info.id,
            title:     info.title,
            description: info.description || '',
            duration:  info.duration ?? 0,
            channel:   info.uploader ?? info.channel ?? '',
            is_live:   info.is_live ?? false,
            duration_formatted: formatSeconds(info.duration ?? 0),
            url: streamUrl.split('\n')[0].trim()
        }
        return ytInfo
    } catch(err) {
        showConsoleLibraryError(err, 'youtubeMedia')
        throw new Error(botTexts.library_error)
    }
}

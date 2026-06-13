// import { Plyr, usePlyr } from 'plyr-react';
import {Plyr} from 'plyr-react';
// import 'plyr-react/dist/plyr.css';
import "plyr-react/plyr.css"
// import { useRef } from 'react';

import type {PlyrProps} from 'plyr-react';
import React from "react";
import axios from "axios";

// https://github.com/chintan9/plyr-react
// Taken from KCNet-Vite

type Props = {
    // The url for the video.
    videoUrl: string,
    // The optional video poster.
    poster?: string
    // The controls for plyr.
    plyrControls: string[],
    // This defaults to the defaultVolume specified below if not set.
    volume?: number
};

// Set the default volume to this here.
// TODO Setup localStorage value for this, and read from that if it exists.
const defaultVolume: number = 0.2;

/**
 * Get the video mime type from the url
 * @param url The url to get the video mime type from.
 * @returns The mime type of the video.
 */
function mimeTypeFromUrl(url: string) {
    if (!url) return;
    const ext = url.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
    switch (ext) {
        case 'mp4':
            return 'video/mp4';
        case 'webm':
            return 'video/webm';
        case 'ogg':
        case 'ogv':
            return 'video/ogg';
        default:
            return 'video/mp4';
    }
}

// Player source configuration
// This runs Plyr with a custom video url.
export function VideoPlayer({videoUrl, poster, plyrControls, volume}: Props) {

    const type = mimeTypeFromUrl(videoUrl);

    // Track video state
    const [status, setStatus] = React.useState<'loading' | 'valid' | 'error'>('loading');

    // TODO Make this store the video volume set in local storage.
    const [playerVolume, setPlayerVolume] = React.useState<number>(defaultVolume);
    // const [playerVolume, setPlayerVolume] = React.useState([]);

    // Check if the path exists on the url
    // Now this displays an error if the video doesn't exist.
    // Wrap the axios call in useEffect, so it only runs when the videoUrl changes.
    React.useEffect(() => {
        setStatus('loading');

        axios.get(
            videoUrl,
            {
                method: 'GET'
            }
        )
            .then(res => {
                setStatus('valid');
                // console.log("Video url was valid");
            })
            .catch(err => {
                setStatus('error');
                // console.log(err);
            });
    }, [videoUrl]);

    // Handle the loading state
    if (status === 'loading') {
        return (
            <div className="p-6 text-center text-gray-500">
                <p className="animate-pulse">Loading video...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-6 text-center text-red-500 font-semibold">
                <p>The video could not be played! Is the url correct?</p>
            </div>
        );
    }

    // Video volume handling
    // TODO Figure out how to fix this.
    // React.useEffect(() => {
    //     localStorage.setItem("video-volume", playerVolume);
    // }, [playerVolume]);

    const plyrProps: PlyrProps = {
        source: {
            type: "video",
            sources: [
                {
                    src: videoUrl,
                    type: type,
                    // TODO Make this get the size from the video file, such as 720p, 1080p or other formats.
                    size: 720,
                },
            ],
            poster:
            poster,
        },
        options: {
            // Set the volume, fall back to default if not set in the function.
            // volume: volume ?? defaultVolume,
            // TODO Make this work, it should store the user preference for the volume.
            volume: playerVolume,

            // This works! I moved the plyrControls out of this function and now it can be modified per player.
            controls: plyrControls
        },
    }

    return <Plyr {...plyrProps} />

}

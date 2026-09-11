// import { Plyr, usePlyr } from 'plyr-react';
import { Plyr } from 'plyr-react';
// import 'plyr-react/dist/plyr.css';
import "plyr-react/plyr.css"
// import { useRef } from 'react';

import type { PlyrProps } from 'plyr-react';
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
export function VideoPlayer({ videoUrl, poster, plyrControls, volume }: Props) {

    const type = mimeTypeFromUrl(videoUrl);

    // Track video state

    // TODO Make this store the video volume set in local storage.
    const [playerVolume, setPlayerVolume] = React.useState<number>(defaultVolume);
    // const [playerVolume, setPlayerVolume] = React.useState([]);

    const plyrProps: PlyrProps = {
        source: {
            type: "video",
            sources: [
                {
                    src: videoUrl,
                    type,
                    size: 720,
                },
            ],
            poster,
        },

        options: {
            volume: playerVolume,
            controls: plyrControls,
        },

        // The player renders immediately. This only runs if playback fails.
        onError: () => {
            console.error("The video could not be played:", videoUrl);
        },
    };

    return <Plyr key={videoUrl} {...plyrProps} />;

}

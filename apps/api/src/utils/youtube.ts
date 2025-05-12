import ytpl from 'ytpl';

export const isPlaylist = (url: string) => {
    return url.includes('playlist') || url.includes('list=') || url.includes('p=') || url.includes('playlists');
};

export const extractLinksFromPlaylist = async (url: string) => {
    const playlist = await ytpl(url, { pages: Infinity });
    const videoLinks = playlist.items.map(item => item.url.split('&list')[0]);

    return videoLinks;
};

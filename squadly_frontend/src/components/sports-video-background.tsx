import {useVideoPlayer, VideoView} from 'expo-video';
import {StyleSheet} from 'react-native';

const sportsClip = require('../../assets/videos/squadly-soccer.mp4');

export function SportsVideoBackground() {
    const player = useVideoPlayer(sportsClip, (videoPlayer) => {
        videoPlayer.loop = true;
        videoPlayer.muted = true;
        videoPlayer.play();
    });

    return (
        <VideoView
            player={player}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            nativeControls={false}
            allowsFullscreen={false}
            allowsPictureInPicture={false}
            pointerEvents="none"
        />
    );
}

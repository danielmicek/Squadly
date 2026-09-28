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
            style={styles.video}
            contentFit="cover"
            nativeControls={false}
            allowsFullscreen={false}
            allowsPictureInPicture={false}
        />
    );
}

const styles = StyleSheet.create({
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
});

import {AuthControls} from '@/components/auth-controls';
import {SportsVideoBackground} from '@/components/sports-video-background';
import {LinearGradient} from 'expo-linear-gradient';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen() {
    const {width, height} = useWindowDimensions();
    const isWide = width >= 820;
    const isShort = height < 760;

    return (
        <View style={styles.container}>
            <SportsVideoBackground />

            <LinearGradient
                colors={[
                    'rgba(2, 7, 5, 0.48)',
                    'rgba(2, 7, 5, 0.76)',
                    'rgba(2, 7, 5, 0.96)',
                ]}
                locations={[0, 0.48, 1]}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
            />
            <View style={styles.orangeGlow} pointerEvents="none" />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topBar}>
                    <View style={styles.brand}>
                        <View style={styles.brandMark}>
                            <Text style={styles.brandMarkText}>S</Text>
                        </View>
                        <Text style={styles.brandName}>SQUADLY</Text>
                    </View>

                    <View style={styles.livePill}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>READY TO PLAY</Text>
                    </View>
                </View>

                <View style={[styles.content, isWide && styles.contentWide]}>
                    <View style={[styles.hero, isWide && styles.heroWide]}>
                        <View style={styles.eyebrowRow}>
                            <View style={styles.eyebrowLine} />
                            <Text style={styles.eyebrow}>YOUR GAME. YOUR PEOPLE.</Text>
                        </View>

                        <Text
                            style={[
                                styles.headline,
                                isWide && styles.headlineWide,
                                isShort && styles.headlineShort,
                            ]}
                        >
                            Find your{`\n`}next game.
                        </Text>
                        <Text style={styles.subheadline}>
                            Meet players nearby, build your squad and turn free time into game time.
                        </Text>

                        <View style={styles.sportTags}>
                            <View style={styles.sportTag}>
                                <Text style={styles.sportTagText}>FOOTBALL</Text>
                            </View>
                            <View style={styles.sportTag}>
                                <Text style={styles.sportTagText}>BASKETBALL</Text>
                            </View>
                            <View style={styles.sportTag}>
                                <Text style={styles.sportTagText}>MORE</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.authArea, isWide && styles.authAreaWide]}>
                        <AuthControls />
                    </View>
                </View>

                <Text style={styles.footer}>PLAY · CONNECT · COMPETE</Text>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020705',
        overflow: 'hidden',
    },
    safeArea: {
        flex: 1,
        width: '100%',
        maxWidth: 1240,
        alignSelf: 'center',
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 96,
    },
    orangeGlow: {
        position: 'absolute',
        width: 360,
        height: 360,
        borderRadius: 180,
        backgroundColor: 'rgba(255, 112, 0, 0.15)',
        right: -180,
        top: '18%',
        transform: [{scaleX: 1.35}],
    },
    topBar: {
        minHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    brandMark: {
        width: 34,
        height: 34,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff7500',
        transform: [{rotate: '-6deg'}],
    },
    brandMarkText: {
        color: '#080a08',
        fontSize: 21,
        lineHeight: 23,
        fontWeight: '900',
        transform: [{rotate: '6deg'}],
    },
    brandName: {
        color: '#ffffff',
        fontSize: 19,
        fontWeight: '900',
        letterSpacing: 2.4,
    },
    livePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.18)',
        backgroundColor: 'rgba(5,10,7,0.42)',
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ff7500',
    },
    liveText: {
        color: 'rgba(255,255,255,0.78)',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.2,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        gap: 28,
        paddingVertical: 20,
    },
    contentWide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 64,
    },
    hero: {
        width: '100%',
        maxWidth: 620,
    },
    heroWide: {
        flex: 1,
    },
    eyebrowRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },
    eyebrowLine: {
        width: 28,
        height: 3,
        borderRadius: 2,
        backgroundColor: '#ff7500',
    },
    eyebrow: {
        color: '#ff9a42',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.8,
    },
    headline: {
        color: '#ffffff',
        fontSize: 50,
        lineHeight: 51,
        fontWeight: '900',
        letterSpacing: -2.2,
    },
    headlineWide: {
        fontSize: 72,
        lineHeight: 70,
        letterSpacing: -3.2,
    },
    headlineShort: {
        fontSize: 43,
        lineHeight: 44,
    },
    subheadline: {
        maxWidth: 520,
        marginTop: 16,
        color: 'rgba(255,255,255,0.70)',
        fontSize: 16,
        lineHeight: 24,
    },
    sportTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 20,
    },
    sportTag: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.18)',
        backgroundColor: 'rgba(0,0,0,0.20)',
    },
    sportTagText: {
        color: 'rgba(255,255,255,0.74)',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.1,
    },
    authArea: {
        width: '100%',
        alignItems: 'center',
    },
    authAreaWide: {
        width: 380,
        flexShrink: 0,
    },
    footer: {
        color: 'rgba(255,255,255,0.38)',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 2.4,
        textAlign: 'center',
    },
});

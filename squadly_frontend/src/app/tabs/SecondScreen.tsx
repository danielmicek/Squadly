import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text} from 'react-native';
import {BottomTabInset, MaxContentWidth, Spacing} from '@/constants/theme';

export default function SecondScreen() {
    debugger;
    return (
        <SafeAreaView style={styles.container}>
            <Text>SECOND SCREENx</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        alignItems: 'center',
        gap: Spacing.three,
        paddingBottom: BottomTabInset + Spacing.three,
        maxWidth: MaxContentWidth,
    },
    heroSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: Spacing.four,
        gap: Spacing.four,
    },
    title: {
        textAlign: 'center',
    },
    code: {
        textTransform: 'uppercase',
    },
    stepContainer: {
        gap: Spacing.three,
        alignSelf: 'stretch',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.four,
        borderRadius: Spacing.four,
    },
});
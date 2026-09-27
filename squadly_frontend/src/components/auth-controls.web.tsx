import {useAuth, useUser} from '@clerk/expo';
import {SignInButton, SignUpButton, UserButton} from '@clerk/expo/web';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';

export function AuthControls() {
    const {isLoaded, isSignedIn} = useAuth();
    const {user} = useUser();

    if (!isLoaded) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#ff7500" />
            </View>
        );
    }

    if (isSignedIn) {
        const identity = user?.primaryEmailAddress?.emailAddress ?? user?.fullName ?? 'Squadly player';

        return (
            <View style={styles.container}>
                <Text style={styles.eyebrow}>YOU&apos;RE IN</Text>
                <Text style={styles.title}>Game on.</Text>
                <Text style={styles.description}>{identity}</Text>
                <View style={styles.userButtonRow}>
                    <Text style={styles.userButtonLabel}>Manage your account</Text>
                    <UserButton />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eyebrow}>WELCOME TO THE TEAM</Text>
            <Text style={styles.title}>Ready when you are.</Text>
            <Text style={styles.description}>
                Sign in to find players, join games and build your squad.
            </Text>

            <SignInButton mode="modal">
                <Pressable
                    accessibilityRole="button"
                    style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}
                >
                    <Text style={styles.primaryButtonText}>Sign in</Text>
                    <Text style={styles.primaryButtonArrow}>→</Text>
                </Pressable>
            </SignInButton>

            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>NEW TO SQUADLY?</Text>
                <View style={styles.dividerLine} />
            </View>

            <SignUpButton mode="modal">
                <Pressable
                    accessibilityRole="button"
                    style={({pressed}) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                >
                    <Text style={styles.secondaryButtonText}>Create account</Text>
                </Pressable>
            </SignUpButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 380,
        padding: 24,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.16)',
        backgroundColor: 'rgba(5, 10, 7, 0.84)',
        boxShadow: '0 18px 60px rgba(0,0,0,0.42)',
    },
    loadingContainer: {
        minHeight: 220,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyebrow: {
        color: '#ff8a26',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.7,
        marginBottom: 8,
    },
    title: {
        color: '#ffffff',
        fontSize: 27,
        lineHeight: 32,
        fontWeight: '900',
        letterSpacing: -0.8,
    },
    description: {
        color: 'rgba(255,255,255,0.62)',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
        marginBottom: 20,
    },
    primaryButton: {
        width: '100%',
        minHeight: 52,
        paddingHorizontal: 18,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ff7500',
        cursor: 'pointer',
    },
    primaryButtonText: {
        color: '#090b09',
        fontSize: 15,
        fontWeight: '900',
    },
    primaryButtonArrow: {
        color: '#090b09',
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '700',
    },
    secondaryButton: {
        width: '100%',
        minHeight: 52,
        paddingHorizontal: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.22)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.06)',
        cursor: 'pointer',
    },
    secondaryButtonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '800',
    },
    buttonPressed: {
        opacity: 0.76,
        transform: [{scale: 0.985}],
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    dividerText: {
        color: 'rgba(255,255,255,0.40)',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.1,
    },
    userButtonRow: {
        minHeight: 52,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.18)',
        backgroundColor: 'rgba(255,255,255,0.06)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userButtonLabel: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
    },
});

import {useAuth, useClerk, useUser} from '@clerk/expo';
import {useHostedAuth} from '@clerk/expo/hosted-auth';
import {useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';

type AuthMode = 'sign-in' | 'sign-up';

export function AuthControls() {
    const {isLoaded, isSignedIn} = useAuth();
    const {signOut} = useClerk();
    const {user} = useUser();
    const {startHostedAuth} = useHostedAuth();
    const [pendingMode, setPendingMode] = useState<AuthMode | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const openAuth = async (mode: AuthMode) => {
        setPendingMode(mode);
        setErrorMessage(null);

        try {
            await startHostedAuth({mode});
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Authentication failed.');
        } finally {
            setPendingMode(null);
        }
    };

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
                <Pressable
                    accessibilityRole="button"
                    style={({pressed}) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                    onPress={() => signOut()}
                >
                    <Text style={styles.secondaryButtonText}>Sign out</Text>
                </Pressable>
            </View>
        );
    }

    const isPending = pendingMode !== null;

    return (
        <View style={styles.container}>
            <Text style={styles.eyebrow}>WELCOME TO THE TEAM</Text>
            <Text style={styles.title}>Ready when you are.</Text>
            <Text style={styles.description}>
                Sign in to find players, join games and build your squad.
            </Text>

            <Pressable
                accessibilityRole="button"
                disabled={isPending}
                style={({pressed}) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                    isPending && styles.buttonDisabled,
                ]}
                onPress={() => openAuth('sign-in')}
            >
                <Text style={styles.primaryButtonText}>
                    {pendingMode === 'sign-in' ? 'Opening…' : 'Sign in'}
                </Text>
                <Text style={styles.primaryButtonArrow}>→</Text>
            </Pressable>

            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>NEW TO SQUADLY?</Text>
                <View style={styles.dividerLine} />
            </View>

            <Pressable
                accessibilityRole="button"
                disabled={isPending}
                style={({pressed}) => [
                    styles.secondaryButton,
                    pressed && styles.buttonPressed,
                    isPending && styles.buttonDisabled,
                ]}
                onPress={() => openAuth('sign-up')}
            >
                <Text style={styles.secondaryButtonText}>
                    {pendingMode === 'sign-up' ? 'Opening…' : 'Create account'}
                </Text>
            </Pressable>

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
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
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 18},
        shadowOpacity: 0.34,
        shadowRadius: 30,
        elevation: 12,
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
        minHeight: 52,
        paddingHorizontal: 18,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ff7500',
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
        minHeight: 52,
        paddingHorizontal: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.22)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.06)',
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
    buttonDisabled: {
        opacity: 0.55,
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
    error: {
        color: '#ff8f8f',
        fontSize: 12,
        lineHeight: 17,
        textAlign: 'center',
        marginTop: 14,
    },
});

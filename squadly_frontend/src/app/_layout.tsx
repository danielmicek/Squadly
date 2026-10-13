import {ClerkProvider} from '@clerk/expo';
import {Stack} from 'expo-router';
import {StompProvider} from '@/providers/StompProvider'
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add your key to .env.\nRun: 1) clerk auth login  2) clerk link  3) clerk env pull — then restart the dev server.");
}

export default function Layout() {
    return (
    <StompProvider>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <GluestackUIProvider mode="dark">
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </GluestackUIProvider>
        </ClerkProvider>
    </StompProvider>
  );
}
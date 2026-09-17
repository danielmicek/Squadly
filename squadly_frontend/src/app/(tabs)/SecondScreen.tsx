import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {BottomTabInset, MaxContentWidth, Spacing} from '@/constants/theme';
import {styled} from "nativewind";
import {Button, ButtonText} from '@/components/ui/button';
import {GET_user} from "@/methods/fetchMethods";


const StyledSafeAreaView = styled(SafeAreaView, { className: "style" });

export default function SecondScreen() {
    return (
        <StyledSafeAreaView className="flex-1 justify-center flex-col items-center bg-black">
            <Text className="text-white">SECOND SCREEN</Text>

            <Button variant="default" size="default">
                <ButtonText onPress={async () => console.log(await GET_user(1))}>Button</ButtonText>
            </Button>
        </StyledSafeAreaView>
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

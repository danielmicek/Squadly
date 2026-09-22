import {StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {BottomTabInset, MaxContentWidth, Spacing} from '@/constants/theme';
import {styled} from "nativewind";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
} from '@/components/ui/form-control';
import {AlertCircleIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, Icon} from '@/components/ui/icon';
import {Input, InputField} from '@/components/ui/input';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
import {
    Calendar,
    CalendarBody,
    CalendarGrid,
    CalendarHeader,
    CalendarHeaderNextButton,
    CalendarHeaderPrevButton,
    CalendarHeaderTitle,
    CalendarWeekDaysHeader,
} from '@/components/ui/calendar';
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from '@/components/ui/select';
import {GET_allSports} from "@/methods/fetchMethods";

const StyledSafeAreaView = styled(SafeAreaView, { className: "style" });

export default function SecondScreen() {
    const [isInvalid, setIsInvalid] = useState(false);
    const [inputValue, setInputValue] = useState('12345');
    const [selected, setSelected] = useState(new Date());
    const [sports, setSports] = useState([]);

    useEffect(() => {
        const loadSports = async () => {
            const tmp = await GET_allSports();
            console.log(tmp);
            setSports(tmp);
        };

        loadSports();
    }, []);

    const handleSubmit = () => {
        if (inputValue.length < 3) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
    };

    return (
        <VStack className="bg-black h-screen justify-center">
            <FormControl
                isInvalid={isInvalid}
                isDisabled={false}
                isReadOnly={false}
                isRequired={false}
            >
                <FormControlLabel>
                    <FormControlLabelText>Event title</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="">
                    <InputField
                        type="text"
                        placeholder="password"
                        value={inputValue}
                        onChangeText={(text) => setInputValue(text)}
                    />
                </Input>
                <FormControlHelper>
                    <FormControlHelperText>
                        delete this
                    </FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon
                        as={AlertCircleIcon}
                        className="text-destructive"
                    />
                    <FormControlErrorText className="text-destructive">
                        At least 3 characters are required.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>

            <Calendar mode="single" value={selected} onValueChange={setSelected}>
                <CalendarHeader>
                    <CalendarHeaderPrevButton>
                        <Icon as={ChevronLeftIcon} />
                    </CalendarHeaderPrevButton>
                    <CalendarHeaderTitle />
                    <CalendarHeaderNextButton>
                        <Icon as={ChevronRightIcon} />
                    </CalendarHeaderNextButton>
                </CalendarHeader>

                <CalendarWeekDaysHeader />

                <CalendarBody>
                    <CalendarGrid>{/* Calendar will auto-render the grid */}</CalendarGrid>
                </CalendarBody>
            </Calendar>

            <Select>
                <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select option" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className = "bg-black">
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {sports.map((sport) => (
                            <SelectItem label={sport} value={sport} textStyle={{style: {color: 'white'}}}/>
                        ))}
                    </SelectContent>
                </SelectPortal>
            </Select>




            <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
                <ButtonText onPress={() => console.log(sports + "")}>Submit</ButtonText>
            </Button>
        </VStack>
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

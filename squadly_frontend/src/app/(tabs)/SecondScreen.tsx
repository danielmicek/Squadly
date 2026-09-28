import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {BottomTabInset, MaxContentWidth, Spacing} from '@/constants/theme';
import {styled} from "nativewind";
import MapView from 'react-native-maps';
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
} from '@/components/ui/form-control';
import {AlertCircleIcon, CalendarDaysIcon, ChevronDownIcon} from '@/components/ui/icon';
import {Input, InputField} from '@/components/ui/input';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
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
import {GET_allSports, GET_allTypes} from "@/methods/fetchMethods";
import {
    DateTimePicker,
    DateTimePickerIcon,
    DateTimePickerInput,
    DateTimePickerTrigger,
} from '@/components/ui/date-time-picker';
import {Box} from '@/components/ui/box';
import {Switch} from '@/components/ui/switch';

const StyledSafeAreaView = styled(SafeAreaView, { className: "style" });

export default function SecondScreen() {
    const [isInvalid, setIsInvalid] = useState(false);
    const [title, setTitle] = useState('12345');
    const [dateTime, setDateTime] = useState(new Date());
    const [sports, setSports] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedSport, setSelectedSport] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [maxParticipants, setMaxParticipants] = useState(null);
    const [willParticipate, setWillParticipate] = useState(true);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const loadSports = async () => {
            const tmp = await GET_allSports();
            setSports(tmp);
        };

        const loadTypes = async () => {
            const tmp = await GET_allTypes();
            setTypes(tmp);
        };

        loadSports();
        loadTypes();
    }, []);

    function  handleSubmit(eventData){
        console.log(eventData);
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
                        placeholder="password"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                </Input>

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

            <FormControlLabel>
                <FormControlLabelText>Sport</FormControlLabelText>
            </FormControlLabel>
            <Select
                selectedValue={selectedSport}
                onValueChange={(value) => setSelectedSport(value)}
            >
                <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select sport" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className = "bg-black">
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {sports.map((sport) => (
                            <SelectItem key = {sport} label={sport} value={sport} textStyle={{style: {color: 'white'}}}/>
                        ))}
                    </SelectContent>
                </SelectPortal>
            </Select>

            <FormControlLabel>
                <FormControlLabelText>Area type</FormControlLabelText>
            </FormControlLabel>
            <Select
                selectedValue={selectedType}
                onValueChange={(value) => setSelectedType(value)}
            >
                <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select area type" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className = "bg-black">
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {types.map((type) => (
                            <SelectItem key = {type} label={type} value={type} textStyle={{style: {color: 'white'}}}/>
                        ))}
                    </SelectContent>
                </SelectPortal>
            </Select>

            <FormControlLabel>
                <FormControlLabelText>Max participants</FormControlLabelText>
            </FormControlLabel>
            <Input>
                <InputField
                    keyboardType="numeric"
                    placeholder="Number of participants"
                    onChangeText={(text) => setMaxParticipants(text)}
                />
            </Input>

            <FormControlLabel>
                <FormControlLabelText>Event date</FormControlLabelText>
            </FormControlLabel>
            <Box className="w-full">
                <DateTimePicker
                    value={dateTime}
                    onChange={setDateTime}
                    mode="datetime"
                    placeholder="Select date and time"
                >
                    <DateTimePickerTrigger>
                        <DateTimePickerInput />
                        <DateTimePickerIcon as={CalendarDaysIcon} />
                    </DateTimePickerTrigger>
                </DateTimePicker>
            </Box>

            <FormControlLabel>
                <FormControlLabelText>I will participate</FormControlLabelText>
            </FormControlLabel>
            <Box className="flex flex-row justify-start">
                <Switch
                    size="lg"
                    isDisabled={false}
                    trackColor={{ false: '#525252', true: '#ff8a26' }}
                    thumbColor="#fafafa"
                    activeThumbColor="#fafafa"
                    ios_backgroundColor="#d4d4d4"
                    onToggle = {(value) => setWillParticipate(value)}
                />
            </Box>


            <Button className="w-fit self-end mt-4" size="sm"
                    onPress={() => handleSubmit(
                        {
                            "title": title,
                            "type": selectedType,
                            "sport": selectedSport,
                            "timestamp": dateTime,
                            "maxParticipants": maxParticipants,
                            "actualParticipants": willParticipate ? 1 : 0,
                            "joinRequests": []
                        }
                    )}
            >
                <ButtonText>Create event</ButtonText>
            </Button>

            <View style={styles.container}>
                <MapView style={styles.map} />
            </View>

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
    map: {
        width: '100%',
        height: '100%',
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

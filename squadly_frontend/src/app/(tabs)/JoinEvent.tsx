import {StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {BottomTabInset, MaxContentWidth, Spacing} from '@/constants/theme';
import {styled} from "nativewind";
import {VStack} from '@/components/ui/vstack';
import {GET_allSports, GET_allTypes, POST_newEvent} from "@/methods/fetchMethods";
import {Chat} from "@/components/Chat";
import type {IMessage} from "react-native-gifted-chat";

const StyledSafeAreaView = styled(SafeAreaView, { className: "style" });

export default function CreateEventForm() {
    const [isInvalid, setIsInvalid] = useState(false);
    const [title, setTitle] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [sports, setSports] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedSport, setSelectedSport] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [maxParticipants, setMaxParticipants] = useState(null);
    const [willParticipate, setWillParticipate] = useState(true);
    const [date, setDate] = useState(new Date());
    const [messages, setMessages] = useState<IMessage[]>([])

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

    function handleSubmit(eventData){
        console.log(eventData);
        POST_newEvent(eventData)

    };

    return (
        <StyledSafeAreaView className="flex-1 bg-black">
            <VStack className="flex-1 bg-black pb-20">
                <Chat messages={messages} setMessages={setMessages} />


            </VStack>
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

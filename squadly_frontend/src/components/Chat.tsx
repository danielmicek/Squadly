import React, {useCallback, useEffect} from 'react'
import {GiftedChat, type IMessage} from 'react-native-gifted-chat'
import {useHeaderHeight} from 'expo-router/react-navigation'
import {useAuth} from '@clerk/expo'
import {sendMessage} from "@/methods/fetchMethods";

type ChatProps = {
    messages: IMessage[]
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
}

export function Chat({
                         messages,
                         setMessages
                     }: ChatProps) {
    const { userId, isLoaded, isSignedIn } = useAuth()
    const client = useStomp();


    // keyboardVerticalOffset = distance from screen top to GiftedChat container
    // useHeaderHeight() returns status bar + navigation header height
    const headerHeight = useHeaderHeight()

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'John Doe',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello tester',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'Kim Kardashian',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        sendMessage("ahoj", client)
    }, [])



    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            isScrollToBottomEnabled
            user={{
                _id: 1,
            }}
            keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
        />
    )
}

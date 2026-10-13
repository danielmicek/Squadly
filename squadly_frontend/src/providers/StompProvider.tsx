import React, {createContext, useContext, useEffect, useState,} from 'react';

import {Client} from '@stomp/stompjs';

const StompContext = createContext<Client | null>(null);

export function StompProvider({ children }: { children: React.ReactNode }) {
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://10.0.2.2:8080/stomp-endpoint',

            onConnect: () => {
                console.log('STOMP connected');
            },

            onDisconnect: () => {
                console.log('STOMP disconnected');
            },

            onStompError: (frame) => {
                console.log('STOMP error:', frame);
            },
        });

        stompClient.activate();

        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);

    return ( // všetkým potomkom pod týmto Providerom sprístupni hodnotu client cez StompContext
        <StompContext.Provider value={client}>
            {children}
        </StompContext.Provider>
    );
}

export function useStomp() {
    return useContext(StompContext);
}
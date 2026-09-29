import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {Tabs} from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'black',
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 16,
                    marginHorizontal: 16,
                    height: 64,
                    borderRadius: 24,
                    borderTopWidth: 0,
                    backgroundColor: '#ffffff',
                    overflow: 'hidden',
                },
                tabBarItemStyle: {
                    paddingTop: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="CreateEvent"
                options={{
                    title: 'Create Event',
                    tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="calendar" color={color} />,
                }}
            />
            <Tabs.Screen
                name="JoinEvent"
                options={{
                    title: 'Join Event',
                    tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="volleyball" color={color} />,
                }}
            />
        </Tabs>
    );
}

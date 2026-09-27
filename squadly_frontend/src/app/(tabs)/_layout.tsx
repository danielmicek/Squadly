import FontAwesome from '@expo/vector-icons/FontAwesome';
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
                name="SecondScreen"
                options={{
                    title: 'SecondScreen',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}

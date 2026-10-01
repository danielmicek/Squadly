import {StyleSheet, View} from 'react-native';
import MapView from "react-native-maps";
import {BottomTabInset, MaxContentWidth, Spacing} from "@/constants/theme";
import Geolocation from '@react-native-community/geolocation';
import GooglePlacesInput from "@/components/GooglePlacesInput"

export default function Map({
                                location,
                                setLocation,
                                mapRef}){

    const getMyLocation = () => {
        Geolocation.getCurrentPosition((location) => {
                mapRef.current?.animateToRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });

                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            },
            (error) => {
                console.log("LOCATION ERROR:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );
    };

    return (
        <View style={styles.container}>
            <GooglePlacesInput setEventLocation = {setLocation} mapRef={mapRef} />
            <MapView style={styles.map}
                     provider="PROVIDER_GOOGLE"
                     onMapReady={() => getMyLocation()}
                     ref={mapRef}
                     showsCompass = {true}
                     initialRegion={{
                         latitude: 48.1486,
                         longitude: 17.1077,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }}>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'col',
        alignItems: 'stretch',
        gap: 12
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
import React from 'react';
import GooglePlacesTextInput from 'react-native-google-places-textinput';

export default function GooglePlacesInput({
                                              setEventLocation,
                                              mapRef}){
    const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
        <GooglePlacesTextInput
            apiKey={googleMapsApiKey}
            onPlaceSelect={(selectedLocation) => {
                setEventLocation(location)

                // Moves the map to the selected location
                mapRef.current?.animateToRegion({
                    latitude: selectedLocation.details.location.latitude,
                    longitude: selectedLocation.details.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }}
            placeHolderText="Select event location"
            fetchDetails={true}
            detailsFields={['location']}
        />
    );
};
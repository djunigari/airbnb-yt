import { Map as MabBox, Marker, Popup, PopupEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getCenter } from 'geolib';
import { useEffect, useState } from 'react';

const MAPBOX_TOKEN = process.env.mapbox_key;

interface resultData {
    img: string
    location: string
    title: string
    price: string
    total: string
    description: string
    long: number
    lat: number
    star: number
}

interface Props {
    searchResults: [resultData]
}
export default function Map({ searchResults }: Props) {
    const [location, setLocation] = useState<resultData | null>(null)

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)

    return (
        <MabBox
            initialViewState={{
                longitude: (center ? center["longitude"] : 27.7727),
                latitude: (center ? center["latitude"] : 37.9998),
                zoom: 11
            }}
            mapStyle="mapbox://styles/djunigari/cl0ssywkq000715mooxwk1fut"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {searchResults?.map((item, i) =>
                <Marker key={`marker_${i}`}
                    longitude={item.long}
                    latitude={item.lat}
                >
                    <p
                        role="img"
                        onClick={() => setLocation(item)}
                        className='cursor-pointer text-2xl animate-bounce'
                        aria-label='push-pin'
                    >📌</p>
                </Marker>
            )}
            {location?.long && (
                <Popup
                    onClose={() => setLocation(null)}
                    closeOnClick={false}
                    longitude={location.long}
                    latitude={location.lat}
                >
                    {location.title}
                </Popup>
            )}
        </MabBox >
    )
}

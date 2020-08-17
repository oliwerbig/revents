import React from 'react'
import { Segment } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'
import { Icon } from 'semantic-ui-react'

function Marker() {
    return (<Icon name='marker' size='big' color='red' />)
}

export default function EventDetaileddMap({ latLng }) {
    const zoom = 14

	return (
		<Segment>
			<div style={{ height: 300, width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: 'AIzaSyDYUzFpPkpEHZ_ohS1hpZj6i5yZz6N4en0',
					}}
					center={latLng}
					zoom={zoom}
				>
                    <Marker lat={latLng.lat} lng={latLng.lng} />
                </GoogleMapReact>
			</div>
		</Segment>
	)
}

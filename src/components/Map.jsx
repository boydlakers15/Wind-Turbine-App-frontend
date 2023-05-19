import { useEffect, useRef, useState } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import '../styles/Map.css';

const Map = () => {
  const mapRef = useRef(null);
  const [response, setResponse] = useState('');
  const [directionsDuration, setDirectionsDuration] = useState('');
  const [directionsDistance, setDirectionsDistance] = useState('');
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB3STjyJXDqOjf3tqG0oI9xO3i2tSUYgzo&libraries=places&callback=initMap`;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 8,
        center: { lat: 52.5123936, lng: 13.4131204 },
        mapTypeControl: true,
        scrollwheel: true,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
      const geocoder = new window.google.maps.Geocoder();
      const marker = new window.google.maps.Marker({
        map,
      });

      const inputText = document.createElement('input');
      inputText.type = 'text';
      inputText.placeholder = 'Enter a location';
      inputText.className = 'input-text';

      const submitButton = document.createElement('input');
      submitButton.type = 'button';
      submitButton.value = 'Geocode';
      submitButton.className = 'button-primary';

      const clearButton = document.createElement('input');
      clearButton.type = 'button';
      clearButton.value = 'Clear';
      clearButton.className = 'button-secondary';

      const locationButton = document.createElement('input');
      locationButton.type = 'button';
      locationButton.value = 'My Location';
      locationButton.className = 'button-primary';

      const directionsButton = document.createElement('input');
      directionsButton.type = 'button';
      directionsButton.value = 'Directions';
      directionsButton.className = 'button-primary';

      const instructionsElement = document.createElement('p');
      instructionsElement.id = 'instructions';
      instructionsElement.innerHTML =
        '<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.';

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputText);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(submitButton);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(clearButton);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(locationButton);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(directionsButton);

      map.addListener('click', (e) => {
        geocode({ location: e.latLng });
      });

      submitButton.addEventListener('click', () => {
        geocode({ address: inputText.value });
      });

      clearButton.addEventListener('click', clear);

      locationButton.addEventListener('click', getUserLocation);

      directionsButton.addEventListener('click', getDirections);

      function clear() {
        marker.setMap(null);
        if (directionsRenderer) {
          directionsRenderer.setMap(null);
        }
        setResponse('');
        setDirectionsDuration('');
        setDirectionsDistance('');
      }

      function geocode(request) {
        clear();
        geocoder
          .geocode(request)
          .then((result) => {
            const { results } = result;

            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
            marker.setMap(map);
            setResponse(JSON.stringify(result, null, 2));
            return results;
          })
          .catch((e) => {
            alert('Geocode was not successful for the following reason: ' + e);
          });
      }

      function getUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const latlng = {
                lat: latitude,
                lng: longitude,
              };
  
              // Update the map to center on the user's current location
              map.setCenter(latlng);
              marker.setPosition(latlng);
              marker.setMap(map);
  
              // Perform reverse geocoding to get the address of the user's location
              geocoder
                .geocode({ location: latlng })
                .then((result) => {
                  const { results } = result;
                  if (results && results.length > 0) {
                    setResponse(JSON.stringify(result, null, 2));
                    
                  }
                })
                .catch((e) => {
                  alert('Geocode was not successful for the following reason: ' + e);
                });
            },
            (error) => {
              alert('Unable to retrieve your location. Error: ' + error.message);
            }
          );
        } else {
          alert('Geolocation is not supported by your browser.');
        }
      }

      function getDirections() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const directionsService = new window.google.maps.DirectionsService();
              const directionsRenderer = new window.google.maps.DirectionsRenderer();

              directionsRenderer.setMap(map);
              setDirectionsRenderer(directionsRenderer);

              const start = new window.google.maps.LatLng(latitude, longitude);
              const end = marker.getPosition();

              const request = {
                origin: start,
                destination: end,
                travelMode: window.google.maps.TravelMode.DRIVING,
              };

              directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  directionsRenderer.setDirections(result);
                  const route = result.routes[0];
                  const leg = route.legs[0];
                  setDirectionsDuration(leg.duration.text);
                  setDirectionsDistance(leg.distance.text);
                } else {
                  alert('Unable to retrieve directions. Error: ' + status);
                }
              });
            },
            (error) => {
              alert('Unable to retrieve your location. Error: ' + error.message);
            }
          );
        } else {
          alert('Geolocation is not supported by your browser.');
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box marginTop="4rem" >  {/* Adjust the margin top value as per your navbar height */}
      <Box
        ref={mapRef}
        height="500px"
        width={'850px'}
        marginBottom="2rem"
      />
      <Flex justifyContent="center">
        <Box
          backgroundColor="white"
          padding="5rem"
          borderRadius="md"
          boxShadow="md"
          height="300px"
          maxWidth="400px"
          overflowY="auto"
          color={'black'}
          marginRight="2rem"
        >
          <Text fontWeight="bold" marginBottom="1rem">
            Response:
          </Text>
          <Text fontSize={'15px'} as="pre" whiteSpace="pre-wrap">
            {response}
          </Text>
        </Box>
        <Box
          backgroundColor="white"
          padding="5rem"
          borderRadius="md"
          boxShadow="md"
          height="300px"
          maxWidth="400px"
          overflowY="auto"
          color={'black'}
        >
          <Text fontWeight="bold" marginBottom="1rem">
            Directions:
          </Text>
          <Text>
            Duration: {directionsDuration}
          </Text>
          <Text>
            Distance: {directionsDistance}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Map;








        















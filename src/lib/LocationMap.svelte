<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	let marker: any;
	let popup: any;
	let map: any;

	const coordinates: Writable<[number, number]> = writable([25.306162, 55.374558]);

	let L: any;

	const createMarker = (coords: [number, number]) => {
		if (marker) {
			marker.setLatLng(coords);
		} else {
			marker = L.marker(coords).addTo(map);
		}
	};

	const createPopupContent = (lat: number, lng: number) => `
    <b>Open in:</b><br>
    <a href="geo:${lat},${lng}?q=${lat},${lng}" target="_blank">Maps App</a><br>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">Google Maps</a>
  `;

	const createPopup = (coords: [number, number]) => {
		if (popup) {
			popup.setContent(createPopupContent(coords[0], coords[1]));
			marker.bindPopup(popup).openPopup();
		} else {
			popup = L.popup().setContent(createPopupContent(coords[0], coords[1]));
			marker.bindPopup(popup);
		}
	};

	let cleanup: (() => void) | undefined;

	$effect(() => {
		const initializeMap = async () => {
			if (typeof window !== 'undefined') {
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
				document.head.appendChild(link);

				await new Promise((resolve) => {
					link.onload = resolve;
				});

				L = (await import('leaflet')).default;
				map = L.map('map').setView([25.306162, 55.374558], 13);

				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

				map.whenReady(() => {
					coordinates.subscribe((coords) => {
						createMarker(coords);
						createPopup(coords);
					});
				});

				cleanup = () => {
					if (map) {
						map.off();
						map.remove();
					}
				};
			}
		};

		initializeMap();

		return cleanup;
	});
</script>

<div id="map"></div>


<style lang="css">
	#map {
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: var(--xlarge-max-width);
		height: 400px;
		margin: 100px auto 60px;
		border: 1px solid var(--black);
		border-radius: 5px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		}
</style>

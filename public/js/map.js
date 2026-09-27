mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates,
    zoom: 9
});

map.scrollZoom.setWheelZoomRate(1 / 50);
map.scrollZoom.setZoomRate(1 / 10);

const marker = new mapboxgl.Marker({ color: "black" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({
            offset: 25
        }).setHTML(`
            <div class="text-center">
                <h5 class="fw-bold mb-2">${listing.location}</h5>
                <p class="text-muted mb-0">
                    Exact location provided after booking
                </p>
            </div>
        `)
    )
    .addTo(map);
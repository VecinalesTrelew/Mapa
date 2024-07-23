document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([-43.2498, -65.3051], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function createCustomIcon(color) {
        return L.divIcon({
            className: 'custom-icon',
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C7.0275 0 3 4.0275 3 9C3 16.125 12 24 12 24C12 24 21 16.125 21 9C21 4.0275 16.9725 0 12 0ZM12 13.5C9.5145 13.5 7.5 11.4855 7.5 9C7.5 6.5145 9.5145 4.5 12 4.5C14.4855 4.5 16.5 6.5145 16.5 9C16.5 11.4855 14.4855 13.5 12 13.5Z"/>
                   </svg>`,
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
        });
    }

    // Datos de las sedes vecinales (coordenadas ajustadas para Trelew)
    const sedes = [
        {lat: -43.2444, lng: -65.2844, nombre: "Planta de Gas", direccion: "Juana Azurduy 419", presidente: "Johana Diaz", estado: "Normal", color: "#41ed00"},
        {lat: -43.2660, lng: -65.3567, nombre: "Inta", direccion: "Gobernador Costa y Gaiman", presidente: "Daniel Figueroa", estado: "Normal", color: "#41ed00"},
        {lat: -43.2667, lng: -65.3067, nombre: "San José", direccion: "Onas y Remedios de Escalada", presidente: "Esteban Collio", estado: "Normal", color: "#41ed00"},
        // Añadir más sedes aquí
    ];

    // Añadir marcadores al mapa
    sedes.forEach(sede => {
        L.marker([sede.lat, sede.lng], {icon: createCustomIcon(sede.color)}).addTo(map)
            .bindPopup(`
                <b>${sede.nombre}</b><br>
                Dirección: ${sede.direccion}<br>
                Presidente: ${sede.presidente}<br>
                Estado: ${sede.estado}
            `);
    });
});
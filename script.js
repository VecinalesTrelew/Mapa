document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([-43.2498, -65.3051], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Datos de las sedes vecinales (coordenadas ajustadas para Trelew)
    const sedes = [
        {lat: -43.2498, lng: -65.3051, nombre: "Sede 1", direccion: "Calle 1, 123", presidente: "Juan Pérez"},
        {lat: -43.2550, lng: -65.3100, nombre: "Sede 2", direccion: "Calle 2, 234", presidente: "María López"},
        // Añadir más sedes aquí
    ];

    // Añadir marcadores al mapa
    sedes.forEach(sede => {
        L.marker([sede.lat, sede.lng]).addTo(map)
            .bindPopup(`<b>${sede.nombre}</b><br>Dirección: ${sede.direccion}<br>Presidente: ${sede.presidente}`);
    });
});
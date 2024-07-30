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
        {lat: -43.2444, lng: -65.2844, nombre: "Planta de Gas", direccion: "Juana Azurduy 419", presidente: "Johana Diaz", estado: "Activo", color: "#41ed00"},
        {lat: -43.2660, lng: -65.3567, nombre: "Inta", direccion: "Gobernador Costa y Gaiman", presidente: "Daniel Figueroa", estado: "Activo", color: "#41ed00"},
        {lat: -43.2667, lng: -65.3067, nombre: "San José", direccion: "Onas y Remedios de Escalada", presidente: "Esteban Collio", estado: "Activo", color: "#41ed00"},
        {lat: -43.2555, lng: -65.3338, nombre: "Corradi", direccion: "Ecuador y Simon de Alcazabar", presidente: "Camila Sepulveda", estado: "Activo", color: "#41ed00"},
        {lat: -43.2469, lng: -65.3255, nombre: "Los Aromos", direccion: "Los Arrayanes, entre Las Araucarias y Las Acacias", presidente: "Ruben Lencina", estado: "Activo", color: "#41ed00"},
        {lat: -43.2602, lng: -65.3321, nombre: "Malvinas", direccion: "Juan de la Piedra 325", presidente: "Claudia Cañumil", estado: "Activo", color: "#41ed00"},
        {lat: -43.2594, lng: -65.3472, nombre: "Menfa", direccion: "26 de Noviembre y Viedman", presidente: "Eduardo Singler", estado: "Activo", color: "#41ed00"},
        {lat: -43.2405, lng: -65.2877, nombre: "Norte", direccion: "Las Heras 78", presidente: "Veronica Rivera", estado: "Activo", color: "#41ed00"},
        {lat: -43.2465, lng: -65.3181, nombre: "Oeste", direccion: "Pje. Córdoba y Fuerte San José", presidente: "Pedro Jaramillo", estado: "Activo", color: "#41ed00"},
        {lat: -43.2431, lng: -65.3038, nombre: "Don Bosco", direccion: "Pje. Córdoba y Fuerte San José", presidente: "Pablo Monteros", estado: "Activo", color: "#41ed00"},
        {lat: -43.2732, lng: -65.3057, nombre: "Etchepare", direccion: "Scalabrini Ortiz 1753", presidente: "Luis Treuquil", estado: "Activo", color: "#41ed00"},
        {lat: -43.2552, lng: -65.3250, nombre: "Progreso", direccion: "Entre Rios 146", presidente: "Andres Obregon", estado: "Activo", color: "#41ed00"},
        {lat: -43.2451, lng: -65.3135, nombre: "Pte. Perón", direccion: "Rivadavia 419", presidente: "Florencia Beizaga", estado: "Activo", color: "#41ed00"},
        {lat: -43.2554, lng: -65.2805, nombre: "Santa Catalina", direccion: "Maria Humprey 1169", presidente: "Alejandra Vazquez", estado: "Activo", color: "#41ed00"},
        {lat: -43.2583, lng: -65.3214, nombre: "Sarmiento", direccion: "Uruguay 470", presidente: "Mario Diaz", estado: "Activo", color: "#41ed00"},
        {lat: -43.2670, lng: -65.3101, nombre: "Santa Mónica", direccion: "Emilio Frey 1280", presidente: "Gisell Aguirre", estado: "Activo", color: "#41ed00"},
        {lat: -43.2369, lng: -65.3022, nombre: "Tiro Federal", direccion: "José Montes 811", presidente: "Bernardino Albial", estado: "Activo", color: "#41ed00"},
        {lat: -43.2466, lng: -65.3023, nombre: "Unión", direccion: "Alem 30", presidente: "Stella Maris Ferreyra", estado: "Activo", color: "#41ed00"},
        {lat: -43.2616, lng: -65.2896, nombre: "Villa Italia", direccion: "Maria Humpreys 202", presidente: "Fernando Sanchez", estado: "Activo", color: "#41ed00"},
        {lat: -43.2701, lng: -65.3097, nombre: "Illia", direccion: "Scalabrini Ortiz y Fray Luis Beltrán", presidente: "Andres San Martin", estado: "Activo", color: "#41ed00"},
        {lat: -43.2493, lng: -65.3268, nombre: "Constitución", direccion: "Sin Sede", presidente: "Gastón Espiace", estado: "Utilizando una biblioteca provisoriamente", color: "#eaef00"},
        {lat: -43.2606, lng: -65.3563, nombre: "Moreira 1/2/3/4", direccion: "Sin Sede", presidente: "Marcela Rechimon", estado: "Se encuentra activa pero sin talleres y demás actividades, por no tener espacio físico", color: "#eaef00"},
        {lat: -43.2758, lng: -65.2949, nombre: "Los Sauces", direccion: "Sin Sede", presidente: "Juan José Galtieri", estado: "Se encuentra activa pero sin talleres y demás actividades, por no tener espacio físico", color: "#eaef00"},
        {lat: -43.2487, lng: -65.2871, nombre: "Guayra", direccion: "Sin Sede", presidente: "Julieta Lewis", estado: "Se encuentra activa pero sin talleres y demás actividades, por no tener espacio físico", color: "#eaef00"},
        {lat: -43.2810, lng: -65.2712, nombre: "Los Paraísos", direccion: "Sin Sede", presidente: "Jorge Omar Subiela", estado: "Se encuentra activa pero sin talleres y demás actividades, por no tener espacio físico", color: "#eaef00"},
        {lat: -43.2668, lng: -65.2956, nombre: "San David", direccion: "Juan Manuel de Rosas 1748", presidente: "Teresa Mackenzie", estado: "Se reactiva proximamente", color: "#eaef00"},
        {lat: -43.2411, lng: -65.3125, nombre: "San Martin", direccion: "Sin Sede", presidente: "Lucio Castillo", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2742, lng: -65.2576, nombre: "Los Pinos", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2579, lng: -65.3188, nombre: "Democracia", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2773, lng: -65.3153, nombre: "Balcones del Valle", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2679, lng: -65.3204, nombre: "Belgrano", direccion: "Sin Sede", presidente: "Gladys Norma Gonzales", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2516, lng: -65.3331, nombre: "Primera Junta", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2702, lng: -65.2538, nombre: "Los Teros", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2805, lng: -65.2992, nombre: "Los Tilos", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2564, lng: -65.2956, nombre: "Padre Juan", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.3066, lng: -65.3019, nombre: "Parque Hendre", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.3061, lng: -65.3620, nombre: "Zona Chacras", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2617, lng: -65.3014, nombre: "Los Olmos", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2666, lng: -65.2848, nombre: "12 de Octubre", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2525, lng: -65.2766, nombre: "22 de Agosto", direccion: "Sin Sede", presidente: "Lorena Coria", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2515, lng: -65.2989, nombre: "Alberdi", direccion: "Sin Sede", presidente: "Alejandra Caruzo", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2653, lng: -65.3490, nombre: "Amaya", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2701, lng: -65.2766, nombre: "Quinta del Valle", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2532, lng: -65.3117, nombre: "Raúl Alfonsin", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2747, lng: -65.2832, nombre: "San Benito", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2698, lng: -65.2906, nombre: "Juan Manuel de Rosas", direccion: "Sin Sede", presidente: "Danilo Bisso", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2456, lng: -65.2981, nombre: "La Laguna", direccion: "Sin Sede", presidente: "Ricardo Miguens", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2835, lng: -65.2986, nombre: "Las Margaritas", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2652, lng: -65.2582, nombre: "Los Alamos", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.3020, lng: -65.3792, nombre: "Los Laberintos", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        {lat: -43.2774, lng: -65.2650, nombre: "Los Mimbres", direccion: "Sin Sede", presidente: "Sin Presidente", estado: "Inactivo", color: "#f44336"},
        
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
const buscador = document.querySelector('.inputNavBar');
const imagenesPrimerContenedor = document.getElementById('contenedorDeImagenes1');
const imagenesSegundoContenedor = document.getElementById('contenedorDeImagenes2');
const urlBase = 'https://api.unsplash.com/search/photos?page=1&query=';
const clientId = 'czJLyiEn0xWzc55lra7DNhs5OFeJdTxt5cb5W8gbERg';

buscador.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        buscarData();
    }
});

function buscarData() {
    const busqueda = buscador.value.trim();

    if (busqueda !== '') {
        const url = `${urlBase}${busqueda}&client_id=${clientId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                imagenesPrimerContenedor.style.display = 'none';
                imagenesSegundoContenedor.classList.remove('imagesGridContainer2');
                imagenesSegundoContenedor.classList.add('imagesGridContainer3')
                // Limpiando el contenedor de imágenes
                imagenesSegundoContenedor.innerHTML = '';

                // Recorreriendo los resultados de la API y crear elementos de imagen
                data.results.forEach(resultado => {
                    const divImagen = document.createElement('div');
                    divImagen.classList.add('image'); 

                    const imagen = document.createElement('img');
                    imagen.src = resultado.urls.regular;
                    imagen.classList.add('imagenResultado');
                    const botonGuardar = document.createElement('button');
                    botonGuardar.textContent = 'Guardar';
                    botonGuardar.classList.add('guardarButton'); 

                    botonGuardar.addEventListener('mouseenter', function() {
                        const imagenSiguiente = this.previousElementSibling; 
                        imagenSiguiente.style.filter = 'brightness(0.7)'; 
                    });

                    botonGuardar.addEventListener('mouseleave', function() {
                        const imagenSiguiente = this.previousElementSibling; 
                        imagenSiguiente.style.filter = 'none'; 
                    });

                    divImagen.appendChild(imagen);
                    divImagen.appendChild(botonGuardar);

                    imagenesSegundoContenedor.appendChild(divImagen);
                });
            })
            .catch(error => console.error('Error al obtener datos de la API:', error));
    }
}
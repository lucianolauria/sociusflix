$(document).ready(function () {
    cargarPeliculas();
});

function cargarPeliculas(){
    $.ajax({
        url: 'https://www.codigo-alfa.cl/aglo/Tester/listasPeliculas',
        method: 'GET',
        success: function (data) {
            console.log(data);
            var peliculas = data.peliculas;
            var select = $('#pelicula-select');
            select.empty();
            select.append('<option value="">Seleccione una película</option>');
            peliculas.forEach(function(pelicula) {
                select.append('<option value="' + pelicula.id + '">' + pelicula.title + '</option>');
            });
        },
        error: function (xhr, status, error) {
            console.error('Error al cargar las películas:', error);
        }
    });
}

function getPeliculaAleatorio(){
    $.ajax({
        url: 'https://www.codigo-alfa.cl/aglo/Tester/peliculaAleatoria',
        method: 'GET',
        success: function (data) {
            console.log(data);
            mostrarInfoPelicula(data.pelicula);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener la película aleatoria:', error);
        }
    });
}

function mostrarPeliculaSeleccionada(){
    var select = $('#pelicula-select');
    var peliculaId = select.val();
    if (peliculaId) {
        $.ajax({
            url: 'https://www.codigo-alfa.cl/aglo/Tester/listasPeliculas',
            method: 'GET',
            success: function (data) {
                var pelicula = data.peliculas.find(function(p) { return p.id == peliculaId });
                if (pelicula) {
                    mostrarInfoPelicula(pelicula);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error al mostrar la película seleccionada:', error);
            }
        });
    } else {
        $('#pelicula-info').hide();
    }
}

function mostrarInfoPelicula(pelicula) {
    $('#titulo').text(pelicula.title);
    $('#ano').text('Año: ' + pelicula.year);
    $('#genero').text('Género: ' + pelicula.genre);
    $('#pelicula-img').attr('src', 'assets/img/' + pelicula.id + '.jpg');
    $('#pelicula-info').show();
}

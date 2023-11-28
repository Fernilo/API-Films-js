let pagina = 1;
const btnAnterior = document.querySelector('#btnAnterior');
const btnSiguiente = document.querySelector('#btnSiguiente');

btnSiguiente.addEventListener('click' , () => {
	if(pagina <= 500){
		pagina += 1;
		cargarPeliculas()
	}
});

btnAnterior.addEventListener('click' , () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas()
	}
});

const cargarPeliculas = async() => {
	try {
		//fetch devuelve una promesa
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=880e5d0d0643a40e8d9c5a13c0d19851&language=es-AR&page=${pagina}`);

		if(respuesta.status === 200) {
			const datos = await respuesta.json();
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas +=`
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401) {
			console.log("Api key erronea")
		} else if(respuesta.status === 404) {
			console.log("La pelicula no existe");
		} else {
			console.log("No sé que paso");
		}

	} catch (error) {
		console.log(error);
	}
}

cargarPeliculas();
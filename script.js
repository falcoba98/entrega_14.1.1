document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchQuery = document.getElementById('query');
    const results = document.getElementById('results');

    searchButton.addEventListener('click', () => {
        const query = searchQuery.value.trim();
        if (query === '') {
            alert('Por favor ingresa un término de búsqueda.');
            return;
        }

        const url = `https://images-api.nasa.gov/search?q=${query}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                results.innerHTML = ''; // Limpiar resultados anteriores
                const items = data.collection.items;

                if (items.length === 0) {
                    results.innerHTML = '<p>No se encontraron resultados.</p>';
                    return;
                }

                items.forEach(item => {
                    if (item.links && item.links.length > 0 && item.data && item.data.length > 0) {
                        const image = item.links[0].href; // Obtener la URL de la imagen
                        const title = item.data[0].title; // Obtener el título
                        const description = item.data[0].description; // Obtener la descripción
                        const date = item.data[0].date_created; // Obtener la fecha

                        const card = document.createElement('div');
                        card.className = 'card col-md-4'; // Tamaño de la card
                        card.innerHTML = `
                            <img src="${image}" class="card-img-top" alt="${title}">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${description}</p>
                                <p class="card-text"><small class="text-muted">${new Date(date).toLocaleDateString()}</small></p>
                            </div>
                        `;
                        results.appendChild(card);
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});

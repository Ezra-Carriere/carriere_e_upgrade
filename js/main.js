(() => {
    const artworkBox = document.querySelector("#artwork-box");
    const infoCon = document.querySelector("#info-con");
    const loadingIcon = document.querySelector("#loading-icon");
    const baseUrl = "https://api.artic.edu/api/v1/artworks";

    function showLoadingIcon() {
        loadingIcon.style.display = "block";
    }

    function hideLoadingIcon() {
        loadingIcon.style.display = "none";
    }

    function fetchArtworks() {
        showLoadingIcon();

        const randomPage = Math.floor(Math.random() * 7) + 1;
        fetch(`${baseUrl}?page=${randomPage}&limit=10`)
            .then(response => response.json())
            .then(function(response) {
                hideLoadingIcon();

                let artworks = response.data;
                const ul = document.createElement('ul');

                artworks.forEach(artwork => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = artwork.title;
                    a.href = "#";
                    a.setAttribute('data-artwork-id', artwork.id);
                    li.appendChild(a);
                    ul.appendChild(li);
                });

                artworkBox.appendChild(ul);

                const links = document.querySelectorAll('#artwork-box li a');
                links.forEach(link => {
                    link.addEventListener("click", fetchArtworkFacts);
                });
            })
            .catch(error => {
                hideLoadingIcon();
                console.log(error);
            });
    }

    function fetchArtworkFacts(event) {
        event.preventDefault();
        const artworkId = event.target.getAttribute('data-artwork-id');
        fetch(`${baseUrl}/${artworkId}`)
            .then(response => response.json())
            .then(function(response) {
                const artwork = response.data;
                displayArtworkDetails(artwork);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function displayArtworkDetails(artwork) {
        infoCon.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = artwork.title;

        const artist = document.createElement('p');
        artist.textContent = `Artist: ${artwork.artist_display}`;

        const image = document.createElement('img');
        image.src = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg` : 'placeholder.jpg';
        image.alt = artwork.title;

        infoCon.appendChild(title);
        infoCon.appendChild(artist);
        infoCon.appendChild(image);

        infoCon.style.display = 'block';
    }

    window.onload = fetchArtworks;
})();

(() => {
    const artworkBox = document.querySelector("#artwork-box");
    const baseUrl = "https://api.artic.edu/api/v1/artworks";

    function fetchArtworks() {
        const randomPage = Math.floor(Math.random() * 7) + 1;
        fetch(`${baseUrl}?page=${randomPage}&limit=10`)
            .then(response => response.json())
            .then(function(response) {
                let artworks = response.data;
                const ul = document.createElement('ul');

                artworks.forEach(artwork => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = artwork.title;
                    a.href = "#";
                    li.appendChild(a);
                    ul.appendChild(li);
                });

                artworkBox.appendChild(ul);
            })
            .then(function() {
                const links = document.querySelectorAll('#artwork-box li a');
                links.forEach(link => {
                    link.addEventListener("click", fetchArtworkFacts);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    function fetchArtworkFacts(event) {
        event.preventDefault();
        const artworkId = event.target.textContent;
        fetch(`${baseUrl}/${artworkId}`)
            .then(response => response.json())
            .then(function(response) {
                const artwork = response.data;
                console.log(artwork);
            })
            .catch(error => {
                console.log(error);
            });
    }

    window.onload = fetchArtworks;
})();

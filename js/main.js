'use strict'

async function searchTopAnimes() {
    const url = 'https://api.jikan.moe/v4/top/anime';
    const response = await fetch(url);

    const animes = await response.json();
    return animes.data
}

async function createHome() {
    const main = document.getElementById('main');
    const h2 = document.getElementById('h2');
    const container = document.createElement('div');
    container.classList.add('container-home');

    const animes = await searchTopAnimes();

    // console.log(animes)

    animes.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = anime.images.jpg.large_image_url;

        const nomeAnime = anime.titles.find(animeName => animeName.type === "Default");
        const h4 = document.createElement('h4');
        h4.textContent = nomeAnime.title;

        card.append(img, h4);
        card.addEventListener('click', () => {
            // detailAnime(anime);
            alert(`Você clicou no anime ${nomeAnime.title}`)
        })
        container.appendChild(card)
    });

    main.appendChild(container)
}

createHome();
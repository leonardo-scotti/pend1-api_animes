'use strict'

const main = document.getElementById('main');

async function searchTopAnimes() {
    const url = 'https://api.jikan.moe/v4/top/anime';
    const response = await fetch(url);

    const animes = await response.json();
    return animes.data
}

function detailAnime(anime) {
    main.replaceChildren();
    const container = document.createElement('div');
    container.classList.add('container-detail');

    const topBar = document.createElement('div');
    topBar.classList.add('top-bar');
    topBar.addEventListener('click', () => {
        history.back();
    })

    const btnBack = document.createElement('div');
    btnBack.classList.add('btn-back');

    const imgBack = document.createElement('img');
    imgBack.src = './assets/svg/back.svg';
    const pBack = document.createElement('p');
    pBack.textContent = 'Voltar';
    btnBack.append(imgBack, pBack);
    topBar.appendChild(btnBack);
    container.appendChild(topBar);

    const content = document.createElement('div');
    content.classList.add('content-detail');

    const img = document.createElement('img');
    img.src = anime.images.jpg.image_url;
    content.appendChild(img);

    const description = document.createElement('div');
    description.classList.add('description');

    const h2 = document.createElement('h2');
    h2.textContent = anime.title;
    description.appendChild(h2);

    const japaEps = document.createElement('div');
    japaEps.classList.add('japanese-eps')
    const title = document.createElement('p');
    title.textContent = `Título em Japonês: ${anime.title_japanese}`;
    const qtdEp = document.createElement('p');
    qtdEp.textContent = `Qtd. Eposódios: ${anime.episodes}`;
    japaEps.append(title, qtdEp);
    description.appendChild(japaEps);

    const sinopseDiv = document.createElement('div');
    sinopseDiv.classList.add('sinopse')
    const sinopseTitle = document.createElement('p');
    sinopseTitle.textContent = 'Sinopse: ';
    const sinopseText = document.createElement('p');
    sinopseText.textContent = anime.synopsis;
    sinopseDiv.append(sinopseTitle, sinopseText);
    description.appendChild(sinopseDiv);

    const generDiv = document.createElement('div');
    generDiv.classList.add('gener')
    const generText = document.createElement('p');
    generText.textContent = `Gênero: ${anime.genres[0].name}`;
    generDiv.appendChild(generText);
    description.appendChild(generDiv);

    const myAnime = document.createElement('div');
    myAnime.addEventListener('click', () => {
        alert(`Você clicou no gênero!`)
    })
    myAnime.classList.add('myanimelist')
    const myAnimeText = document.createElement('p');
    myAnimeText.textContent = `MyAnimeList: ${anime.url}`
    myAnime.appendChild(myAnimeText);
    description.appendChild(myAnime);

    content.appendChild(description);
    container.appendChild(content);
    main.appendChild(container)


}

async function createHome() {
    main.replaceChildren();
    const h2 = document.createElement('h2');
    h2.textContent = 'os favoritos'
    const container = document.createElement('div');
    container.classList.add('container-home');

    const animes = await searchTopAnimes();

    // console.log(animes)

    animes.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = anime.images.jpg.large_image_url;

        const h4 = document.createElement('h4');
        h4.textContent = anime.title;

        card.append(img, h4);
        card.addEventListener('click', () => {
            detailAnime(anime);
        })
        container.appendChild(card)
    });

    main.append(h2, container)
}

createHome();
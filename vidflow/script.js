const url = "http://localhost:3000/videos";
const videosContainer = document.querySelector(".videos__container");
const barraDePesquisa = document.querySelector(".pesquisar__input");
const botaoCategoria = document.querySelectorAll(".superior__item")

const buscaEMostraVideos = async () => {
  try {
    const busca = await fetch(url);
    const videos = await busca.json();

    videos.forEach((video) => {
      videosContainer.innerHTML += `
        <li class="videos__item" id="myId${video.id}">
          <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
          <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
              <h3 class="titulo-video">${video.titulo}</h3>
              <p class="titulo-canal">${video.descricao}</p>
              <p class="categoria" hidden>${video.categoria}</p>
            </img>
          </div>
        </li>
      `;
    });
  } catch (erro) {
    console.error(erro);
    return (videosContainer.innerHTML = `<h1 style="color:red;">Houve um erro ao carregar os vídeos. ${erro}</h1>`);
  }
};

buscaEMostraVideos();

const filtrarPesquisa = () => {
  const videos = document.querySelectorAll(".videos__item");

  if (barraDePesquisa.value != "") {
    videos.forEach((video) => {
      let titulo = video
        .querySelector(".titulo-video")
        .textContent.toLowerCase();
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      video.style.display = valorFiltro
        ? titulo.includes(valorFiltro)
          ? "block"
          : "none"
        : "block";
    });
  }
};

barraDePesquisa.addEventListener("input", filtrarPesquisa);

botaoCategoria.forEach(botao => {
  let nomeCategoria = botao.getAttribute("name")
  botao.addEventListener('click', () => filtraPorCategoria(nomeCategoria))
})

const filtraPorCategoria = (filtro) => {
  const videos = document.querySelectorAll(".videos__item")

  for (const video of videos) {
    let videoCategoria = video.querySelector(".categoria").textContent.toLowerCase()
    let valorFiltro = filtro.toLowerCase()

    !videoCategoria.includes(valorFiltro) && valorFiltro != "tudo" ? video.style.display = "none" : video.style.display = "block"
    
  }
}
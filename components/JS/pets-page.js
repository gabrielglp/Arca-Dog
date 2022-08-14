// APIs Bases URL
const DOG_API_BASE_URL = "https://dog.ceo/api"

// Endpoints definitions
const imgUrlEndpoint = `${DOG_API_BASE_URL}/breeds/image/random/3`

const breedUrlEndpoint = `${DOG_API_BASE_URL}/breeds/list/all`

// Get HTML elements
const mainDivElement = document.getElementById('image-container')
const wrapperDogBreedSelect = document.getElementById('wrapper-primary-dog-breeds')
const primaryDogBreedSelect = document.getElementById('primary-dog-breeds')
const imgDogBreeds = document.getElementById('img-dog-breeds')
const formElement = document.getElementById('form')
const loader = document.querySelector('.divLoader')
const main = document.querySelector('main')

let dogBreeds = null

// Obtenha imagens aleatórias para cães aleatórios dos 3 cards
function getRandomImages(isReload = false) {

  getDogBreeds().then(() => {
    fetch(imgUrlEndpoint)
    .then((res) => res.json())
    .then((data) => configureSuggestedBreedElements(data.message, isReload))
    .then(() => {
      sleep(2000).then(() => {
        loader.classList.toggle('hidden')
        main.classList.toggle('hidden')

      })
    })
    .catch((err) => console.error('AQUI ESTÁ O ERRO', err))
  })
 
}

// Obtenha imagens de uma raça de cachorro no card unico
function getDogBreeds() {
  return fetch(breedUrlEndpoint).then((res) => res.json())
  .then((data) => {dogBreeds = data})
}

// Configurar elementos para a seção de raça sugerida
// esta função se encarrega de me trazer as imagens dos cachorros em forma dinamica
function configureSuggestedBreedElements(imgArr, isReload) {
  let suggestedBreedDivElement


  // Se eu nao passar a condição negando o isReloade ele replica tudo que esta dentro
  if (!isReload) {

    // Creating a new div for suggested breed
    suggestedBreedDivElement = document.createElement('div')
    suggestedBreedDivElement.id = 'suggested-breed'

    let informationsSuggestedBreedDivElement = document.createElement('div')

    informationsSuggestedBreedDivElement.id = 'informations-suggested-breed'

    let h1Element = document.createElement('h1')
    h1Element.innerHTML = 'Doguinhos disponíveis para um lar'.toLocaleUpperCase()

    const iTagElement = document.createElement('i')
    let buttonRefreshElement = document.createElement('button')
    iTagElement.classList.add('fa-solid', 'fa-arrows-rotate')
    buttonRefreshElement.id = 'button-refresh'
    buttonRefreshElement.innerHTML = 'atualizar'
    buttonRefreshElement.onclick = reloadRandomImages

    informationsSuggestedBreedDivElement.appendChild(h1Element)
    informationsSuggestedBreedDivElement.appendChild(iTagElement)
    informationsSuggestedBreedDivElement.appendChild(buttonRefreshElement)
    
    suggestedBreedDivElement.appendChild(informationsSuggestedBreedDivElement)

  }

  let wrapBreedDetailsDivElement = document.createElement('div')
  wrapBreedDetailsDivElement.id = 'wrap-breed-details'

  let wrapBreedDetailsImgContentDivElement = document.createElement('div')
  wrapBreedDetailsImgContentDivElement.id = 'wrap-breed-details-img-content'


  // Aqui ele faz um loop para setar 3 cards com 3 caes diferente
  imgArr.forEach((img, i) => {
    let breedDetailsDivElement = document.createElement('div')
    breedDetailsDivElement.id = `breed-details-${i + 1}`

    const dogImg = document.createElement('img')
    dogImg.src = img
    dogImg.classList.add('img-class')

    breedDetailsDivElement.appendChild(dogImg)

    let treatedBreedName = img.split('/')[4].replace('-', ' ')
    let pTagElement = document.createElement('p')
    pTagElement.id = 'title-name-breed'
    pTagElement.innerHTML = capitalizeFirstLetter(treatedBreedName)
    
    breedDetailsDivElement.appendChild(pTagElement)

    let paragrafoTagElement = document.createElement('p')
    paragrafoTagElement.id = 'details-breed'
    paragrafoTagElement.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rutrum nibh ac justo pulvinar, sit amet pellentesque dui mattis. Aliquam aliquam commodo massa non feugiat. Sed ultrices urna a interdum.'

    breedDetailsDivElement.appendChild(paragrafoTagElement)
    
    let buttonTagElement = document.createElement('button')
    buttonTagElement.id = 'button-breed'
    buttonTagElement.innerHTML = 'Me Adote!'
    buttonTagElement.onclick = function () {
      location.href = "formulario-page.html";
    };

    breedDetailsDivElement.appendChild(buttonTagElement)
    
    breedDetailsDivElement.classList.add('nome-da-classe-pra-ficar-lado-a-lado')

    wrapBreedDetailsImgContentDivElement.appendChild(breedDetailsDivElement)
    
  })
  

  if (isReload) {
    wrapBreedDetailsImgContentDivElement.style.visibility = 'visible'
  }

  if (suggestedBreedDivElement == null) {
    suggestedBreedDivElement = document.getElementById('suggested-breed')
  }

  wrapBreedDetailsDivElement.appendChild(wrapBreedDetailsImgContentDivElement)
  suggestedBreedDivElement.appendChild(wrapBreedDetailsDivElement)
  mainDivElement.appendChild(suggestedBreedDivElement)
  
}

// esta função se encarrega de fazer o seletor de raças e tambem ao clicar a raça em especifico é escolhida
function loaderBreedsAsync () {
  const primaryDogBreedSelect = document.getElementById('primary-dog-breeds')

  fetch(breedUrlEndpoint)
  .then((res) => {return res.json()}) // pega o json
  .then((response) => {addBreedListItems(response.message, primaryDogBreedSelect)}) // chama a função que carrega a lista de breeds   
}

// função que faz parte do seletor, cliando na imagem 
function setBreedImage (e) {
  console.log(e.value)
  let treatedBreedName = e.value.split(' ')[0]
  const urlBreeds = `https://dog.ceo/api/breed/${treatedBreedName}/images/random`

  fetch(urlBreeds)
  .then((res) => {return res.json()}) // pega o json
  .then((response) => {imgDogBreeds.src = response.message})
}

// me tras tudo em maiusculo
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// coloco o codigo para dormir assim dando o tempo dele de carregar
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// aqui ao clicar tenho a função de me trazer novos caes aleatorio
function reloadRandomImages() {
  let suggestedBreedDivElement = document.getElementById('suggested-breed')

  let wrapBreedDetailsDivElement = document.getElementById('wrap-breed-details')

  // wrapBreedDetailsDivElement.style.visibility = 'hidden'

  suggestedBreedDivElement.removeChild(wrapBreedDetailsDivElement)
  loader.classList.toggle('hidden')
  main.classList.toggle('hidden')
  getRandomImages(true)
}

function addBreedListItems(itemObject, selectBreed) {
  const itemKeys = Object.keys(itemObject)
  itemKeys.forEach((item) => addBreedItem(item, itemObject[item], selectBreed))
}

// fazendo parte do select esta função faz que ele ordena os itens dentro dela
function addBreedItem(breed, subBreeds, selectBreed) {
  addBreed(breed, selectBreed)
  subBreeds.forEach((sb) => addBreed(`${breed} ${sb}`, selectBreed ))
}

// esta função faz que abra os valores das opções
function addBreed(breed, selectBreed) {
  const breedOption = document.createElement('option')
  breedOption.text = capitalizeFirstLetter(breed)
  breedOption.value = breed
  selectBreed.appendChild(breedOption)
}

// Startup function
getRandomImages()
loaderBreedsAsync()
const state = {

    breweries: [],
    filterType: null

}

function getBreweriesByState(userState) {

    fetch(`https://api.openbrewerydb.org/breweries?by_state=${userState}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            cleanData(data)
        })
}

function cleanData(data) {

    function filterByBreweryType(data) {
      if ((data['brewery_type'] === "micro") || (data['brewery_type'] === "regional") || (data['brewery_type'] === "brewpub")) {
        return true
      }
    }
    
    const validBreweries = data.filter(filterByBreweryType)        
    validBreweries.splice(10);

    state.breweries = validBreweries
    createBreweriesList()
}


function getUserState() {

    stateInputEl = document.querySelector('#select-state')
    stateFormEl = document.querySelector('#select-state-form')
    stateFormEl.addEventListener("submit", function(event) {
        event.preventDefault()
        const userState = stateInputEl.value;
        stateFormEl.reset()
        getBreweriesByState(userState)
    })
}

/* <aside class="filters-section">
  <h2>Filter By:</h2>
  <form id="filter-by-type-form" autocompete="off">
    <label for="filter-by-type"><h3>Type of Brewery</h3></label>
    <select name="filter-by-type" id="filter-by-type">
      <option value="">Select a type...</option>
      <option value="micro">Micro</option>
      <option value="regional">Regional</option>
      <option value="brewpub">Brewpub</option>
    </select>
  </form>
  <div class="filter-by-city-heading">
    <h3>Cities</h3>
    <button class="clear-all-btn">clear all</button>
  </div>
  <form id="filter-by-city-form">
    <input type="checkbox" name="chardon" value="chardon" /><label for="chardon"
      >Chardon</label
    ><input type="checkbox" name="cincinnati" value="cincinnati" /><label
      for="cincinnati"
      >Cincinnati</label
    >
    // More checkboxes
  </form>
</aside> */

function createFiltersAside() {

    mainEl = document.querySelector("main")

    asideFiltersEl = document.createElement('aside')
    asideFiltersEl.setAttribute('class', 'filters-section')

    titleEl = document.createElement('h2')
    titleEl.innerText = "Filter By:"

    formTypeEl = document.createElement('form')
    formTypeEl.setAttribute('id', 'filter-by-type-form')
    formTypeEl.setAttribute('autocomplete', 'off')
    formTypeEl.addEventListener("change", function () {
      filterTypeOfBrewery()
    })

    labelTypeEl = document.createElement('label')
    labelTypeEl.setAttribute('for', 'filter-by-type')

    labelTitleEl = document.createElement('h3')
    labelTitleEl.innerText = "Type of Brewery"

    labelTypeEl.append(labelTitleEl)

    selectTypeEl = document.createElement('select')
    selectTypeEl.setAttribute('name', 'filter-by-type')
    selectTypeEl.setAttribute('id', 'filter-by-type')
    
    optionSelectEl = document.createElement('option')
    optionSelectEl.setAttribute('value', '')
    optionSelectEl.innerText = 'Select a type...'

    optionMicro = document.createElement('option')
    optionMicro.setAttribute("value", 'micro')
    optionMicro.innerText = "Micro"

    optionRegional = document.createElement('option')
    optionRegional.setAttribute("value", 'regional')
    optionRegional.innerText = "Regional"

    optionBrewPub = document.createElement('option')
    optionBrewPub.setAttribute("value", 'brewpub')
    optionBrewPub.innerText = "Brewpub"

    selectTypeEl.append(optionSelectEl, optionMicro, optionRegional, optionBrewPub)
    
    formTypeEl.append(labelTitleEl, selectTypeEl)

    divCityHeadingEl = document.createElement('div')
    divCityHeadingEl.setAttribute('class', "filter-by-city-heading")

    h3CityEl = document.createElement('h3')
    h3CityEl.innerText = 'Cities'

    btnCityEl = document.createElement('button')
    btnCityEl.setAttribute('class', "clear-all-btn")
    btnCityEl.innerText = 'clear all'

    divCityHeadingEl.append(h3CityEl, btnCityEl)

    asideFiltersEl.append(formTypeEl, divCityHeadingEl)

    mainEl.append(asideFiltersEl)

}

function createListSection() {

    mainEl = document.querySelector('main')
    
    h1El = document.createElement('h1')
    h1El.innerText = 'List of Breweries'

    headerEl = document.createElement('header')
    headerEl.setAttribute('class', 'search-bar')

    formSearchEl = document.createElement('form')
    formSearchEl.setAttribute('id', "search-breweries-form")
    formSearchEl.setAttribute('autocomplete', 'off')

    labelSearchEl = document.createElement('label')
    labelSearchEl.setAttribute('for', "search-breweries")

    h2SearchEl = document.createElement('h2')
    h2SearchEl.innerText = "Search breweries:"

    labelSearchEl.append(h2SearchEl)

    inputSearchEl = document.createElement('input')
    inputSearchEl.setAttribute('id', "search-breweries")
    inputSearchEl.setAttribute('name', "search-breweries")
    inputSearchEl.setAttribute('type', "text")

    formSearchEl.append(labelSearchEl, inputSearchEl)

    headerEl.append(formSearchEl)

    articleEl = document.createElement('article')

    ulEl = document.createElement('ul')
    ulEl.setAttribute('class', "breweries-list")

    articleEl.append(ulEl)

    mainEl.append(h1El, headerEl, articleEl)

}

function renderBrewery(brewery) {

    liEl = document.createElement('li')

    h2NameEl = document.createElement('h2')
    h2NameEl.innerText = brewery.name

    divTypeEl = document.createElement('div')
    divTypeEl.setAttribute('class', "type")
    divTypeEl.innerText = brewery.brewery_type

    secAddressEl = document.createElement('section')
    secAddressEl.setAttribute('class', "address")

    h3AddressEl = document.createElement('h3')
    h3AddressEl.innerText = "address"

    pStreetEl = document.createElement('p')
    pStreetEl.innerText = brewery.street

    pCodeEl = document.createElement('p')

    strongEl = document.createElement('strong')
    strongEl.innerText = `${brewery.city}, ${brewery.postal_code}`

    pCodeEl.append(strongEl)

    secAddressEl.append(h3AddressEl, pStreetEl, pCodeEl)

    secPhoneEl = document.createElement('section')
    secPhoneEl.setAttribute('class', "phone")

    h3PhoneEl = document.createElement('h3')
    h3PhoneEl.innerText = 'Phone:'

    pPhoneEl = document.createElement('p')
    pPhoneEl.innerText = brewery.phone

    secPhoneEl.append(h3PhoneEl, pPhoneEl)

    secWebEl = document.createElement('section')
    secWebEl.setAttribute('class', "link")

    linkEl = document.createElement('a')
    linkEl.setAttribute('href', brewery.website_url)
    linkEl.setAttribute('target', "_blank")
    linkEl.innerText = 'Visit Website'

    secWebEl.append(linkEl)

    liEl.append(h2NameEl, divTypeEl, secAddressEl, secPhoneEl, secWebEl)

    return liEl
}



function filterTypeOfBrewery() {

  //Get user input
  selectBreweryTypeEl = document.querySelector('#filter-by-type')

  filterType = selectBreweryTypeEl.value
  state.filterType = filterType

  if (filterType !== null) {
    const relevantBreweries = state.breweries.filter(brewery => {
    return brewery.brewery_type === state.filterType
  })
  } else {
    const relevantBreweries = state.breweries
  }
}

function createBreweriesList() {

  articleEl = document.querySelector('article')

  ulEl = document.querySelector(".breweries-list")
  ulEl.innerHTML = ""

  const relevantBreweries = filterTypeOfBrewery()
  console.log(relevantBreweries)

  for (const brewery of relevantBreweries) {
      const liEl = renderBrewery(brewery)
      ulEl.append(liEl)
  }
  articleEl.append(ulEl)
}

createFiltersAside()
createListSection()
getUserState()
getBreweriesByState()

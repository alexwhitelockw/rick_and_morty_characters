function getRndInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
async function characterRandomiser () {

    let rndInt = await getRndInt(1, 20)

    let initialUrl = new URL("https://rickandmortyapi.com/api/character/");
    initialUrl.searchParams.set("page", rndInt)

    let cardArea = document.getElementById("cardArea");

    let fetchCall = await fetch(initialUrl.href)

    let fetchJson = await fetchCall.json()

    let fetchResults = await fetchJson.results

    fetchResults.map(x => {  // Fetch results is an array therefore mapping across each element

        let characterCard = document.createElement("div")
        characterCard.className = "card"
        characterCard.setAttribute("data-aos", "fade-up")
        characterCard.setAttribute("data-aos-duration", '2000')
        characterCard.innerHTML = `<img src=${x.image}>`

        let characterDetails = document.createElement("div")
        characterDetails.className = "details"
        characterDetails.innerHTML = `<h4>${x.name}</h4>
                                      <h4>${x.species}</h4>`

        if (x.status == 'Alive') {
            characterDetails.innerHTML += `<h5> <i class="fas fa-circle" id="aliveCircle"></i>  ${x.status}</h5>`
        }
        else if (x.status == 'Dead') {
            characterDetails.innerHTML += `<h5> <i class="fas fa-circle" id="deadCircle"></i>  ${x.status}</h5>`
        }
        else {
            characterDetails.innerHTML += `<h5> <i class="fas fa-circle" id="unknownCircle"></i>  ${x.status}</h5>`
        }

        characterCard.appendChild(characterDetails)
        cardArea.appendChild(characterCard)

    })
}


window.addEventListener("load", () => characterRandomiser())

document.getElementById("randomCharacter").addEventListener("click", () => characterRandomiser())
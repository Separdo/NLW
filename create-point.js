function populatesUFs() {
    const ufSelect = document.querySelector("select[name=uf]")


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}


populatesUFs()


function getCities(event) {
    const citiesSelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citiesSelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citiesSelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citiesSelect.disabled = false

        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// ìtens de coleta
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(event) {
    const itemLi = event.target

    //Adiciona ou remove
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados 

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado
    if (alreadySelected >= 0) {
        // tirar da seleção

        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent

        })
        selectedItems = filteredItems
    }
    else {
        // se não tiver selecionado
        //colocar na seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondido com os itens selecionado
    collectedItems.value = selectedItems

}


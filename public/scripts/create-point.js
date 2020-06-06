// Popular o select com todos os Estados
// Consumindo a API IBGE
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then((states) => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
}

populateUFs();

// Popular o select com todas as Cidades de acordo com o Estado
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    console.log(indexOfSelectedState);
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then((res) => { return res.json() })
        .then((cities) => {


            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;

        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Items de coleta
// Pegar todos os Li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

// Cria a variavel com o campo input hidden
const collectedItems = document.querySelector("input[name=items]");

// Coleção de dados dos items selecionados
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target;

    // Adicionar ou Remover Classe Selected
    itemLi.classList.toggle("selected");

    const itemId = event.target.dataset.id;

    // Verificar se existem itens selecionados.
    // Se SIM, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(function (item) {
        const itemFound = item == itemId; // Retorna true ou false
        return itemFound;
    });

    // Se já estiver selecionado, tirar da seleção (SelectedItems)
    if (alreadySelected >= 0) {
        // Tirar da seleção
        const filteredItems = selectedItems.filter(function (item) {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    } else {
        // Se não estiver selecionado, adicionar a seleção (SelectedItems)
        selectedItems.push(itemId);

    }

    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;

}
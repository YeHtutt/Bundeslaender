let bundeslaender = [];
let letters = [];


async function init() {
    let response = await fetch('./bundesland.json');
    bundeslaender = await response.json();
    render();
}

function render(filter) { //filter wird mit dem firstletter überladen
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        const bundesland = bundeslaender[i];
        const population = bundesland['population'];
        const firstletter = bundesland['name'].charAt(0);

        if (!filter || filter == firstletter) {  //Wenn keine Firstletter oder Firstletter gefunden-> soll dann dementsprechend bundesländer rendern
            content.innerHTML += generateBundeslaender(bundesland, population);
        }

        if (!letters.includes(firstletter)) {//Wenn im Array nicht da ist
            letters.push(firstletter); //sollen erste Buchstaben laden
        }

        renderletter();
    }
}

function generateBundeslaender(bundesland, population) {
    return /*html*/`
    <a class="card"> 
       <div><b> ${bundesland['name']} </b></div>
       <div> ${(population + '').replace('.', ',')} Millionen </div>
    </a>
    `;
}

function renderletter() {
    let letterbox = document.getElementById('letterbox');
    letterbox.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterbox.innerHTML += /*html*/`
        <a onclick="setfilter('${letter}')" class="letters"><b>${letter}</b></a>
        `; // ${letter} muss als string '', sonst erkennt JS keine Identität
    }
}

function setfilter(firstletter) { //erste Buchstabe wird mit onclick-fkt. übergeben
    render(firstletter); //Filter rendert nur die Bundesländer mit den ersten Buchstaben
}
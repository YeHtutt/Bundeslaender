let bundeslaender=[];
let letters=[];


async function init(){
    let response = await fetch('./bundesland.json');
    bundeslaender = await response.json();
    render();
}

function render(){
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        const bundesland = bundeslaender[i];
        const population = bundesland['population'];

        content.innerHTML += generateBundeslaender(bundesland, population);
    }
}

function generateBundeslaender(bundesland, population){
    return /*html*/`
    <div class="card"> 
       <div><b> ${bundesland['name']} </b></div>
       <div> ${(population+'').replace('.',',')} Millionen </div>
    </div>
    `;
}
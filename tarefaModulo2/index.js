import {promises as fs} from "fs";
// import fetch from "node-fetch";
import allStates from "../../Estados.json";
import allCities from "../../Cidades.json";

let globalAllDataCities = null;
let globalCity = [];
let globalName = [];

function fetchDataEstado() {
    let allData = allStates.map(data => {
        writeJson("estados", data);
    });
}

async function writeJson(local, data) {
    try {
        await fs.writeFile(`./${local}/${data.Sigla}.json`, JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}

function filterJsonCidade(UF) {
    let UFIndex = allStates.filter(id => {
        return id.Sigla === UF;
    })
    globalAllDataCities = allCities.filter(cities => {
        return cities.Estado === UFIndex[0].ID;
    })
    console.log(globalAllDataCities.length);
}

function filterJsonMaiorCity() {
    function maiorCityObject(uf, qtd) {
        this.uf = uf;
        this.qtd = qtd;
    }

    for (let i = 0; i < allStates.length; i++) {
        let allDataCities = allCities.filter(cities => {
            return cities.Estado == i+1;
        })

        let UFIndex = allStates.filter(id => {
            return id.ID == i+1;
        })
        
        globalCity.push(new maiorCityObject(UFIndex[0].Sigla, allDataCities.length));
    }

    globalCity.sort(function(a,b) {
        return a.qtd < b.qtd ? -1 : a.qtd > b.qtd ? 1 : 0;
    });
    
    console.log(
        globalCity[globalCity.length - 1].uf, 
        globalCity[globalCity.length - 1].qtd, 
        globalCity[globalCity.length - 2].uf, 
        globalCity[globalCity.length - 2].qtd, 
        globalCity[globalCity.length - 3].uf, 
        globalCity[globalCity.length - 3].qtd, 
        globalCity[globalCity.length - 4].uf, 
        globalCity[globalCity.length - 4].qtd, 
        globalCity[globalCity.length - 5].uf, 
        globalCity[globalCity.length - 5].qtd
    );
}

function filterJsonMenorCity() {
    console.log(
        globalCity[4].uf, 
        globalCity[4].qtd, 
        globalCity[3].uf, 
        globalCity[3].qtd, 
        globalCity[2].uf, 
        globalCity[2].qtd, 
        globalCity[1].uf, 
        globalCity[1].qtd, 
        globalCity[0].uf, 
        globalCity[0].qtd
    );
}

function filterMaiorName() {
    globalName = allStates;
    globalName.sort(function(a,b) {
        return a.Nome.length > b.Nome.length ? -1 : a.Nome.length < b.Nome.length ? 1 : 0;
    });
    console.log(globalName);
}

function filterMenorName() {
    globalName.sort(function(a,b) {
        return a.Nome.length < b.Nome.length ? -1 : a.Nome.length > b.Nome.length ? 1 : 0;
    });
    console.log(globalName);
}

function maiorNomeCidade() {
    console.log(globalName[globalName.length-1]);
}
function menorNomeCidade() {
    console.log(globalName[0]);
}

fetchDataEstado();
filterJsonCidade("RS");
filterJsonMaiorCity();
filterJsonMenorCity();
filterMaiorName();
filterMenorName();
maiorNomeCidade();
menorNomeCidade();
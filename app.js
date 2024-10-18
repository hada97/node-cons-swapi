// app.js
const axios = require('axios');
const readline = require('readline');

const baseURL = 'https://swapi.dev/api/';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fetchData(endpoint) {
    try {
        const response = await axios.get(`${baseURL}${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
    }
}

async function askUserForEndpoint() {
    return new Promise((resolve) => {
        console.log('\nEscolha uma categoria de Star Wars!:');
        console.log('1. people');
        console.log('2. planets');
        console.log('3. starships');
        console.log('4. vehicles');
        console.log('5. species');
        console.log('0. Sair');

        rl.question('Digite o número correspondente: ', (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    while (true) {
        const choice = await askUserForEndpoint();

        switch (choice) {
            case '1':
                const people = await fetchData('people/');
                console.log('People:', people);
                break;
            case '2':
                const planets = await fetchData('planets/');
                console.log('Planets:', planets);
                break;
            case '3':
                const starships = await fetchData('starships/');
                console.log('Starships:', starships);
                break;
            case '4':
                const vehicles = await fetchData('vehicles/');
                console.log('Vehicles:', vehicles);
                break;
            case '5':
                const species = await fetchData('species/');
                console.log('Species:', species);
                break;
            case '0':
                console.log('Saindo...');
                rl.close();
                return;
            default:
                console.log('Opção inválida. Tente novamente.');
        }
    }
}

main();

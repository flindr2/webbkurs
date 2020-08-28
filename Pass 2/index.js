const apiKey = 'C6E03519-1ECA-4132-90DE-D23949E129B0';
const url = 'http://rest.coinapi.io/v1/';
const currenciesToDisplay = ['USD', 'EUR', 'ETH', 'XRP', 'GDP', 'BTC'];
 
async function getExchangeRate(currency = 'BTC') {
    const response = await fetch(`${url}exchangerate/${currency}`, {
        method: 'GET',
        headers: {
            'X-CoinAPI-Key': apiKey
        }
    })
    
    if(response.ok) {
        return response.json();
    }
    else {
        throw new Error("Could not GET data.");
    }
}

function onClick() {
    let currency = document.getElementById("textInputCurrency").value;

    if(currency) {
        getExchangeRate(currency)
            .then(result => {
                const filteredRates = result.rates.filter(rate => currenciesToDisplay.includes(rate.asset_id_quote));
                
                rerenderTable(filteredRates);
            })
            .catch(error => console.error('There was a problem with the fetch operation: ', error));
    }
}

function rerenderTable(filteredRates) {
    // remove existing rows
    var tableBody = document.getElementById("ratesTableBody");
    // children is an HTMLCollection that needs to converted to an array 
    Array.from(tableBody.children).map(child => child.parentNode.removeChild(child));

    // add new rows
    filteredRates.map(rate => {
        var tr = document.createElement("tr");
        var tdAssetId = document.createElement("td");
        tdAssetId.innerText = rate.asset_id_quote;
        var tdRate = document.createElement("td");
        tdRate.innerText = rate.rate;
        var tdDate = document.createElement("td");
        tdDate.innerText = rate.time;
        tr.appendChild(tdAssetId);
        tr.appendChild(tdRate);
        tr.appendChild(tdDate);
        tableBody.appendChild(tr);
    });
}

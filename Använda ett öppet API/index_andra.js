"use strict";
const url = 'http://rest.coinapi.io/v1/exchangerate/';
const assetFilter = ['USD', 'EUR', 'GBP', 'XRP', 'ETH'];
const apiKey = 'C6E03519-1ECA-4132-90DE-D23949E129B0';

async function getExchangeRates(asset) {
    const response = await fetch(`${url}${asset}`, {
        method: "GET",
        headers: {
            'X-CoinAPI-Key': apiKey
        }
    });

    if(response.ok) {
        return response.json();
    }
    else {
        console.log("Hmm, fel");
    }
}


function onClick() {
    let asset = document.querySelector("#assetInput").value;

    getExchangeRates(asset)
        .then(data => {
            let filteredAssets = data.rates
            .filter(rate => assetFilter.includes(rate.asset_id_quote));
            rerenderTable(filteredAssets);
        }
    );
}

function rerenderTable(filteredAssets) {
    let tableBody = document.querySelector("#assetTable");

    tableBody.innerHTML = "";

    filteredAssets.forEach(asset => {
        let tableRow = document.createElement("tr");
        let tdAssetId = document.createElement("td");
        tdAssetId.innerText = asset.asset_id_quote;
        let tdRate = document.createElement("td");
        tdRate.innerText = typeof asset.rate === 'number' ? asset.rate.toFixed(2) : '';
        let tdTime = document.createElement("td");
        tdTime.innerText = new Date(asset.time).toDateString();
        tableRow.appendChild(tdAssetId);
        tableRow.appendChild(tdRate);
        tableRow.appendChild(tdTime);
        tableBody.appendChild(tableRow);
    });
}
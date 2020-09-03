let express = require('express');
let mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// lägg till middleware för att tolka body på HTTP-anrop
app.use(bodyParser.json());

// koppla upp mot databas
mongoose.connect("mongodb://localhost/currencyRates");

// skapa schema, schema styr strukturen och hur data ska se ut i collection
currencyRateSchema = mongoose.Schema({
    currency: String,
    rate: Number
});

// plugin för uppräknare när nya rates skrivs till databasen
currencyRateSchema.plugin(AutoIncrement, { inc_field: "id" })

// skapa model
let currencyRateModel = mongoose.model("currencyRate", currencyRateSchema);

app.get('/currencyRates', (request, response) => {
    currencyRateModel.find({}, (err, currencyRates) => {
        if(err) {
            response.send(err);
        }
        response.send(currencyRates);
    } )
})

app.get('/currencyRates/:id', (request, response) => {
    let currencyRateId = request.params.id;
    if(currencyRateId) {
        currencyRateModel.findOne({ id: currencyRateId }, (err, currencyRate) => {
            if(err) {
                response.send(err);
            }
            response.send(currencyRate);
        })
    }
})

app.post('/currencyRates', (request, response) => {
    let currencyRate = new currencyRateModel(request.body);
    currencyRate.save(function(err, currencyRate) {
        if(err) {
            response.send(err);
        }
        response.send(currencyRate);
    })
})

app.put('/currencyRates/:id', (request, response) => {
    currencyRateModel.findOneAndUpdate({ id: request.params.id }, request.body, (err, currencyRate) => {
        if(err) {
            response.send(err);
        }
        response.send("Currency rate updated.");
    } )
})

app.delete('/currencyRates', (request, response) => {
    response.send("Du har anropat delete-endpointen för /currencyRates");
})

// starta API och börja lyssna på anrop
app.listen(PORT, () => console.log(`Our API is running and listening on port ${PORT}`));
let mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

// skapa schema, schema styr strukturen och hur data ska se ut i collection
currencyRateSchema = mongoose.Schema({
    currency: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

// plugin för uppräknare när nya rates skrivs till databasen
currencyRateSchema.plugin(AutoIncrement, { inc_field: "id" })

// modelen är interfacet mot databasen för att göra queries, skapa, ändra, ta bort
let currencyRateModel = mongoose.model("currencyRate", currencyRateSchema);

module.exports = currencyRateModel;
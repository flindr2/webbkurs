let mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

// skapa schema, schema styr strukturen och hur data ska se ut i collection
currencyRateSchema = mongoose.Schema({
  currency: String,
  rate: Number,
});

// plugin för uppräknare när nya rates skrivs till databasen
currencyRateSchema.plugin(autoIncrement, { inc_field: "id" });

// skapa model
let currencyRateModel = mongoose.model("currencyRate", currencyRateSchema);

module.exports = currencyRateModel;

const currencyRateModel = require("../models/currencyRate");

const createRate = (request, response) => {
  let currencyRate = new currencyRateModel(request.body);
  currencyRate.save(function (err, currencyRate) {
    if (err) {
      response.send(err);
    }
    response.send(currencyRate);
  });
};

const getRate = (request, response) => {
  let currencyRateId = request.params.id;
  if (currencyRateId) {
    currencyRateModel.findOne({ id: currencyRateId }, (err, currencyRate) => {
      if (err) {
        response.send(err);
      }
      response.send(currencyRate);
    });
  }
};

const getRates = (request, response) => {
  currencyRateModel.find({}, (err, currencyRates) => {
    if (err) {
      response.send(err);
    }
    response.send(currencyRates);
  });
};

const updateRate = (request, response) => {
  currencyRateModel.findOneAndUpdate(
    { id: request.params.id },
    request.body,
    (err, currencyRate) => {
      if (err) {
        response.send(err);
      }
      response.send("Currency rate updated.");
    }
  );
};

const deleteRate = (request, response) => {
  currencyRateModel.remove({ id: request.params.id }, (err) => {
    if (err) {
      response.send(err);
    } else {
      response.send(
        `Currency rate with id ${request.params.id} was successfully deleted.`
      );
    }
  });
};

module.exports = { createRate, getRate, getRates, updateRate, deleteRate };

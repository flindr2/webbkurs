let express = require("express");
let mongoose = require("mongoose");
const { Router } = require('express');
const { withJWTAuthMiddleware } = require("express-kun");
const { createRate, getRate, getRates, updateRate, deleteRate } = require("./controllers/currencyRate");
const { createUser, login } = require("./controllers/user");

const router = Router();
const app = express();
const PORT = 3000;

// koppla upp mot databas
mongoose.connect("mongodb://localhost/currencyRates", { useNewUrlParser: true, useUnifiedTopology: true });

// lägg till middleware för att tolka body på HTTP-anrop
app.use(express.json());

const protectedRouter = withJWTAuthMiddleware(router, "yourSecretKey");

router.post("/users", createUser);
router.post("/users/login", login);

protectedRouter.get("/currencyRates", getRates);
protectedRouter.get("/currencyRates/:id", getRate);
protectedRouter.post("/currencyRates", createRate);
protectedRouter.put("/currencyRates/:id", updateRate);
protectedRouter.delete("/currencyRates/:id", deleteRate);

app.use(router);





// starta API och börja lyssna på anrop
app.listen(PORT, () =>
  console.log(`Our API is running and listening on port ${PORT}`)
);

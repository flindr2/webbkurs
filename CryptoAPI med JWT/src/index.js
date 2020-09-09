const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const { withJWTAuthMiddleware } = require("express-kun");
const {
  create,
  getRate,
  getRates,
  updateRate,
  deleteRate,
} = require("./controllers/currencyRate");
const { createUser, login } = require("./controllers/user");
const app = express();
const router = new Router();
const PORT = 3000;

// lägg till middleware för att tolka body på HTTP-anrop
app.use(express.json());

// koppla upp mot databas
mongoose.connect("mongodb://localhost/crypto", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.post("/users", createUser);
router.post("/users/login", login);

const protectedRouter = withJWTAuthMiddleware(router, "MYSECRETKEY");

protectedRouter.get("/currencyRates", getRates);
protectedRouter.get("/currencyRates/:id", getRate);
protectedRouter.post("/currencyRates", create);
protectedRouter.put("/currencyRates/:id", updateRate);
protectedRouter.delete("/currencyRates/:id", deleteRate);

app.use(router);

// starta API och börja lyssna på anrop
app.listen(PORT, () =>
  console.log(`Our API is running and listening on port ${PORT}`)
);

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5006;
const db = require("./src/db/connection");
const routes = require("./src/routes/inventory.routes");

db.query((err, results) => {
    if (err) {
      console.error('Query error:', err);
      return;
    }
    console.log('Query results:', results);
});

app.use(express.json());
app.use(cors());
app.use("/api/inventory", routes);

app.get("/", (req, res) => {
    console.log("inventory service is running");
    return res.json({message : "inventory service is running"});
})

app.listen(PORT, () => {
    console.log(`Inventory service is running at http://localhost:${PORT}/`)
})
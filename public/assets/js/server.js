const express = required("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.listen(PORT, () => console.log("App listening on PORT " + PORT));

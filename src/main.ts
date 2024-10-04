// src/main.ts

import app from "./infrastructure/webserver/express-app";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const server = require("./serverConfig");
const { PORT } = require("../config/globals");
const { getConnection } = require("../config/connection");
const logger = require("../utils/logger");

getConnection()
  .then((message) => {
    console.log(message);
    server.listen(PORT, () => console.info(`Servidor en el puerto ${PORT}`));
    server.on("error", (error) => console.error(error));
  })
  .catch((error) => console.log(error));

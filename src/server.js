import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import workspace_router from "./routes/workspace.route.js";
import express from "express";
import auth_router from "./routes/auth.router.js";
import UserRepository from "./repositories/user.repository.js";
import cors from "cors";
import authMiddleware from "./middlewares/auth.middleware.js";
import MemberWorkspaceRepository from "./repositories/memeberWorkspace.repository.js";

connectMongoDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/workspace", workspace_router);
app.use("/api/auth", auth_router);

//Constructor de middlewares personalizados
const randomMiddleware = (min_numero_random) => {
  return (request, response, next) => {
    const numero_random = Math.random();
    if (numero_random < min_numero_random) {
      response.send({ message: "Tienes mala suerte" });
    } else {
      request.tieneSuerte = true;
      next();
    }
  };
};

//Personalizar el randomMiddleware para que podamos configurar el numero minimo de suerte (0.5 por defecto)

app.get("/test", randomMiddleware(0.9), (request, response) => {
  console.log(request.tieneSuerte);
  response.send({
    ok: true,
  });
});

app.get("/ruta-protegida", authMiddleware, (request, response) => {
  console.log(request.user);
  response.send({
    ok: true,
  });
});

app.listen(8080, () => {
  console.log("Esto esta funcionado");
});

/* MemberWorkspaceRepository.create(
    '68d333697f90d40f450edb15', 
    '68b790eea6301ea1e4ac1727'
) */
MemberWorkspaceRepository.getAllWorkspacesByUserId("68d333697f90d40f450edb15");

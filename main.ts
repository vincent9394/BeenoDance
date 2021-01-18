import  express  from "express";
// import { Request, Response } from "express";
// import expressSession from "express-session";
import path from "path";
// import { isLoggedInHTML } from "./guards";

// import dotenv from "dotenv";
// dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add this line
// app.use(
//     expressSession({
//         secret: "Tecky Academy teaches typescript",
//         resave: true,
//         saveUninitialized: true,
//     })
// );

// import Knex from "knex";
// import * as knexConfig from "./knexfile";
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// const API_VERSION = "/api/v1";

// import { UserService } from "./services/UserService";
// import { UserController } from "./controllers/UserController";

// const userService = new UserService(knex);
// export const userController = new UserController(userService);

// import routes from "./routes";
// app.use(API_VERSION, routes);

// app.get(`${API_VERSION}/test`, function (req: Request, res: Response) {
//     res.json({ message: "Hello World" });
// });

// app.post(`${API_VERSION}/test`, function (req: Request, res: Response) {
//     console.log("test", req.body);
//     res.json({ message: "Hello World", body: req.body });
// });

app.use(express.static(path.join(__dirname, "public")));
//app.use(isLoggedInHTML, express.static(path.join(__dirname, "private")));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});


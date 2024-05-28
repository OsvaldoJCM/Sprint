import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import ticketRouter from "./tickets.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";
const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/tickets", ticketRouter);
apiRouter.use("/cookies", cookiesRouter);

apiRouter.use("/sessions", sessionsRouter);
export default apiRouter;
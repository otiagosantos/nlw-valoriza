import { Router } from "express";
import { CreateUserController } from "./src/controllers/CreateUserController";
import { CreateTagController } from "./src/controllers/CreateTagController";
import { ensureAdmin } from "./src/middlewares/ensureAdmin";
import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";
import { CreateComplimentController } from "./src/controllers/CreateComplimentController";
import { ensureAuthenticated } from "./src/middlewares/ensurAuthenticated";
import { ListSendComplimentsController } from "./src/controllers/ListSendComplimentsController";
import { ListReceiveComplimentsController } from "./src/controllers/ListReceiveCompleimentsController";
import { ListTagsController } from "./src/controllers/ListTagsController";
import { ListUsersController } from "./src/controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listSendComplimentsController = new ListSendComplimentsController();
const listReceiveComplimentsController = new ListReceiveComplimentsController();
const listUsersController = new ListUsersController();

router.get("/users", ensureAuthenticated, listUsersController.handle);
router.post('/user', createUserController.handle);

router.get("/tags", listTagsController.handle);
router.post("/tag", ensureAuthenticated, ensureAdmin, createTagController.handle);

router.post("/session", authenticateUserController.handle);

router.get('/compliments/sended', ensureAuthenticated, listSendComplimentsController.handle);
router.get('/compliments/received', ensureAuthenticated, listReceiveComplimentsController.handle);
router.post("/compliment/receive", ensureAuthenticated, createComplimentController.handle);

export { router }
import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllClientDeliveriesController } from "./modules/clients/useCases/findAllClientDeliveries/FindAllClientDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableDeliveriesController } from "./modules/deliveries/useCases/findAllAvailableDeliveries/FindAllAvailableDeliveriesController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliverymanDeliveriesController } from "./modules/deliveryman/useCases/findAllDeliverymanDeliveries/FindAllDeliverymanDeliveriesController";
import { ensureAuthenticateClient } from "./modules/middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./modules/middlewares/ensureAuthenticateDeliveryman";

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableDeliveriesController = new FindAllAvailableDeliveriesController();
const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

const findAllClientDeliveriesController = new FindAllClientDeliveriesController();
const findAllDeliverymanDeliveriesController = new FindAllDeliverymanDeliveriesController();

routes.post("/client/authenticate/", authenticateClientController.handle)
routes.post("/deliveryman/authenticate/", authenticateDeliverymanController.handle)

routes.post("/client/", createClientController.handle)
routes.post("/deliveryman/", createDeliverymanController.handle)

routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle)
routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllAvailableDeliveriesController.handle)
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)


routes.get("/client/deliveries", ensureAuthenticateClient, findAllClientDeliveriesController.handle)
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliverymanDeliveriesController.handle)

export { routes };
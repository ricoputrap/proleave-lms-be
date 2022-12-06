import { Express } from "express";
import routes from "../../../config/routes";
import { Route } from "../../types/config.types";

// connect all routes registered in the route list configuration
const connectRoutes = (app: Express) => {
  routes.forEach((route: Route) => {
    app.use(route.path, route.controller);
  })
}

export default connectRoutes;
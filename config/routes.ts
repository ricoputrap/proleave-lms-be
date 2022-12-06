import { Test } from "../src/controllers";
import { Route } from "../src/types/config.types";

const routes: Route[] = [
  { path: "/test", controller: Test() }
];

export default routes;
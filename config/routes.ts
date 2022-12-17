import { Feature, SubscriptionPlan, Test } from "../src/controllers";
import { Route } from "../src/types/config.types";

const routes: Route[] = [
  { path: "/test", controller: Test() },
  { path: "/v1/features", controller: Feature() },
  { path: "/v1/subscription-plans", controller: SubscriptionPlan() }
];

export default routes;
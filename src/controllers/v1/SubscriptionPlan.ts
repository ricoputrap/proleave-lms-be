import { Request, Response, Router } from "express";
import SubscriptionPlanService from "../../services/SubscriptionPlanService";
import { ReturnType } from "../../types/api.types";
import { getBadRequestResponse } from "../../utils/responseConstructor";
import { isArrayNumeric } from "../../utils/typeChecker";

const SubscriptionPlan = (): Router => {
  const router = Router();
  const service = new SubscriptionPlanService();

  // GET ALL SUBSCRIPTION PLANS
  router.get("/", async (req: Request, res: Response) => {
    const result: ReturnType = await service.getAllSubscriptionPlans();
    return res.status(result.code).json(result);
  });

  // ADD NEW SUBSCRIPTION PLAN
  router.post("/", async (req: Request, res: Response) => {
    const { name, featureIds } = req.body;

    // validate required data
    if (!name) {
      const result: ReturnType = getBadRequestResponse("The subscription plan name is required!");
      return res.status(result.code).json(result);
    }

    /** validate if all feature IDs are numbers (numeric) */
    if (!isArrayNumeric(featureIds)) {
      const message = "There is at least one feature ID that is not a number.";
      const result: ReturnType = getBadRequestResponse(message);
      return res.status(result.code).json(result);
    }

    const result: ReturnType = await service.addNewSubscriptionPlan(name, featureIds);
    return res.status(result.code).json(result);
  });

  return router;
}

export default SubscriptionPlan;
import { Request, Response, Router } from "express";
import SubscriptionPlanService from "../../services/SubscriptionPlanService";
import { ReturnType } from "../../types/api.types";

const SubscriptionPlan = (): Router => {
  const router = Router();
  const service = new SubscriptionPlanService();

  router.get("/", async (req: Request, res: Response) => {
    const result: ReturnType = await service.getAllSubscriptionPlans();
    return res.status(result.code).json(result);
  });

  return router;
}

export default SubscriptionPlan;
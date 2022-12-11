import { Request, Response, Router } from "express";

const SubscriptionPlan = (): Router => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    return res.json({ success: true, message: "hello" })
  });

  return router;
}

export default SubscriptionPlan;
import { Request, Response, Router } from "express";
import FeatureService from "../../services/FeatureService";

const Feature = () => {
  const router = Router();
  const service = new FeatureService();

  // GET ALL FEATURES
  router.get("/", async (req: Request, res: Response) => {
    const result = await service.getAllFeatures();
    return res.status(result.code).json(result);
  });

  return router;
}

export default Feature;
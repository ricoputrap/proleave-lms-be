import { Request, Response, Router } from "express";
import FeatureService from "../../services/FeatureService";
import { ReturnType } from "../../types/api.types";

const Feature = () => {
  const router = Router();
  const service = new FeatureService();

  // GET ALL FEATURES
  router.get("/", async (req: Request, res: Response) => {
    const result = await service.getAllFeatures();
    return res.status(result.code).json(result);
  });

  // ADD NEW FEATURE
  router.post("/", async (req: Request, res: Response) => {
    const { name } = req.body;

    // validate required data
    if (!name) {
      const result: ReturnType = {
        success: false,
        message: "The feature name is required!",
        code: 400
      }
      return res.status(result.code).json(result);
    }

    const result = await service.addNewFeature(name);
    return res.status(result.code).json(result);
  })

  return router;
}

export default Feature;
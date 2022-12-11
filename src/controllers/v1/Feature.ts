import { Request, Response, Router } from "express";
import FeatureService from "../../services/FeatureService";
import { ReturnType } from "../../types/api.types";
import { getBadRequestResponse } from "../../utils/responseConstructor";
import { isNumeric } from "../../utils/typeChecker";

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
      const result: ReturnType = getBadRequestResponse("The feature name is required!");
      return res.status(result.code).json(result);
    }

    const result = await service.addNewFeature(name);
    return res.status(result.code).json(result);
  });

  // EDIT FEATURE
  router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    // validate if the id is a number
    if (!isNumeric(id)) {
      const message: string = id + " is not a number. The feature ID must be a number.";
      const result: ReturnType = getBadRequestResponse(message);
      return res.status(result.code).json(result);
    }

    // validate required data
    if (!name) {
      const result: ReturnType = getBadRequestResponse("The feature name is required");
      return res.status(result.code).json(result);
    }

    const idNumber = parseInt(req.params.id);
    const result = await service.editFeature(idNumber, name);
    return res.status(result.code).json(result);
  });

  // DELETE FEATURE
  router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    // validate if the id is a number
    if (isNumeric(id)) {
      const message: string = id + " is not a number. The feature ID must be a number.";
      const result: ReturnType = getBadRequestResponse(message);
      return res.status(result.code).json(result);
    }

    const idNumber = parseInt(req.params.id);
    const result = await service.deleteFeature(idNumber);
    return res.status(result.code).json(result);
  })

  return router;
}

export default Feature;
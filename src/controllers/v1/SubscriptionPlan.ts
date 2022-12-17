import { Request, Response, Router } from "express";
import SubscriptionPlanService from "../../services/SubscriptionPlanService";
import { ReturnType } from "../../types/api.types";
import { ISubscriptionPlan } from "../../types/models.types";
import { getBadRequestResponse, getInternalServerErrorResponse } from "../../utils/responseConstructor";
import { isArrayNumeric, isNumeric, isUniqueNumbers } from "../../utils/typeChecker";

const SubscriptionPlan = (): Router => {
  const router = Router();
  const service = new SubscriptionPlanService();

  // GET ALL SUBSCRIPTION PLANS
  router.get("/", async (req: Request, res: Response) => {
    try {
      const result: ReturnType = await service.getAllSubscriptionPlans();
      return res.status(result.code).json(result);
    }
    catch (error: any) {
      const result: ReturnType = getInternalServerErrorResponse(error);
      return res.status(result.code).json(result);
    }
  });

  // ADD NEW SUBSCRIPTION PLAN
  router.post("/", async (req: Request, res: Response) => {
    try {
      const { name, featureIds } = req.body;

      // validate required data
      if (!name) {
        const result: ReturnType = getBadRequestResponse("The subscription plan name is required!");
        return res.status(result.code).json(result);
      }
  
      // validate if all feature IDs are numbers (numeric)
      if (!isArrayNumeric(featureIds)) {
        const message = "There is at least one feature ID that is not a number.";
        const result: ReturnType = getBadRequestResponse(message);
        return res.status(result.code).json(result);
      }
  
      // validate if all IDs are unique
      if (!isUniqueNumbers(featureIds)) {
        const message = "There are duplicate IDs.";
        const result: ReturnType = getBadRequestResponse(message);
        return res.status(result.code).json(result);
      }
  
      const result: ReturnType = await service.addNewSubscriptionPlan(name, featureIds);
      return res.status(result.code).json(result);
    }
    catch (error: any) {
      const result: ReturnType = getInternalServerErrorResponse(error);
      return res.status(result.code).json(result);
    }
  });

  // EDIT SUBSCRIPTION PLAN
  router.patch("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, featureIds } = req.body;
  
      // validate if the id is a number
      if (!isNumeric(id)) {
        const message: string = id + " is not a number. The subscription plan ID must be a number.";
        const result: ReturnType = getBadRequestResponse(message);
        return res.status(result.code).json(result);
      }
  
      // validate the required data
      if (!name && !featureIds) {
        const message = "The updated `name` OR `featureIds` should be provided.";
        const result: ReturnType = getBadRequestResponse(message);
        return res.status(result.code).json(result);
      }
  
      if (!!featureIds) {
        // validate if all feature IDs are numbers (if any)
        if (!isArrayNumeric(featureIds)) {
          const message = "There is at least one feature ID that is not a number.";
          const result: ReturnType = getBadRequestResponse(message);
          return res.status(result.code).json(result); 
        }
    
        // validate if all IDs are unique
        if (!isUniqueNumbers(featureIds)) {
          const message = "There are duplicate IDs.";
          const result: ReturnType = getBadRequestResponse(message);
          return res.status(result.code).json(result);
        }
      }
  
      const _id: number = parseInt(id);
      const updatedValue: ISubscriptionPlan = {
        ...req.body,
        _id
      }
      const result: ReturnType = await service.editSubscriptionPlan(_id, updatedValue);
      return res.status(result.code).json(result);
    }
    catch (error: any) {
      const result: ReturnType = getInternalServerErrorResponse(error);
      return res.status(result.code).json(result);
    }
  });

  // DELETE SUBSCRIPTION PLAN
  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // validate if the id is a number
      if (!isNumeric(id)) {
        const message: string = id + " is not a number. The subscription plan ID must be a number.";
        const result: ReturnType = getBadRequestResponse(message);
        return res.status(result.code).json(result);
      }

      const idNumber: number = parseInt(req.params.id);
      const result: ReturnType = await service.deleteSubscriptionPlan(idNumber);
      return res.status(result.code).json(result);
    }
    catch (error: any) {
      const result: ReturnType = getInternalServerErrorResponse(error);
      return res.status(result.code).json(result);
    }
  })

  return router;
}

export default SubscriptionPlan;
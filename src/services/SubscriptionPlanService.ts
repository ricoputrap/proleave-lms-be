import SubscriptionPlanRepository from "../repository/SubscriptionPlanRepository";
import { ReturnType } from "../types/api.types";
import { ISubscriptionPlan } from "../types/models.types";
import { getInternalServerErrorResponse, getSuccessResponse } from "../utils/responseConstructor";
import Service from "./Service";

class SubscriptionPlanService extends Service {
  private repository: SubscriptionPlanRepository;

  public constructor() {
    super();
    this.repository = new SubscriptionPlanRepository();
  }

  getAllSubscriptionPlans = async (): Promise<ReturnType> => {
    try {
      const plans: ISubscriptionPlan[] = await this.repository.getAllSubscriptionPlans();
      const result: ReturnType = getSuccessResponse(plans);
      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }
}

export default SubscriptionPlanService;
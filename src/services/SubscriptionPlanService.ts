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

  addNewSubscriptionPlan = async (name: string, featureIds: number[]): Promise<ReturnType> => {
    try {
      /** @TODO validate duplication by the name */
      // validate duplication
      // const duplicationCheck: ReturnType = await this._va(name);
      // if (!duplicationCheck.success)
      //   return duplicationCheck;

      // get multiple feature by the IDs -> `features`
      // -> validate if `features.length === featureIds.length`
      // -> pass `features` as the last param in `addNewSubscriptionPlan`

      const plan: ISubscriptionPlan = await this.repository.addNewSubscriptionPlan(name, featureIds);
      const result: ReturnType = getSuccessResponse(plan);
      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }
}

export default SubscriptionPlanService;
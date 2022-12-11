import SubscriptionPlanModel from "../models/SubscriptionPlanModel";
import { ISubscriptionPlan } from "../types/models.types";
import { stringToHash } from "../utils/hashing";

class SubscriptionPlanRepository {

  getAllSubscriptionPlans = async (): Promise<ISubscriptionPlan[]> => {
    try {
      const plans: ISubscriptionPlan[] = await SubscriptionPlanModel.find();
      return plans;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("getAllSubscriptionPlans - message:", message);
      throw message;
    }
  }

  /**
   * @todo add `features` as the last parameter
   */
  addNewSubscriptionPlan = async (name: string, featureIds: number[]): Promise<ISubscriptionPlan> => {
    try {
      const _id: number = stringToHash(name);
      const plan: ISubscriptionPlan = await SubscriptionPlanModel.create({
        _id,
        name,
        featureIds
      });
      return plan;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("addNewSubscriptionPlan - message:", message);
      throw message;
    }
  }
}

export default SubscriptionPlanRepository;
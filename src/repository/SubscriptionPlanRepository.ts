import SubscriptionPlanModel from "../models/SubscriptionPlanModel";
import { DeleteReturnType } from "../types/api.types";
import { IFeature, ISubscriptionPlan } from "../types/models.types";
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

  getSingleItem = async (filter: any): Promise<ISubscriptionPlan | null> => {
    try {
      const plan: ISubscriptionPlan | null = await SubscriptionPlanModel.findOne(filter);
      return plan;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("getSingleItem - message:", message);
      throw message;
    }
  }

  addNewSubscriptionPlan = async (name: string, featureIds: number[], features: IFeature[]): Promise<ISubscriptionPlan> => {
    try {
      const _id: number = stringToHash(name);
      const plan: ISubscriptionPlan = await SubscriptionPlanModel.create({
        _id,
        name,
        featureIds,
        features
      });
      return plan;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("addNewSubscriptionPlan - message:", message);
      throw message;
    }
  }

  editSubscriptionPlan = async (_id: number, data: ISubscriptionPlan ): Promise<ISubscriptionPlan | null | undefined> => {
    try {
      const filter = { _id };

      const updatedPlan: ISubscriptionPlan | null = await SubscriptionPlanModel.findOneAndUpdate(filter, data);
      if (!!updatedPlan) {
        if (!!data.name) updatedPlan.name = data.name;
        if (!!data.featureIds) updatedPlan.featureIds = data.featureIds;
        if (!!data.features) updatedPlan.features = data.features;
      }

      return updatedPlan;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("editSubscriptionPlan - message:", message);
      throw message;
    }
  }

  deleteSubscriptionPlan = async (_id: number):  Promise<DeleteReturnType> => {
    try {
      const filter = { _id };
      const res: DeleteReturnType = await SubscriptionPlanModel.deleteOne(filter);
      return res;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("deleteSubscriptionPlan - message:", message);
      throw message;
    }
  }
}

export default SubscriptionPlanRepository;
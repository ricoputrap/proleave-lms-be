import FeatureRepository from "../repository/FeatureRepository";
import SubscriptionPlanRepository from "../repository/SubscriptionPlanRepository";
import { ReturnType } from "../types/api.types";
import { IFeature, ISubscriptionPlan } from "../types/models.types";
import { getBadRequestResponse, getInternalServerErrorResponse, getSuccessResponse } from "../utils/responseConstructor";
import Service from "./Service";

class SubscriptionPlanService extends Service {
  private repository: SubscriptionPlanRepository;
  private featureRepository: FeatureRepository;

  public constructor() {
    super();
    this.repository = new SubscriptionPlanRepository();
    this.featureRepository = new FeatureRepository();
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


      let features: IFeature[] = [];

      // validate if all feature IDs are valid
      if (featureIds.length > 0) {
        const filter = {
          _id: {
            $in: featureIds
          }
        }
        features = await this.featureRepository.getMultipleFeatures(filter);

        if (featureIds.length !== features.length) {
          return getBadRequestResponse("There is at least one invalid feature ID.");
        }
      }

      const plan: ISubscriptionPlan = await this.repository.addNewSubscriptionPlan(name, featureIds, features);
      const result: ReturnType = getSuccessResponse(plan);
      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }
}

export default SubscriptionPlanService;
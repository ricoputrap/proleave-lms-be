import FeatureModel from "../models/FeatureModel";
import { IFeature } from "../types/models.types";

class FeatureRepository {
  
  getAllFeatures = async (): Promise<IFeature[]> => {
    try {
      const features: IFeature[] = await FeatureModel.find();
      return features;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("getAllFeatures - message:", message);
      throw message;
    }
  }
}

export default FeatureRepository;
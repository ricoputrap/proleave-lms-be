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

  addNewFeature = async (name: string): Promise<IFeature> => {
    try {
      const feature: IFeature = await FeatureModel.create({ name });
      return feature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("addNewFeature - message:", message);
      throw message;
    }
  }
}

export default FeatureRepository;
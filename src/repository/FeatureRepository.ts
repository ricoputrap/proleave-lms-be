import FeatureModel from "../models/FeatureModel";
import { IFeature } from "../types/models.types";
import { stringToHash } from "../utils/hashing";

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
      const _id: number = stringToHash(name);
      const feature: IFeature = await FeatureModel.create({ _id, name });
      return feature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("addNewFeature - message:", message);
      throw message;
    }
  }

  editFeature = async (_id: number, name: string): Promise<IFeature | null | undefined> => {
    try {
      const filter = { _id };
      const value = { name };
      
      const updatedFeature: IFeature | null = await FeatureModel.findOneAndUpdate(filter, value);
      if (!!updatedFeature) updatedFeature.name = name;

      return updatedFeature;
      // return doc;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("editFeature - message:", message);
      throw message;
    }
  }
}

export default FeatureRepository;
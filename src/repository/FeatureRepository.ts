import FeatureModel from "../models/FeatureModel";
import { DeleteReturnType, FeatureFilterType } from "../types/api.types";
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

  getSingleFeature = async (filter: FeatureFilterType): Promise<IFeature | null> => {
    try {
      const feature: IFeature | null = await FeatureModel.findOne(filter);
      return feature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("getSingleFeature - message:", message);
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
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("editFeature - message:", message);
      throw message;
    }
  }

  deleteFeature = async (_id: number): Promise<DeleteReturnType> => {
    try {
      const filter = { _id };
      const res: DeleteReturnType = await FeatureModel.deleteOne(filter);
      return res;
    }
    catch (error: any) {
      const message = (error as Error).message;
      console.error("deleteFeature - message:", message);
      throw message;
    }
  }
}

export default FeatureRepository;
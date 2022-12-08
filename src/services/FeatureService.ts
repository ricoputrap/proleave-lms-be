import FeatureRepository from "../repository/FeatureRepository";
import { ReturnType } from "../types/api.types";
import { IFeature } from "../types/models.types";

class FeatureService {
  private repository: FeatureRepository;

  public constructor() {
    this.repository = new FeatureRepository();
  }

  getAllFeatures = async (): Promise<ReturnType> => {
    try {
      const features: IFeature[] = await this.repository.getAllFeatures();

      return {
        success: true,
        data: features,
        code: 200
      }
    }
    catch (error: any) {
      return {
        success: false,
        message: error,
        code: 500
      }
    }
  }

  addNewFeature = async (name: string): Promise<ReturnType> => {
    try {
      const feature: IFeature = await this.repository.addNewFeature(name);

      return {
        success: true,
        data: feature,
        code: 200
      }
    }
    catch (error: any) {
      return {
        success: false,
        message: error,
        code: 500
      }
    } 
  }

  editFeature = async (id: number, name: string): Promise<ReturnType> => {
    try {
      const updatedFeature: IFeature | null | undefined = await this.repository.editFeature(id, name);
      
      if (!updatedFeature) {
        return {
          success: false,
          message: "Feature with id " + id + " doesn't exist",
          code: 404
        }
      }

      return {
        success: true,
        data: updatedFeature,
        code: 200
      }
    }
    catch (error: any) {
      return {
        success: false,
        message: error,
        code: 500
      }
    }
  }
}

export default FeatureService;
import FeatureRepository from "../repository/FeatureRepository";
import { ReturnType } from "../types/api.types";
import { IFeature } from "../types/models.types";
import Service from "./Service";

class FeatureService extends Service {
  private repository: FeatureRepository;

  public constructor() {
    super();
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
      // validate duplication
      const duplicationCheck: ReturnType = await this._validateDuplication(name);
      if (!duplicationCheck.success)
        return duplicationCheck;

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
      // validate if the updated name is already used by another feature
      const duplicationCheck: ReturnType = await this._validateDuplication(name, id);
      if (!duplicationCheck.success)
        return duplicationCheck;

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

  /**
   * Validate if a db record/document with the same name already exists
   * @param name the name of the record/document (Feature object)
   * @param exludedID id of a document that will be excluded in the validation process
   * @returns an object of ReturnType
   */
  private async _validateDuplication(name: string, exludedID: number = -1): Promise<ReturnType> {
    try {
      const filter: any = { name };
      if (exludedID !== -1) {
        filter._id = { $ne: exludedID }
      }

      let result: ReturnType = { success: true, code: 200 };
      const exists: boolean = await this.checkIfExist(
        this.repository.getSingleFeature,
        filter
      );

      // there is no duplication
      if (!exists) return result;

      result = {
        success: false,
        code: 400,
        message:  `A feature with the name '${name}' already exists.`
      }
      return result;
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
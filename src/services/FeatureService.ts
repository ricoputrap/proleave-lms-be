import FeatureRepository from "../repository/FeatureRepository";
import { DeleteReturnType, ReturnType } from "../types/api.types";
import { IFeature } from "../types/models.types";
import { getBadRequestResponse, getInternalServerErrorResponse, getNotFoundResponse, getSuccessResponse } from "../utils/responseConstructor";
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
      const result: ReturnType = getSuccessResponse(features);
      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }

  addNewFeature = async (name: string): Promise<ReturnType> => {
    try {
      // validate duplication
      const duplicationCheck: ReturnType = await this._validateDuplication(name);
      if (!duplicationCheck.success)
        return duplicationCheck;

      const feature: IFeature = await this.repository.addNewFeature(name);
      const result: ReturnType = getSuccessResponse(feature);
      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
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
        return getNotFoundResponse("Feature with id " + id + " doesn't exist");
      }
      
      return getSuccessResponse(updatedFeature);
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }

  deleteFeature = async (id: number): Promise<ReturnType> => {
    try {
      const res: DeleteReturnType = await this.repository.deleteFeature(id);
      
      // feature record/doc doesn't exist
      if (!res.deletedCount || res.deletedCount == 0) {
        const errorMessage = `A feature with ID '${id}' doesn't exist.`;
        const result: ReturnType = getNotFoundResponse(errorMessage);
        return result;
      }

      return getSuccessResponse();
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
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

      result = getBadRequestResponse(`A feature with the name '${name}' already exists.`);
      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }
}

export default FeatureService;
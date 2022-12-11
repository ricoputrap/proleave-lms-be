import { FGetSingleItem } from "../types/api.types";

class Service {
  protected async checkIfExist<T>(
    getSingleItem: FGetSingleItem<T>,
    filter: any
  ): Promise<boolean> {
    try {
      const item: T | null = await getSingleItem(filter);
      return item !== null;
    }
    catch (error: any) {
      return false;
    }
  }
}

export default Service;
import { SuperTest, Test } from "supertest";
import { STATUS_CODES } from "../../../constants/api.enum";
import { IFeature } from "../../../types/models.types";

const getSingleBasic = (request: SuperTest<Test>) => {
  test("Should get a single feature", () => {
    const featureID = 365699060;

    return request
      .get("/v1/features/" + featureID)
      .expect(STATUS_CODES.OK)
      .then(res => {
        // the response is not empty
        expect(res.body).toBeDefined();

        // validate the response success flag & status code
        expect(res.body.success).toBe(true);
        expect(res.body.code).toBe(STATUS_CODES.OK);
        expect(res.statusCode).toBe(STATUS_CODES.OK);

        // validate the data sent in the response body
        const feature: IFeature = res.body.data;
        expect(feature).toBeInstanceOf(Object);

        // validate the data structure of feature objects in `data`
        const requiredKeys: string[] = ["_id", "name"];
        const itemKeys: string[] = Object.keys(feature);
        expect(itemKeys).toEqual(expect.arrayContaining(requiredKeys));

        // validate data type of each keys
        expect(typeof parseInt(feature._id + "")).toBe("number");
        expect(typeof feature.name).toBe("string");
      });
  });
}

export default getSingleBasic;
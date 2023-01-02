import { SuperTest, Test } from "supertest";
import { STATUS_CODES } from "../../../constants/api.enum";
import { IFeature } from "../../../types/models.types";

const addBasic = (request: SuperTest<Test>) => {
  const newData = {
    name: "Feature POST BASIC"
  };
  let newFeatureID: number = -1;

  describe("Add New Feature - BASIC", () => {
    test("Add new feature with basic setup should be success.", () => {
      return request
        .post("/v1/features")
        .send(newData)
        .expect(STATUS_CODES.CREATED)
        .then(res => {
          // the response is not empty
          expect(res.body).toBeDefined();
  
          // validate the response success flag & status code
          expect(res.body.success).toBe(true);
          expect(res.body.code).toBe(STATUS_CODES.CREATED);
          expect(res.statusCode).toBe(STATUS_CODES.CREATED);
  
          // validate the data structure of the new feature object in `data`
          const data = res.body.data;
          expect(data.name).toBe(newData.name);
          expect(data._id).toBeDefined();
          expect(typeof data._id).toBe("number");
  
          newFeatureID = data._id;
        });
    });
  
    afterAll(async () => {
      if (newFeatureID !== -1) {
        const PATH = `/v1/features/${newFeatureID}`;

        // validate if the new feature exists and correct
        const res = await request.get(PATH);
        
        // the response is not empty
        expect(res.body).toBeDefined();
  
        // validate the response success flag & status code
        expect(res.body.success).toBe(true);
        expect(res.body.code).toBe(STATUS_CODES.OK);
        expect(res.statusCode).toBe(STATUS_CODES.OK);

        // validate the data structure of the new feature object in `data`
        const feature: IFeature = res.body.data;
        expect(feature._id).toBe(newFeatureID);
        expect(feature.name).toBe(newData.name);
        
        // delete the newly created feature in DB
        return request.delete(PATH);
      }
    });
  })
}

export default addBasic;
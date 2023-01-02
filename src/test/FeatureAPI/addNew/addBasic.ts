import { SuperTest, Test } from "supertest";
import { STATUS_CODES } from "../../../constants/api.enum";

const addBasic = (request: SuperTest<Test>) => {
  const body = { name: "Feature POST BASIC" };
  let newFeatureID: number = -1;

  describe("POST - Add New Feature - BASIC", () => {
    it("Add new feature with basic setup should be success.", () => {
      return request
        .post("/v1/features")
        .send(body)
        .then(res => {
          // the response is not empty
          expect(res.body).toBeDefined();
  
          // validate the response success flag & status code
          expect(res.body.success).toBe(true);
          expect(res.body.code).toBe(STATUS_CODES.OK);
          expect(res.statusCode).toBe(STATUS_CODES.OK);
  
          // validate the data structure of the new feature object in `data`
          const data = res.body.data;
          expect(data.name).toStrictEqual(body.name);
          expect(data._id).toBeDefined();
          expect(typeof data._id).toBe("number");
  
          newFeatureID = data._id;
        });
    });
  
    // delete the newly created feature in DB
    afterEach(() => {
      if (newFeatureID !== -1) {
        return request.delete(`/v1/features/${newFeatureID}`);
      }
    });
  })
}

export default addBasic;
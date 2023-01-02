import { SuperTest, Test } from "supertest";
import { STATUS_CODES } from "../../../constants/api.enum";

const addWithoutName = (request: SuperTest<Test>) => {
  describe("Add New Feature - WITHOUT NAME", () => {
    test("Add a new feature without a request body should be failed.", () => {
      return request
        .post("/v1/features")
        .then(res => {
          // the response is not empty
          expect(res.body).toBeDefined();
  
          // validate the response success flag & status code
          expect(res.body.success).toBe(false);
          expect(res.body.code).toBe(STATUS_CODES.BAD_REQUEST);
          expect(res.statusCode).toBe(STATUS_CODES.BAD_REQUEST);

          // validate the error message
          expect(res.body.message).toBeTruthy();
          expect(res.body.message).toBe("The feature name is required!");
        })
    })

    test("Add a new feature without a name in the request body should be failed.", () => {
      const body = {};

      return request
        .post("/v1/features")
        .send(body)
        .then(res => {
          // the response is not empty
          expect(res.body).toBeDefined();
  
          // validate the response success flag & status code
          expect(res.body.success).toBe(false);
          expect(res.body.code).toBe(STATUS_CODES.BAD_REQUEST);
          expect(res.statusCode).toBe(STATUS_CODES.BAD_REQUEST);

          // validate the error message
          expect(res.body.message).toBeTruthy();
          expect(res.body.message).toBe("The feature name is required!");
        })
    })

    test("Add a new feature with an empty name should be failed.", () => {
      const body = { name: "" };

      return request
        .post("/v1/features")
        .send(body)
        .then(res => {
          // the response is not empty
          expect(res.body).toBeDefined();
  
          // validate the response success flag & status code
          expect(res.body.success).toBe(false);
          expect(res.body.code).toBe(STATUS_CODES.BAD_REQUEST);
          expect(res.statusCode).toBe(STATUS_CODES.BAD_REQUEST);

          // validate the error message
          expect(res.body.message).toBeTruthy();
          expect(res.body.message).toBe("The feature name is required!");
        })
    })
  })
}

export default addWithoutName;
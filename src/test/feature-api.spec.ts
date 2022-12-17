import supertest, { SuperTest, Test } from "supertest";
import { HOST } from "../../config/env";
import { STATUS_CODES } from "../constants/api.enum";
import { IFeature } from "../types/models.types";

const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER
} = STATUS_CODES;

const request: SuperTest<Test> = supertest(HOST);

describe("Features API", () => {
  it("GET - Get Users", () => {
    return request
      .get("/v1/features")
      .expect(200)
      .then((res) => {
        // the response is not empty
        expect(res.body).toBeDefined();

        // validate the response success flag & status code
        expect(res.body.success).toBe(true);
        expect(res.body.code).toBe(OK);
        expect(res.statusCode).toBe(OK);

        // validate the data sent in the response body
        expect(res.body.data).toBeInstanceOf(Array);

        // validate the data structure of feature objects in `data`
        const requiredKeys: string[] = ["_id", "name"];
        res.body.data.forEach((item: IFeature) => {
          const itemKeys = Object.keys(item);
          expect(itemKeys).toEqual(expect.arrayContaining(requiredKeys));
        });
      })
  });
});
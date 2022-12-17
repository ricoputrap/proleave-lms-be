import { SuperTest, Test } from "supertest";
import { STATUS_CODES } from "../../constants/api.enum";

const runPostTests = (request: SuperTest<Test>) => {
  postBasic(request);
}

const postBasic = (request: SuperTest<Test>) => {
  it("POST - Add New Feature - success", () => {
    const now: number = new Date().getTime();
    const data = { name: `Feature ${now}` };

    return request
      .post("/v1/features")
      .send(data)
      .then(res => {
        // the response is not empty
        expect(res.body).toBeDefined();

        // validate the response success flag & status code
        expect(res.body.success).toBe(true);
        expect(res.body.code).toBe(STATUS_CODES.OK);
        expect(res.statusCode).toBe(STATUS_CODES.OK);

        // validate the data structure of the new feature object in `data`
        expect(res.body.data.name).toStrictEqual(data.name);
        expect(res.body.data._id).toBeDefined();
        expect(typeof res.body.data._id).toBe("number");
      });
  })
}

export default runPostTests;
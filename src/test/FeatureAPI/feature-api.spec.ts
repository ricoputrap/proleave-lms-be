import supertest, { SuperTest, Test } from "supertest";
import { HOST } from "../../../config/env";
import runAddNewTests from "./addNew";
import runGetAllTests from "./getAll";
import runGetSingleTests from "./getSingle";

const request: SuperTest<Test> = supertest(HOST);

describe("Features API", () => {
  runGetAllTests(request);
  runGetSingleTests(request);
  runAddNewTests(request);
});
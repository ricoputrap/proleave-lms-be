import { Request, Response, Router } from "express";

const Test = () => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "SUCCESS",
      code: 200
    });
  });

  return router;
}

export default Test;
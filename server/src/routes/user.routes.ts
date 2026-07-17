import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const user = req.body;

    console.log(user);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;
import TextData from "../models/testingModel.js";

export const getReq = async (req, res) => {
  const data = await TextData.find();

  res.status(200).json({
    success: true,
    data,
  });
};

export const postReq = async (req, res) => {
  const data = new TextData(req.body);
  const savedData = await data.save();
  if (!savedData) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
  res.status(200).json({
    success: true,
    savedData,
  });
};

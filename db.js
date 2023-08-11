import mongoose from "mongoose";

export const mongodbConnection = (uri) => {
  mongoose
    .connect(uri)
    .then((conData) => {
      console.log(
        `👼 mongodb connect successfully on ${conData.connection.host}:${conData.connection.port}`
      );
    })
    .catch((err) => {
      console.log(`💥💥 Error : ${err}`);
    });
};

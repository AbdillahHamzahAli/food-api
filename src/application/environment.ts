import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const MYENV = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

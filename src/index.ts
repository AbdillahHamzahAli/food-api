import app from "./application/web";
import { logger } from "./application/logging";

app.listen(3000, () => {
  logger.info("Server is running on port 3000");
});

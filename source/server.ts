import express, { Express, Request, Response, NextFunction } from "express";
import routes from "./routes/productsRoutes";
import dotenv from "dotenv";

const app: Express = express();

dotenv.config();

// JSON body parser
app.use(express.json());

app.use("/", routes);

// Error handling
app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
  const { message } = err;
  console.log(message);
  res.status(400).send(message);
});

const PORT: any = process.env.PORT ?? 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

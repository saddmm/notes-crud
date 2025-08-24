import { DataSource } from "typeorm";
import 'dotenv/config'
import { Note } from "./entities/note.entity";
import { User } from "./entities/user.entity";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Note, User],
})
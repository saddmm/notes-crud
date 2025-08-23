import { DataSource } from "typeorm";
import 'dotenv/config'
import { Note } from "./entities/NoteEntity";
import { User } from "./entities/UserEntity";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Note, User],
})
import { getPool, NotFoundException } from "../db";
import { CreateUser } from "./commands/create_user";
import { User } from "./models/user";

export async function getById (id: string) {
  const result =
    await getPool()
      .query(`SELECT * FROM ${User.tableName} WHERE id = $1`, [id]);

  if (!result.rowCount) {
    throw new NotFoundException(User.tableName, id);
  }

  return User.parse(result.rows[0]);
}

export async function listAll() {
  const result =
    await getPool()
      .query(`SELECT * FROM ${User.tableName}`);

  return result.rows.map(obj => User.parse(obj));
}


export async function insert(params: CreateUser) {
  const result =
    await getPool()
      .query(
        `INSERT INTO ${User.tableName}(email, firstname, lastname) VALUES($1, $2, $3) RETURNING *`,
        [params.email, params.firstname, params.lastname]
      );

  return User.parse(result.rows[0]);
}

export default {
  getById,
  listAll,
  insert
};

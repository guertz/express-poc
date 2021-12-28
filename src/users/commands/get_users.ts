import { ICommand } from "../../core";
import Repo from "../repository";

export class GetUsers extends ICommand {

  public static doCreate(): GetUsers {
    return {};
  }

  public static doValidate() {

  }

  public static async doExecute() {
    const res = await Repo.listAll()
    return { users: res };
  }
}

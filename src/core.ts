import express from "express";

export interface Controller {
  path: string;
  command: typeof ICommand;
  auth?: Authenticator;
  loader?: Loader;
  policy?: Policy;
}

// add middlewares to handle exception
// instanceof ?
// production mode handler

export function registerMethod (
  route: express.IRouterMatcher<express.Router>,
  controller : Controller
) {
  route(
    controller.path,
    async (req, res, next) => {
      try {
        const command = controller.command.doCreate(req);

        controller.command.doValidate(command);

        res.send(await controller.command.doExecute(command));
      } catch (err) {
        next(err);
      }
    }
  )
}

export class Authenticator {

}

export class Loader {

}

export class Policy {

}

export class ICommand {

  public static doCreate(request: express.Request): ICommand {
    throw new Error('doCreate');
  }

  public static doValidate(command: ICommand) {
    throw new Error('doValidate');
  }

  public static doExecute(command: ICommand): Promise<any> {
    throw new Error('doExecute');
  }
}

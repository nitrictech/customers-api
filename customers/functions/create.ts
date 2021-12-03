import { faas, documents } from "@nitric/sdk";
import { Customer } from "../common";
import { uuid } from "uuidv4";

interface CreateContext extends faas.HttpContext {
  req: faas.HttpRequest & {
    body?: Customer;
  };
}

// Start your function here
faas
  .http(
    faas.json(), //  use json body parser middleware to decode data
    async (ctx: CreateContext): Promise<faas.HttpContext> => {
      const customer = ctx.req.body;

      // generate a new uuid
      const id = uuid();

      // Create a new customer document
      await documents().collection("customers").doc(id).set(customer);

      ctx.res.body = new TextEncoder().encode(
        `Created customer with ID: ${id}`
      );

      return ctx;
    }
  )
  .start();

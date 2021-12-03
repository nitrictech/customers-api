import { faas, documents } from "@nitric/sdk";
import { Customer } from "../common";

// Start your function here
faas
  .http(async (ctx: faas.HttpContext): Promise<faas.HttpContext> => {
    try {
      const customers = await documents()
        .collection<Customer>("customers")
        .query()
        .fetch();

      const customerResults = [];

      for (const customer of customers.documents) {
        customerResults.push(customer.content);
      }
      ctx.res.json(customerResults);
    } catch (e) {
      ctx.res.status = 500;
      ctx.res.body = new TextEncoder().encode("An unexpected error occurred");
    }

    return ctx;
  })
  .start();

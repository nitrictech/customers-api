import { faas, documents } from "@nitric/sdk";
import { Customer, path } from "../common";

// Start your function here
faas
  .http(async (ctx: faas.HttpContext): Promise<faas.HttpContext> => {
    // get params from path
    const { id } = path.test(ctx.req.path);

    if (!id) {
      ctx.res.body = new TextEncoder().encode("Invalid Request");
      ctx.res.status = 400;
    }

    try {
      console.log("getting doc id", id);
      const customer = await documents()
        .collection<Customer>("customers")
        .doc(id)
        .get();

      ctx.res.json(customer);
    } catch (e) {
      ctx.res.status = 500;
      ctx.res.body = new TextEncoder().encode("An unexpected error occurred");
    }

    return ctx;
  })
  .start();

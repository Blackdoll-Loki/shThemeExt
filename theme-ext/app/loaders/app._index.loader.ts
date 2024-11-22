import { json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "app/shopify.server";

export const indexLoader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop; 

  const funnels = await prisma.funnel.findMany({
    where: {
      shopDomain: shop,  
    },
  });
  console.log('funnels', funnels)
  return Response.json({funnels});
};
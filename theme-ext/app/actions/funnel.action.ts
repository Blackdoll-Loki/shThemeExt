import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "app/shopify.server";
import type { SelectedProduct }from '../components/SelectProductComponent';


export const funnelAction = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const data = await request.formData();

  const funnelName = data.get("funnelName") as string
  const products = data.get("products") as string;
  const blocks = data.get("blocks") as string; 

  const cleanedFunnelName = funnelName.replace(/[^a-zA-Z0-9]/g, '');

 console.log(`typeof funnelName`, typeof funnelName)
 console.log('blocks', blocks)


if(products){
  const productsArr = JSON.parse(products)
  const productsIds = productsArr.map((obj: SelectedProduct) => obj.productId)

  //console.log('productsIdsArr', productsIds)

  for (const productId of productsIds) {
    console.log('productId', productId)

    const mutation = `
      mutation {
        productUpdate(
          input: {
            id: "${productId}",
            metafields: [
              {
                namespace: "funnel",
                key: "${cleanedFunnelName}",
                value: "${blocks}",
                type: "json" 
              }
            ]
          }
        ) {
          product {
            id
            metafields(first: 10) {
              edges {
                node {
                  namespace
                  key
                  value
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      // Виконуємо GraphQL запит
      const response = await admin.graphql(mutation);
      // response have to be an updated product
      console.log(`Product ${productId} updated successfully`, response);
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
    }
  }
}

  return null
}



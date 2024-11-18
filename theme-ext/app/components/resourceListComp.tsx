import {
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
  Button,
  InlineStack,
  Box,
} from '@shopify/polaris';
import {XIcon} from '@shopify/polaris-icons';
import type { SelectedProduct } from "./SelectProductComponent";

interface ResourceListCompProps {
  selectedProduct: SelectedProduct | null; // Може бути null, якщо продукт не вибраний
}

export default function ResourceListComp( { selectedProduct }: ResourceListCompProps) {

  return (
    <Box width='80%'>
      <ResourceList
        resourceName={{ singular: "product", plural: "products" }}
        items={[
          {
            id: selectedProduct?.productId,
            url: selectedProduct?.productImage || "#", // Якщо немає зображення, використовуємо пустий URL
            name: selectedProduct?.productTitle,
          },
        ]}
        renderItem={(item) => {
          if(item){
            const {id, url, name} = item;

            return (
              <ResourceItem
                id={id || ''}
                url={url}
              >
                <InlineStack align='space-between' blockAlign='center'>
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {name}
                  </Text>
                  <Button variant="plain" icon={XIcon} tone="critical" accessibilityLabel="Delete product" />
                </InlineStack>
              </ResourceItem>
            );
          }}
          }
      />
    </Box>
  );
}







// //  export function ResourceListComp({ selectedProduct }: ResourceListCompProps) {
//   // Якщо продукт не вибраний, показуємо повідомлення
//   if (!selectedProduct) {
//     return (
//       <Box>
//         <Text variant="bodyMd" as="p">
//           No product selected.
//         </Text>
//       </Box>
//     );
//   }

//   // Рендеримо вибраний продукт
//   return (
//     <Box width="80%">
//       <ResourceList
//         resourceName={{ singular: "product", plural: "products" }}
//         items={[
//           {
//             id: selectedProduct.productId,
//             url: selectedProduct.productImage || "#", // Якщо немає зображення, використовуємо пустий URL
//             name: selectedProduct.productTitle,
//           },
//         ]}
//         renderItem={(item) => {
//           const { id, url, name } = item;
//           const media = url ? <Avatar source={url} alt={name} /> : null; // Використовуємо Avatar, якщо є зображення

//           return (
//             <ResourceItem
//               id={id}
//               url={url}
//               media={media}
//               accessibilityLabel={`View details for ${name}`}
//             >
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="bodyMd" fontWeight="bold" as="h3">
//                   {name}
//                 </Text>
//                 <Button
//                   variant="plain"
//                   icon={XIcon}
//                   tone="critical"
//                   accessibilityLabel="Delete product"
//                 />
//               </InlineStack>
//             </ResourceItem>
//           );
//         }}
//       />
//     </Box>
//   );
// }

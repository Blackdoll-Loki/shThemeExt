import { Box, Button, InlineStack, RadioButton, Text } from "@shopify/polaris";
import { useCallback, useState } from "react";
import  ResourceListComp  from "./resourceListComp"

interface ShopifyProduct {
  id: string;
  title: string;
  images?: { originalSrc: string }[]; // Поле для зображень
}

export interface SelectedProduct {
  productId: string;
  productTitle: string;
  productImage?: string; // Поле необов'язкове
}

export default function SelectProductComponent(){
  // const [value, setValue] = useState('disabled');

  // const handleChange = useCallback(
  //   (_: boolean, newValue: string) => setValue(newValue),
  //   [],
  // );
  const [product, setProduct] = useState<SelectedProduct | null>(null);

  async function selectProduct() {
  try {
    const result = await window.shopify.resourcePicker({
      type: "product",
      action: "select",
    });

    const products = result as unknown as ShopifyProduct[];

    if (products && products.length > 0) {
      const { id, title, images } = products[0];

      // Перевіряємо, чи є необхідні дані
      if (id && title) {
        setProduct({
          productId: id,
          productTitle: title,
          productImage: images?.[0]?.originalSrc || undefined,
        });
      }
    }
  } catch (error) {
    console.error("Error selecting product:", error);
  }
}
console.log(product)


  return (
    <Box>
      <Text variant="headingMd" as="h6">
        Apply offer to
      </Text>
     { /*<Button onClick={selectProduct}></Button>*/}
      <RadioButton
        label="Select products"
        checked={product !== null}
        id="disabled"
        name="accounts"
        onChange={selectProduct}
      />
      <InlineStack blockAlign='center' align="center" gap='400'>
        {product ? (
          <ResourceListComp selectedProduct={product}/>
        ) : (
          <Text variant="bodyLg" as="p">
            Select product
          </Text>
        )}
        <Text variant="bodyLg" as="p">
          Edit products
        </Text>
      </InlineStack>
    </Box>
  )
}

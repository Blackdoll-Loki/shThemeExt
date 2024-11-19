import { BlockStack, Box, Button, InlineStack, RadioButton, Text } from "@shopify/polaris";
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
  const [products, setProducts] = useState<SelectedProduct[]>([]);

  const handleRemoveProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.productId !== productId));
  };

  async function selectProduct() {
    try {
      const result = await window.shopify.resourcePicker({
        type: "product",
        action: "select",
        multiple: true, // Дозволяємо обирати кілька продуктів
      }) as ShopifyProduct[];
  
  
      // if (result !== undefined) {
        // Мапимо вибрані продукти у потрібний формат
        const mappedProducts: SelectedProduct[] = result.map((product) => (
          {
          productId: product.id,
          productTitle: product.title,
          productImage: product.images?.[0]?.originalSrc,
        }));
  
        // Оновлюємо стан, додаючи нові продукти
        setProducts(() => [...mappedProducts]);
      } catch (error) {
      console.error("Error selecting products:", error);
    }
  }


  return (
    <Box>
      <Text variant="headingMd" as="h6">
        Apply offer to
      </Text>
      <Box padding="400">
        <Button variant="plain" onClick={() => selectProduct()}>Select products</Button>
      </Box>
      <InlineStack blockAlign='center' align="center" gap='400'>
        {products ? (
        <ResourceListComp items={products} onRemoveProduct={handleRemoveProduct} />
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

import {
  Page,
  Text,
  BlockStack,
  Button,
  Card,
  InlineStack,
  Box,
  Checkbox,
} from "@shopify/polaris";
import  TextFieldComponent  from '../components/textField';
import DiscountSettingsBlock from "app/components/DiscountSettingsBlock";
import SelectProductComponent from '../components/SelectProductComponent';
import { useCallback, useState } from "react";


export default function AdditionalPage() {
  const [blocks, setBlocks] = useState([
    { id: 1, volume: 3, discount: 5 },
    { id: 2, volume: 5, discount: 10 },
    { id: 3, volume: 10, discount: 15 },
  ]);
  
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );

  const addBlock = () => {
    const newBlock = {
      id: Date.now(), // Унікальний ID
      volume: 0,
      discount: 0,
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const removeBlock = (id: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  return (
    <Page
    backAction={{content: 'Settings', url: '#'}}
    title="Funnel configuration"
    >
      <Card>
        <BlockStack gap="500">
          <Text variant="headingXl" as="h4">
            Here will be the funnel widget preview
          </Text>
          <TextFieldComponent />
          <SelectProductComponent />
          <BlockStack gap="800">
          <Text variant="headingMd" as="h6">
            Discount configuration
          </Text>
          {blocks.map((block) => (
          <DiscountSettingsBlock
            key={block.id}
            volume={block.volume}
            discount={block.discount}
            // Передаємо функцію для видалення
            onRemove={() => removeBlock(block.id)}
          />))}
          </BlockStack>
          <InlineStack align="space-between">
            <Button
             variant="plain"
             onClick={()=>addBlock()}>Add more</Button>
            <Checkbox
              label="Automatic labels (recommended)"
              checked={checked}
              onChange={handleChange}
            />
          </InlineStack>
        </BlockStack>
      </Card>
      <Box padding="400">
        <InlineStack align="end">
          <Button variant="primary" tone="success">Create</Button>
        </InlineStack>
      </Box>
    </Page>
  );
}


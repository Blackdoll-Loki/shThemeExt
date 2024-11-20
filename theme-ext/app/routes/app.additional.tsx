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
import WidgetComponent from "app/components/widgetComponent";


export default function AdditionalPage() {
  const [blocks, setBlocks] = useState([
    { id: 1, volume: 3, discount: 5, label: "-5%", description: "5% discount" },
    { id: 2, volume: 5, discount: 10, label: "-10%", description: "10% discount" },
    { id: 3, volume: 10, discount: 15, label: "-15%", description: "15% discount" },
  ]);

  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    []
  );

  const addBlock = () => {
    const newBlock = {
      id: Date.now(),
      volume: 0,
      discount: 0,
      label: "",
      description: "",
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const removeBlock = (id: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const updateBlock = (id: number, updatedValues: Partial<typeof blocks[0]>) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, ...updatedValues } : block
      )
    );
  };


  return (
    <Page
    backAction={{content: 'Settings', url: '#'}}
    title="Funnel configuration"
    >
      <Card>
        <BlockStack gap="500">
          <WidgetComponent />
          <TextFieldComponent />
          <SelectProductComponent />
          <BlockStack gap="800">
          <Text variant="headingMd" as="h6">
            Discount configuration
          </Text>
          {blocks.map((block) => (
              <DiscountSettingsBlock
                key={block.id}
                {...block}
                checked={checked}
                onRemove={() => removeBlock(block.id)}
                onUpdate={(updatedValues) => updateBlock(block.id, updatedValues)}
              />
            ))}
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


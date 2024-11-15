import { BlockStack, Button, InlineStack, Text, TextField } from "@shopify/polaris"
import SelectExample from './Select'
import { useCallback, useState } from "react";
import { XIcon } from '@shopify/polaris-icons';


export default function DiscountSettingsBlock (){
  const [description, setDescription] = useState('5% discount');
  const [label, setLabel] = useState('-5%');

  const handleDescriptionChange = useCallback(
    (newValue: string) => setDescription(newValue),
    [],
  );

  const handleLabelChange = useCallback(
    (newValue: string) => setLabel(newValue),
    [],
  );
  
  return (
    <InlineStack gap="500">
      <BlockStack align="center">
        <Button variant="plain" icon={XIcon} accessibilityLabel="Remove discount block" />
      </BlockStack>
      <BlockStack gap="300">
        <SelectExample min={1} max={10} label={'Volume'}/>
        <Text as="p" tone="subdued">
          Volume triggering promotion
        </Text>
      </BlockStack>
      <BlockStack gap="300">
        <SelectExample min={1} max={10} str="%" label={'Discount'}/>
        <Text as="p" tone="subdued">
          Discount value in %
        </Text>
      </BlockStack>
      <BlockStack gap="300">
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          autoComplete="off"
        />
        <Text as="p" tone="subdued">
          Discount for this volume discount
        </Text>
      </BlockStack>
      <BlockStack gap="300">
        <TextField
          label="Label"
          value={label}
          onChange={handleLabelChange}
          autoComplete="off"
        />
        <Text as="p" tone="subdued">
          Discount label
        </Text>
      </BlockStack>
    </InlineStack>
  )
}
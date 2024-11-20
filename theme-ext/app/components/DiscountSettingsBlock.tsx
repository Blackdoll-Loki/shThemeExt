import { BlockStack, Box, Button, Divider,  InlineStack, Text, TextField } from "@shopify/polaris"
import { useCallback, useState } from "react";
import { XIcon } from '@shopify/polaris-icons';

interface DiscountSettingsBlockProps {
  volume: number;
  discount: number;
  label: string;
  description: string;
  checked: boolean;
  onRemove: () => void;
  onUpdate: (updatedValues: Partial<DiscountSettingsBlockProps>) => void;
}

export default function DiscountSettingsBlock ({
  volume,
  discount,
  label,
  description,
  checked,
  onRemove,
  onUpdate,
}: DiscountSettingsBlockProps){
  const handleVolumeChange = useCallback(
    (newValue: string) => {
      onUpdate({ volume: parseInt(newValue, 10) || 0 });
    },
    [onUpdate]
  );

  const handleDiscountChange = useCallback(
    (newValue: string) => {
      const discountValue = parseInt(newValue, 10) || 0;
      onUpdate({
        discount: discountValue,
        description: `${discountValue}% discount`,
        ...(checked ? {} : { label: `-${discountValue}%` }), // Заблокувати оновлення label
      });
    },
    [onUpdate, checked]
  );

  const handleDescriptionChange = useCallback(
    (newValue: string) => {
      onUpdate({ description: newValue });
    },
    [onUpdate]
  );

  const handleLabelChange = useCallback(
    (newValue: string) => {
      if (!checked) {
        onUpdate({ label: newValue });
      }
    },
    [onUpdate, checked]
  );
  
  return (
    <BlockStack gap="500">
      <InlineStack gap='300' align="center">
        <Button
        variant="plain"
        icon={XIcon}
        accessibilityLabel="Remove discount block"
        onClick={onRemove} />
        <Box width="210px">
          <BlockStack gap="300">
            <Text variant="headingMd" as="h6" tone="subdued">
              Volume
            </Text>
            <TextField
              label=""
              type="number"
              value={volume.toString()}
              onChange={handleVolumeChange}
              autoComplete="off"
            />
            <Text as="p" tone="subdued">
              Volume triggering promotion
            </Text>
          </BlockStack>
        </Box>
        <Box width="210px">
          <BlockStack gap="300">
            <Text variant="headingMd" as="h6" tone="subdued">
              Discount
            </Text>
            <TextField
              label=""
              type="number"
              value={discount.toString()}
              onChange={handleDiscountChange}
              autoComplete="off"
            />
            <Text as="p" tone="subdued">
              Discount value in %
            </Text>
          </BlockStack>
        </Box>
        <Box width="210px">
          <BlockStack gap="300">
            <Text variant="headingMd" as="h6" tone="subdued">
              Description
            </Text>
            <TextField
              label=""
              value={description}
              onChange={handleDescriptionChange}
              autoComplete="off"
            />
            <Text as="p" tone="subdued">
              Discount for this volume discount
            </Text>
          </BlockStack>
        </Box>
        <Box width="210px">
          <BlockStack gap="300">
            <Text variant="headingMd" as="h6" tone="subdued">
              Label
            </Text>
            <TextField
              label=""
              value={label}
              onChange={handleLabelChange}
              autoComplete="off"
            />
            <Text as="p" tone="subdued">
              Discount label
            </Text>
          </BlockStack>
        </Box>
      </InlineStack>
      <Divider />
    </BlockStack>
  )
}
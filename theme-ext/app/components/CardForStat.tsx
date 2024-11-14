import React from 'react';
import {BlockStack, Card, InlineGrid, Text} from '@shopify/polaris';


export default function CardWithHeaderIconActions(title: string, subtitle: string) {
  return (
    <Card roundedAbove="sm">
      <InlineGrid>
        <BlockStack gap="200">
          <Text as="h1" variant="bodyMd" tone="subdued">
            {title}
          </Text>
          <Text as="p" variant="headingLg">
            {subtitle}
          </Text>
        </BlockStack>
      </InlineGrid>
    </Card>
  );
}
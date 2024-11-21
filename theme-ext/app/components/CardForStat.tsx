import React from 'react';
import {BlockStack, Card, InlineGrid, Text} from '@shopify/polaris';

interface CardWithHeaderProps {
  title: string;
  subtitle: string;
}

export default function CardWithHeaderIconActions({ title, subtitle }: CardWithHeaderProps) {
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
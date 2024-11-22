import {
  Icon,
  Text,
  DataTable,
  Box,
  InlineStack,
} from '@shopify/polaris';
import React from 'react';
import {
  DeleteIcon,
  ChartHistogramGrowthIcon
} from '@shopify/polaris-icons';

interface FunnelObj{
  id: string,
  funnelName: string,
  creationDate: string,
  products: number,
  status: string,
  deleteBtn: string
}

export default function IndexTableWithoutCheckboxesExample() {
  const funnel = [
    [
      <Icon source={ChartHistogramGrowthIcon} tone="base" />,
      'A TOP DISCOUNT SCHEDULE TRANCEIVERS',
      <InlineStack align='center'>'30/08/2023'</InlineStack>,
      <InlineStack align='center'>5</InlineStack>,
      <Icon source={DeleteIcon} tone="critical" />,
    ],
    [ 
      <Icon source={ChartHistogramGrowthIcon} tone="base" />,
      'My first offer',
      <InlineStack align='center'>'19/08/2023'</InlineStack>,
      <InlineStack align='center'>10</InlineStack>,
      <InlineStack align='center'>
        <Icon source={DeleteIcon} tone="critical" />
      </InlineStack>,
    ],
  ];


  return (
      <DataTable
      columnContentTypes={[
        'text',
        'text',
        'text',
        'text',
        'text'
      ]}
      headings={[
        '',
        'Funnel name',
        <InlineStack align='center'>Creation date</InlineStack>,
        <InlineStack align='center'>Products</InlineStack>,
        <InlineStack align='center'>Actions</InlineStack>,
      ]}
      rows={funnel}
      pagination={{
        hasNext: true,
        onNext: () => {},
      }}
    />
  );
}
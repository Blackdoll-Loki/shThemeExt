import {
  Icon,
  Text,
  DataTable,
  Box,
  InlineStack,
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import {
  DeleteIcon,
  ChartHistogramGrowthIcon
} from '@shopify/polaris-icons';

interface FunnelObj{
  id: string,
  funnelKey: string,
  createdAt: string,
  products: number,
  status: string,
  deleteBtn: string
}
interface IndexTableProps {
  funnels: FunnelObj[]; 
}


export default function IndexTableWithoutCheckboxesExample({ funnels }: IndexTableProps) {
  // const funnel = [
  //   [
  //     <Icon source={ChartHistogramGrowthIcon} tone="base" />,
  //     'A TOP DISCOUNT SCHEDULE TRANCEIVERS',
  //     <InlineStack align='center'>'30/08/2023'</InlineStack>,
  //     <InlineStack align='center'>5</InlineStack>,
  //     <Icon source={DeleteIcon} tone="critical" />,
  //   ],
  //   [ 
  //     <Icon source={ChartHistogramGrowthIcon} tone="base" />,
  //     'My first offer',
  //     <InlineStack align='center'>'19/08/2023'</InlineStack>,
  //     <InlineStack align='center'>10</InlineStack>,
  //     <InlineStack align='center'>
  //       <Icon source={DeleteIcon} tone="critical" />
  //     </InlineStack>,
  //   ],
  // ];
  const [funnelData, setFunnelData] = useState<FunnelObj[]>(funnels);

  useEffect(() => {
    setFunnelData(funnels);
  }, [funnels]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  const rows = funnelData.map(funnel => {
    const formattedDate = formatDate('2024-11-22T12:30:05.732Z');
    return([
    <Icon source={ChartHistogramGrowthIcon} tone="base" />,
    funnel.funnelKey,
    <InlineStack align='center'>{formattedDate}</InlineStack>,
    <InlineStack align='center'>{funnel.products}</InlineStack>,
    <InlineStack align='center'>
      <Icon source={DeleteIcon} tone="critical" />
    </InlineStack>,
  ])});


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
      rows={rows}
      pagination={{
        hasNext: true,
        onNext: () => {},
      }}
    />
  );
}
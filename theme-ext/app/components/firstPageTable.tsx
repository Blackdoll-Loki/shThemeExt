import {
  IndexTable,
  Text,
  Badge,
  useBreakpoints,
  Button,
  Icon,
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
    { id: '1',
      funnelName: 'A TOP DISCOUNT SCHEDULE TRANCEIVERS',
      creationDate: '30/08/2023',
      products: 5,
      status: 'Active',
      deleteBtn: 'delete',
    },
    { id: '2',
      funnelName: 'My first offer',
      creationDate: '19/08/2023',
      products: 10,
      status: 'Active',
      deleteBtn: 'delete',
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const rowMarkup = funnel.map(
    (
      { id, funnelName,creationDate, products, status, deleteBtn } : FunnelObj,
      index,
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Icon
            source={ChartHistogramGrowthIcon}
            tone="base"
          />{funnelName}
        </IndexTable.Cell>
        <IndexTable.Cell>{creationDate}</IndexTable.Cell>
        <IndexTable.Cell>{products}</IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone="success">Active</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Button variant="primary" tone="critical" icon={DeleteIcon}></Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={funnel.length}
        headings={[
          {title: 'Funnel name'},
          {title: 'Creation date'},
          {title: 'Products'},
          {title: 'Status'},  
          {title: 'Actions'},
        ]}
        selectable={false}
        pagination={{
          hasNext: true,
          onNext: () => {},
        }}
      >
        {rowMarkup}
      </IndexTable>
  );
}
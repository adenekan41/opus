import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'rebass';
import { Droplist, Item } from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 3px;
  padding: 20px;
  width: ${props => props.width};
  flex: ${props => props.width};
  margin-right: ${props => props.mr || '16px'};
  margin-bottom: 20px;

  .droplist-button {
    padding: 0;
  }

  .highcharts-legend {
    display: none !important;
  }
`;

export const dataToChartFormat = (data, color = `#3c464c`) => {
  if (data.length > 1) {
    return data.map((value, i) => {
      if (i % 2 > 0) {
        return { y: Number(value), color };
      }
      return Number(value);
    });
  }
  return data.map(value => ({ y: Number(value), color }));
};

export const barCharOptions = {
  title: {
    text: null,
  },
  chart: {
    type: 'column',
    height: '200px',
  },
  colors: ['#4e7ee8', '#3c464c'],
  credits: { enabled: false },
};

export const semiCircleOptions = {
  chart: {
    type: 'solidgauge',
    height: '200px',
  },
  credits: { enabled: false },

  title: null,

  pane: {
    center: ['50%', '85%'],
    size: '100%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor: '#ebebeb',
      borderColor: 'none',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc',
    },
  },

  tooltip: {
    enabled: false,
  },

  yAxis: {
    lineWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    labels: {
      y: 16,
    },
    min: 0,
    max: 100,
    title: {
      text: null,
    },
  },

  plotOptions: {
    series: {
      animation: false,
    },
    solidgauge: {
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true,
      },
    },
  },
};
export default function ChartContainer({
  mr,
  data,
  width,
  heading,
  children,
  hideCard,
  viewDetails,
}) {
  return (
    <Container width={width} mr={mr}>
      <Flex justifyContent="space-between" alignItems="center" mb="16px">
        <Text color="#242424" fontSize="14px" fontWeight="700">
          {heading}
        </Text>
        <Droplist
          trigger={
            <Button kind="ghost" className="droplist-button">
              <Icon name="dots" color="rgba(36,36,36,.5)" />
            </Button>
          }
        >
          {onClose => (
            <>
              <Item
                onClick={() => {
                  hideCard();
                  onClose();
                }}
              >
                hide card
              </Item>
              <Item
                onClick={() => {
                  viewDetails(data);
                  onClose();
                }}
              >
                view details
              </Item>
            </>
          )}
        </Droplist>
      </Flex>
      <Box>{children}</Box>
    </Container>
  );
}

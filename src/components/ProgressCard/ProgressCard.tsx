import { ActionIcon, Center, Progress, RingProgress } from '@mantine/core'
import React from 'react'
import { TbBuildingWarehouse } from 'react-icons/tb'
import { AreaChart, BarChart } from '@mantine/charts'

const data = [
  { month: 'Jan', Smartphones: 1200 },
  { month: 'Feb', Smartphones: 1900 },
  { month: 'Mar', Smartphones: 400 },
  { month: 'April', Smartphones: 1000 },
  { month: 'May', Smartphones: 800 },
  { month: 'June', Smartphones: 750 },
  { month: 'July', Smartphones: 750 },
  { month: 'August', Smartphones: 750 },
  { month: 'Sept', Smartphones: 750 },
  { month: 'Oct', Smartphones: 750 },
  { month: 'Nov', Smartphones: 750 },
  { month: 'Dec', Smartphones: 750 },
]
const data1 = [
  {
    date: 'Jan',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Feb',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'April ',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },

  {
    date: 'May',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
  {
    date: 'June',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
  {
    date: 'July',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
  {
    date: 'Aug',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
  {
    date: 'Sept',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
  {
    date: 'Oct',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
  {
    date: 'Nov',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
  {
    date: 'Dec',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
]
function ProgressCard() {
  return (
    <div>
      <div className="w-full flex items-center gap-6 p-4 ">
        <div className="w-1/2">
          <div className="w-full">
            <div className="bg-[#ff6746] flex items-center gap-8 shadow-xl rounded-[16px] p-6 w-full ">
              <span>
                <TbBuildingWarehouse size={100} color="white" />
              </span>
              <div>
                <div className="text-2xl text-white font-bold mb-2 ">
                  Total Properties
                </div>
                <div className="mb-4">
                  <Progress
                    radius="md"
                    size="lg"
                    className="w-100"
                    value={50}
                    color="white"
                  />
                </div>
              </div>
              <div className="font-semibold text-4xl text-white">4,562</div>
            </div>
          </div>
          <div className="flex gap-8 w-full mt-6">
            <div className="w-1/2">
              <div className="bg-white shadow-xl rounded-[16px] flex items-center justify-center p-3 ">
                <div className="mr-12">
                  <h2 className="text-[24px] font-bold ">2,356</h2>
                  <p className="font-semibold text-base mt-3">
                    Properties for Sale
                  </p>
                </div>
                <div>
                  <RingProgress
                    label={
                      <Center>
                        <ActionIcon
                          className="bg-[#dbdef3]"
                          variant="light"
                          radius="xl"
                          size="xl"
                        >
                          40%
                        </ActionIcon>
                      </Center>
                    }
                    size={120}
                    thickness={10}
                    sections={[{ value: 40, color: 'cyan' }]}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="bg-white rounded-[16px] shadow-xl flex items-center justify-center p-3 ">
                <div className="mr-12">
                  <h2 className="text-[24px] font-bold ">2,356</h2>
                  <p className="font-semibold text-base mt-3">
                    Properties for Rent
                  </p>
                </div>
                <div>
                  <RingProgress
                    label={
                      <Center>
                        <ActionIcon
                          className="bg-[#dbdef3]"
                          variant="light"
                          radius="xl"
                          size="xl"
                        >
                          40%
                        </ActionIcon>
                      </Center>
                    }
                    size={120}
                    thickness={10}
                    sections={[{ value: 40, color: 'cyan' }]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-white rounded-[16px] py-2 px-1 shadow-xl">
          <BarChart
            h={300}
            data={data}
            dataKey="month"
            unit="$"
            series={[{ name: 'Smartphones', color: 'indigo.6' }]}
            tickLine="none"
            gridAxis="none"
          />
        </div>
      </div>
      <div>
        <div>
          <AreaChart
            h={300}
            data={data1}
            dataKey="date"
            series={[
              { name: 'Apples', color: 'indigo.6' },
              { name: 'Oranges', color: 'blue.6' },
              { name: 'Tomatoes', color: 'teal.6' },
            ]}
            curveType="linear"
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressCard

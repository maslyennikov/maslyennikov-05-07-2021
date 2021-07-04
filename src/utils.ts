import { ITableState } from "./interfaces";

/**
 * Formats data to tableState
 * @param data: Array<Array<number>> - initial data
 * @param smallestToLargest: boolean
 * @returns ITableState
 */
export const dataToTableState = (
  data: Array<Array<number>>,
  smallestToLargest: boolean = true
): ITableState => {
  const formattedData = [];
  const dataCopy = [...data];
  let currentTotal = 0;

  if (!smallestToLargest) {
    dataCopy.reverse();
  }

  for (let pair of dataCopy) {
    currentTotal = currentTotal + pair[1];

    formattedData.push({
      col1: String(currentTotal),
      col2: String(pair[1]),
      col3: String(pair[0]),
    });
  }

  return smallestToLargest ? formattedData : formattedData.reverse();
};

/**
 * Formats data by the select markets ticket size
 * @param data: Array<Array<number>> - initial data
 * @param groupByValue: number - ticket size
 * @returns Array<Array<number>>
 */
export const groupBy = (
  data: Array<Array<number>>,
  groupByValue: number
): Array<Array<number>> => {
  const groupTable: Array<Array<number>> = [];

  // groupBy mechanism
  for (let item of data) {
    const groupKey = Number((item[0] - (item[0] % groupByValue)).toFixed(2));

    const index = groupTable.findIndex(
      (pair: Array<number>) => pair[0] === groupKey
    );
    if (index > -1) {
      groupTable[index] = [
        groupTable[index][0],
        groupTable[index][1] + item[1],
      ];
    } else {
      groupTable.push([groupKey, item[1]]);
    }
  }

  return groupTable;
};

/**
 * Updates state with new data from feed
 * @param data: Array<Array<number>> - initial data
 * @param newData: number - new data received from the feed
 * @param smallestToLargest: boolean
 * @returns Array<Array<number>>
 */
export const updateTableState = (
  data: Array<Array<number>>,
  newData: Array<Array<number>>,
  smallestToLargest: boolean = true
): Array<Array<number>> => {
  let tableData: Array<Array<number>> = [...data];

  try {
    for (let pair of newData) {
      const newPrice = pair[0];
      const newAmount = pair[1];

      // if new amount is 0, remove entry
      if (newAmount === 0) {
        tableData = tableData.filter(
          (dataEntry: number[]) => newPrice !== dataEntry[0]
        );

        continue;
      }

      // checking if entry exists in table
      const entryIndex = tableData.findIndex(
        (dataEntry: number[]) => dataEntry[0] === newPrice
      );

      if (entryIndex > -1) {
        //replacing amount if entry exists
        tableData[entryIndex][1] = tableData[entryIndex][1] + newAmount;
      } else {
        //adding new entry to the table
        tableData.push(pair);
      }

      tableData = tableData.sort((x: number[], y: number[]) => {
        if (smallestToLargest) return x[1] > y[1] ? 1 : -1;
        else return x[1] > y[1] ? -1 : 1;
      });
    }

    return tableData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

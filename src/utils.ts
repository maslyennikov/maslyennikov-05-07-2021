import { ITableState } from "./interfaces";

export const dataToTableState = (data: Array<Array<number>>): ITableState => {
  const formattedData = [];
  let currentTotal = 0;

  for (let pair of data) {
    currentTotal = currentTotal + pair[1];
    formattedData.push({
      col1: String(currentTotal),
      col2: String(pair[1]),
      col3: String(pair[0]),
    });
  }

  return formattedData;
};

export const tableStatetoData = (
  tableState: ITableState
): Array<Array<number>> => {
  const data = [];
  for (let entry of tableState) {
    data.push([Number(entry.col3), Number(entry.col2)]);
  }

  return data;
};

export const updateTableState = (
  tableState: ITableState,
  data: Array<Array<number>>
) => {
  let tableData = tableStatetoData(tableState);

  try {
    for (let pair of data) {
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
        tableData[entryIndex][1] = newAmount;
      } else {
        //adding new entry to the table
        tableData.push(pair);
      }

      tableData = tableData.sort((x: number[], y: number[]) =>
        x[1] > y[1] ? 1 : -1
      );
    }

    return dataToTableState(tableData);
  } catch (err) {
    console.log(err);
    return [];
  }
};

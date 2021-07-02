import React, { FC } from "react";
import { Cell, Row, useTable } from "react-table";
import { isMobile } from "react-device-detect";

import { Colors, Direction } from "../../constants";
import { leftColumns, rightColumns } from "./constants";
import { ITableRow, ITableState } from "../../interfaces";

interface IProps {
  depthVisualizerDirection?: Direction;
  data?: ITableState;
  hideHeader?: boolean;
}

export const Table: FC<IProps> = (props: IProps) => {
  const { data, depthVisualizerDirection } = props;

  const columns =
    depthVisualizerDirection === Direction.RIGHT ? rightColumns : leftColumns;

  let maxTotal: number = 0;

  data?.forEach((row: ITableRow) => {
    const currentTotal = parseFloat(row.col1);

    if (currentTotal > maxTotal) {
      maxTotal = currentTotal;
    }
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // @ts-ignore
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{
        tableLayout: "fixed",
        borderCollapse: "collapse",
        width: isMobile ? "100%" : "50%",
      }}
    >
      {!props.hideHeader && (
        <thead style={{ position: "sticky", top: "0", background: Colors.blue }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    color: Colors.grey,
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ margin: "10px" }}>
                    {column.render("Header")}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody
        {...getTableBodyProps()}
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "250px",
        }}
      >
        {rows.map((row: Row<ITableRow>) => {
          const depthVisualizerPercentage =
            (parseFloat(row.values["col1"]) / maxTotal) * 100;
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              style={{
                background: `linear-gradient(${
                  depthVisualizerDirection === Direction.RIGHT
                    ? isMobile
                      ? "-"
                      : ""
                    : "-"
                }90deg, ${
                  depthVisualizerDirection === Direction.RIGHT
                    ? Colors.opacityGreen
                    : Colors.opacityRed
                } ${depthVisualizerPercentage}%, ${Colors.transparent} 0%)`,
              }}
            >
              {row.cells.map((cell: Cell<ITableRow>) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: "10px",
                    color:
                      cell.column.id === "col3" ? Colors.green : Colors.white,
                    textAlign: "center",
                    fontFamily: "Monaco",
                  }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

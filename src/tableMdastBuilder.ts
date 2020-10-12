import { AlignType } from 'mdast';
import { Parent } from "unist";
import { tableCell, tableRow, table, text, Children } from 'mdast-builder';

export type TableCellContent = string | Children;

export interface TableColumn<Item> {
  title: TableCellContent;
  render: (row: Item, index: number, dataSource: Item[]) => TableCellContent;
  alignType?: AlignType;
}
const tableCellContentToNode = (content: TableCellContent) =>
  typeof content === 'string' ? text(content) : content;
export const tableMdastBuilder = <Item = unknown>(
  dataSource: Item[],
  columns: Array<TableColumn<Item>>
): Parent =>
  table(
    columns.map((vo) => vo.alignType),
    [
      columns.map((vo) => tableCell(tableCellContentToNode(vo.title))),
      ...dataSource.map((item, index) =>
        columns.map((vo) =>
          tableCell(tableCellContentToNode(vo.render(item, index, dataSource)))
        )
      ),
    ].map((vo) => tableRow(vo))
  );

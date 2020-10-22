import { AlignType } from 'mdast';
import { Parent } from "unist";
import { tableCell, tableRow, table, text, Children } from 'mdast-builder';

export type TableCellContent = Children | string | boolean | number | undefined | null;
const isChildren = (content: TableCellContent): content is Children =>
  !['number', 'string', 'boolean', 'undefined'].includes(typeof content) && content !== null;

export interface TableColumn<Item> {
  title: TableCellContent;
  render: (row: Item, index: number, dataSource: Item[]) => TableCellContent;
  alignType?: AlignType;
}
const tableCellContentToNode = (content: TableCellContent = '') =>
  isChildren(content) ? content : text(`${content}`);
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

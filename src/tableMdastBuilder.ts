import * as u from 'unist-builder';
import { AlignType, Table, TableCell, PhrasingContent } from 'mdast';

export type TableCellContent = string | PhrasingContent[];

const table = (
  rows: Array<Array<TableCellContent>>,
  align?: AlignType[]
): Table => u(
  'table',
  { align },

  rows.map(row => u(
    'tableRow',
    row.map<TableCell>(vo => {
      if (typeof vo === 'string') {
        return u('tableCell', [u('text', vo)]);
      }
      return u('tableCell', vo);
    })
  ))
);

export interface TableColumn<Item> {
  title: string;
  render: (row: Item, index: number, dataSource: Item[]) => TableCellContent;
  alignType?: AlignType
}

export const tableMdastBuilder = <Item = unknown>(dataSource: Item[], columns: TableColumn<Item>[]): Table =>
  table([
    columns.map(vo => vo.title),
    ...dataSource.map((item, index) =>
      columns.map(vo => vo.render(item, index, dataSource))
    )
  ], columns.map(vo => vo.alignType));

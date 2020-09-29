import * as u from 'unist-builder';
import { AlignType, Table, TableCell, PhrasingContent } from 'mdast';

export type CellContent = string | PhrasingContent[];

export const tableMdastBuilder = (
  [...rows]: Array<Array<CellContent>>,
  align: AlignType[] = []
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

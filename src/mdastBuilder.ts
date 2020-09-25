import { ComponentDoc, PropItem } from 'react-docgen-typescript';
import * as u from 'unist-builder';
import { AlignType, StaticPhrasingContent ,Content, Heading, Table } from 'mdast';

export const mdastBuilder = (docs: ComponentDoc[]): Content[] => [].concat(...docs.map(vo => componentDocMdastBuilder(vo)));
export const componentDocMdastBuilder = (componentDoc: ComponentDoc): Content[] => [
  u('heading', { depth: 3 }, [u('text', componentDoc.displayName)]) as Heading,
  u('text', componentDoc.description),
  u('heading', { depth: 4 }, [u('text', 'props')]) as Heading,
  componentDocTableMdastBuilder(componentDoc, [
    {
      title: 'prop',
      render: (vo) => u('strong', [u('text', vo.name)]),},
    {
      title: 'description',
      render: (vo) => vo.description,},
    {
      title: 'type',
      render: (vo) => vo.type.name,},
    {
      title: 'default',
      render: (vo) => `${vo.defaultValue && vo.defaultValue.value}`,},
    {
      title: 'required',
      render: (vo) => vo.required ? ':white_check_mark:' : ':negative_squared_cross_mark:',},
  ]),
];

type ComponentDocTableColumnRender = (row: PropItem, index: number, componentDoc: ComponentDoc) => string|StaticPhrasingContent;
interface ComponentDocTableColumn {
  title: string;
  render: ComponentDocTableColumnRender;
  alignType?: AlignType
}
export const componentDocTableMdastBuilder = (componentDoc: ComponentDoc, columns: ComponentDocTableColumn[]): Table => tableMdastBuilder([
  columns.map(vo => vo.title),
  ...Object.values(componentDoc.props).map((prop, index) =>
    columns.map(vo => vo.render(prop, index, componentDoc))
  )
]);

export const tableMdastBuilder = (
  [...rows]: Array<Array<string|StaticPhrasingContent>>,
  align: AlignType[] = [],
): Table => u(
  'table',
  { align },
  rows.map(row => u(
    'tableRow',
    row.map(vo => u(
      'tableCell',
      [typeof vo === 'string' ? u('text', vo): vo],
    )),
  )),
);

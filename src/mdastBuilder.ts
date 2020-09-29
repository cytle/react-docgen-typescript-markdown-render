import { ComponentDoc, PropItem } from 'react-docgen-typescript';
import * as u from 'unist-builder';
import { AlignType, Content, Heading, Table } from 'mdast';
import { tableMdastBuilder, CellContent } from './tableMdastBuilder';

export const mdastBuilder = (docs: ComponentDoc[]): Content[] => [].concat(...docs.map(vo => componentDocMdastBuilder(vo)));
export const componentDocMdastBuilder = (componentDoc: ComponentDoc): Content[] => [
  u('heading', { depth: 3 }, [u('text', componentDoc.displayName)]) as Heading,
  u('text', componentDoc.description),
  u('heading', { depth: 4 }, [u('text', 'Props')]) as Heading,
  componentDocTableMdastBuilder(componentDoc, [
    {
      title: 'Name',
      render: (vo) => vo.required ? [u('text', vo.name), u('text', ' '), u('emphasis', [u('text', '(required)')])]: vo.name,
    },
    {
      title: 'Type',
      render: (vo) => vo.type.name,
    },
    {
      title: 'Default value',
      render: (vo) => vo.defaultValue?.value || '',
    },
    {
      title: 'Description',
      render: (vo) => vo.description,
    },
  ]),
];

type ComponentDocTableColumnRender = (row: PropItem, index: number, componentDoc: ComponentDoc) => CellContent;
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

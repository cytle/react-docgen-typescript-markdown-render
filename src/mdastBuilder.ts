import { ComponentDoc } from 'react-docgen-typescript';
import * as u from 'unist-builder';
import { Content, Heading } from 'mdast';
import { tableMdastBuilder } from './tableMdastBuilder';

export const mdastBuilder = (docs: ComponentDoc[]): Content[] => [].concat(...docs.map(vo => componentDocMdastBuilder(vo)));
export const componentDocMdastBuilder = (componentDoc: ComponentDoc): Content[] => [
  u('heading', { depth: 3 }, [u('text', componentDoc.displayName)]) as Heading,
  u('text', componentDoc.description),
  u('heading', { depth: 4 }, [u('text', 'Props')]) as Heading,
  tableMdastBuilder(Object.values(componentDoc.props), [
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

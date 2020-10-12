import { PropItemType } from 'react-docgen-typescript';
import { tableMdastBuilder } from '../tableMdastBuilder';
import { emphasis, heading, inlineCode, text } from 'mdast-builder';
import { ComponentDocRenderer } from '../types';

interface PropItemEnumType extends PropItemType {
  raw: string;
  value: Array<{ value: string }>;
}
const isEnumType = (type: PropItemType): type is PropItemEnumType =>
  type.name === 'enum' && Array.isArray(type.value);

/**
 * alibaba materials style renderer
 * @see https://yuque.antfin-inc.com/mo/spec/spec-materials#CZiWi
 * @example
 * ``` md
 * ### Column
 *
 * Form column.
 *
 * #### Props
 *
 * | Name               | Type                                | Default value | Description              |
 * | ------------------ | ----------------------------------- | ------------- | ------------------------ |
 * | prop1              | string                              | "red"         | prop1 description        |
 * | prop2 _(required)_ | number                              |               | prop2 description        |
 * | prop3 _(required)_ | () => void                          |               | prop3 description a \| b |
 * | prop4 _(required)_ | "option1" \| "option2" \| "option3" |               | prop4 description 中文   |
 * ```
 */
export const aliMaterialRenderer: ComponentDocRenderer = (componentDoc) => [
  heading(3, text(componentDoc.displayName)),
  text(componentDoc.description),
  heading(4, text('Props')),
  tableMdastBuilder(Object.values(componentDoc.props), [
    {
      title: '参数',
      render: (vo) =>
        vo.required
          ? [text(vo.name), text(' '), emphasis(text('(required)'))]
          : vo.name,
    },
    {
      title: '说明',
      render: (vo) => vo.description,
    },
    {
      title: '类型',
      render: (vo) =>
        inlineCode(isEnumType(vo.type) ? vo.type.raw : vo.type.name),
    },
    {
      title: '可选值',
      render: (vo) =>
        isEnumType(vo.type) ? vo.type.value.map((e) => e.value).join(', ') : '',
    },
    {
      title: '默认值',
      render: (vo) => vo.defaultValue?.value || '',
    },
  ]),
];

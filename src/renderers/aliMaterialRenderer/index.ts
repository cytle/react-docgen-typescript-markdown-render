import { PropItemType } from 'react-docgen-typescript';
import { tableMdastBuilder } from '../../tableMdastBuilder';
import { emphasis, heading, inlineCode, text } from 'mdast-builder';
import { ComponentDocRenderer } from '../../types';
import * as y18n from 'y18n';
import * as path from 'path';

interface PropItemEnumType extends PropItemType {
  raw: string;
  value: Array<{ value: string }>;
}
const isEnumType = (type: PropItemType): type is PropItemEnumType =>
  type.name === 'enum' && Array.isArray(type.value);

const blackEnumTypeList = ['boolean', 'RaxNode', 'ReactNode'];
const isBlackEnumType = (type: PropItemType) =>
  blackEnumTypeList.includes(type.raw);

/**
 * alibaba materials style renderer
 * @see https://yuque.antfin-inc.com/mo/spec/spec-materials#CZiWi
 * @example
 * ``` md
 * ### Column

 * Form column.

 * | Param              | Description              | Type                                | Enum                            | Default |
 * | ------------------ | ------------------------ | ----------------------------------- | ------------------------------- | ------- |
 * | prop1              | prop1 description        | `string`                            |                                 | "red"   |
 * | prop2 _(required)_ | prop2 description        | `number`                            |                                 |         |
 * | prop3 _(required)_ | prop3 description a \| b | `() => void`                        |                                 |         |
 * | prop4 _(required)_ | prop4 description 中文   | `"option1" | "option2" | "option3"` | "option1", "option2", "option3" |         |
 * ```
 */
export const aliMaterialRenderer: ComponentDocRenderer = (componentDoc, { language } = {}) => {
  const { __ } = y18n({
    locale: language || 'en_US',
    directory: path.resolve(__dirname , '..', '..', '..', 'locales', 'aliMaterialRenderer'),
  });
  return [
    heading(3, text(componentDoc.displayName)),
    text(componentDoc.description),
    tableMdastBuilder(Object.values(componentDoc.props), [
      {
        title: __('Param'),
        render: (vo) =>
          vo.required
            ? [text(vo.name), text(' '), emphasis(text(`(${__('required')})`))]
            : vo.name,
      },
      {
        title: __('Description'),
        render: (vo) => vo.description,
      },
      {
        title: __('Type'),
        render: (vo) =>
          inlineCode(isEnumType(vo.type) ? vo.type.raw : vo.type.name),
      },
      {
        title: __('Enum'),
        render: (vo) =>
          isEnumType(vo.type) && !isBlackEnumType(vo.type)
            ? vo.type.value.map((e) => e.value).join(', ')
            : '',
      },
      {
        title: __('Default'),
        render: (vo) => vo.defaultValue?.value || '',
      },
    ]),
  ];
};

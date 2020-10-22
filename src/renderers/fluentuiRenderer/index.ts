import { tableMdastBuilder } from '../../tableMdastBuilder';
import { emphasis, heading, text } from 'mdast-builder';
import { ComponentDocRenderer } from '../../types';
import * as y18n from 'y18n';
import * as path from 'path';

/**
 * fluentui style renderer
 * @see https://developer.microsoft.com/en-us/fluentui#/controls/web/button#implementation
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
export const fluentuiRenderer: ComponentDocRenderer = (componentDoc, { language }) => {
  const { __ } = y18n({
    locale: language || 'en_US',
    directory: path.resolve(__dirname , '..', '..', '..', 'locales', 'fluentuiRenderer'),
  });
  return [
    heading(3, text(componentDoc.displayName)),
    text(componentDoc.description),
    heading(4, text('Props')),
    tableMdastBuilder(Object.values(componentDoc.props), [
      {
        title: __('Name'),
        render: (vo) =>
          vo.required
            ? [text(vo.name), text(' '), emphasis(text(`(${__('required')})`))]
            : vo.name,
      },
      {
        title: __('Type'),
        render: (vo) => vo.type.name,
      },
      {
        title: __('Default value'),
        render: (vo) => vo.defaultValue?.value,
      },
      {
        title: __('Description'),
        render: (vo) => vo.description,
      },
    ]),
  ];
};

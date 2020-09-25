[![TypeScript version][ts-badge]][typescript-4-0]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][license]
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fcytle%2Freact-docgen-typescript-markdown-render%2Fbadge&style=flat)](https://actions-badge.atrox.dev/cytle/react-docgen-typescript-markdown-render/goto)


# react-docgen-typescript-markdown-render

[remark](https://github.com/remarkjs/remark) plugin to transform React component to Markdown by  [`react-docgen-typescript`](https://github.com/styleguidist/react-docgen-typescript)

## Getting Started

``` sh
yarn add -D react-docgen-typescript-markdown-render
```

``` ts
import * as remark from 'remark';
import * as reactDocgenTypescript from 'react-docgen-typescript-markdown-render';
import * as vfile from 'to-vfile';

const doc = vfile.readSync('README.md');
console.log(remark().use(reactDocgenTypescript).processSync(doc).contents);
```

The Component [`Column.tsx`](./__tests__/components/Column/Column.tsx)

``` tsx
import * as React from "react";
import { Component } from "react";

/**
 * Column properties.
 */
export interface IColumnProps {
  /** prop1 description */
  prop1?: string;
  /** prop2 description */
  prop2: number;
  /**
   * prop3 description
   */
  prop3: () => void;
  /** prop4 description */
  prop4: "option1" | "option2" | "option3";
}

/**
 * Form column.
 */
export class Column extends Component<IColumnProps> {
  render() {
    return <div>Test</div>;
  }
}
```

Convert the following Markdown:

``` markdown
# foo-components

## API

[Column](./Column.tsx "react-docgen-typescript:")
```

Into

``` markdown
# foo-components

## API

### Column

Form column.

#### props

| prop      | description            | type                                | default | required                      |
| --------- | ---------------------- | ----------------------------------- | ------- | ----------------------------- |
| **prop1** | prop1 description      | `string`                            | "red"   | :negative_squared_cross_mark: |
| **prop2** | prop2 description      | `number`                            | null    | :white_check_mark:            |
| **prop3** | prop3 description      | `() => void`                        | null    | :white_check_mark:            |
| **prop4** | prop4 description 中文 | `"option1" | "option2" | "option3"` | null    | :white_check_mark:            |
```

## Options

### `remark().use(reactDocgenTypescript[, options])`

#### render

Custom document rendering

``` ts
import * as remark from 'remark';
import * as reactDocgenTypescript from 'react-docgen-typescript-markdown-render';
import { ReactDocgenTypescriptRender } from 'react-docgen-typescript-markdown-render/build/types';
import * as vfile from 'to-vfile';
import * as stringWidth from 'string-width';

const tableRender = (componentDoc: ComponentDoc): Table => mdastTableBuilder([
  ['属性', '描述', '类型', '默认值'],
  ...Object.values(componentDoc.props).map((vo) =>
    [
      u('strong', [u('text', vo.name)]),
      vo.description,
      u('inlineCode', vo.type.name),
      vo.defaultValue ? vo.defaultValue.value : '-',
    ]
  )
]);

const render: ReactDocgenTypescriptRender = (docs) => u('root', docs.map(vo => tableRender(vo)));;

const doc = vfile.readSync('README.md');

const { contents } = remark()
  .use({
    settings: { stringLength: stringWidth }
  })
  .use(reactDocgenTypescript, { render })
  .processSync(doc);
console.log(contents);
```

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.0-blue.svg
[typescript-4-0]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2012.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v12.x/docs/api/
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE

[![TypeScript version][ts-badge]][typescript-4-0]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][license]
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fcytle%2Freact-docgen-typescript-markdown-render%2Fbadge&style=flat)](https://actions-badge.atrox.dev/cytle/react-docgen-typescript-markdown-render/goto)

# react-docgen-typescript-markdown-render

Markdown render for [`react-docgen-typescript`](https://github.com/styleguidist/react-docgen-typescript)

## Getting Started

``` sh
yarn add react-docgen-typescript-markdown-render
```

``` ts
import { markdownRender } from 'react-docgen-typescript-markdown-render';
import * as path from 'path';
import { parse } from 'react-docgen-typescript';

const componentDocs = parse('Column.tsx', {
  savePropValueAsString: true,
})
console.log(markdownRender(componentDocs));
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

Into

``` markdown
### Column

Form column.

#### Props

| Name               | Type                                | Default value | Description              |
| ------------------ | ----------------------------------- | ------------- | ------------------------ |
| prop1              | string                              | "red"         | prop1 description        |
| prop2 _(required)_ | number                              |               | prop2 description        |
| prop3 _(required)_ | () => void                          |               | prop3 description a \| b |
| prop4 _(required)_ | "option1" \| "option2" \| "option3" |               | prop4 description 中文   |
```

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.0-blue.svg
[typescript-4-0]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2012.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v12.x/docs/api/
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE

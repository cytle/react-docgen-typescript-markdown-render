import { markdownRender } from '../src';
import { readFileSync } from 'fs-extra';
import * as path from 'path';
import { parse } from 'react-docgen-typescript';
import { renderers } from '../src/renderers/index';

describe('markdownRender', () => {
  it('default renderer', () => {
    const componentPath = path.resolve(__dirname, 'components', 'Column');
    const componentDocs = parse(path.resolve(componentPath, 'Column.tsx'), {
      savePropValueAsString: true,
    })
    expect(markdownRender(componentDocs))
      .toBe(
        readFileSync(
          path.join(componentPath, 'fluentuiRenderer.md'),
          'utf-8',
        ),
      );
  });

  it('aliMaterialRenderer', () => {
    const componentPath = path.resolve(__dirname, 'components', 'Column');
    const componentDocs = parse(path.resolve(componentPath, 'Column.tsx'), {
      shouldExtractValuesFromUnion: true,
      savePropValueAsString: true,
    })
    const content = markdownRender(componentDocs, { renderer: renderers.aliMaterialRenderer });
    console.log(content);

    expect(content)
      .toBe(
        readFileSync(
          path.join(componentPath, 'aliMaterialRenderer.md'),
          'utf-8',
        ),
      );
  });
});

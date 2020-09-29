import { markdownRender } from '../src';
import { readFileSync } from 'fs-extra';
import * as path from 'path';
import { parse } from 'react-docgen-typescript';

describe('markdownRender', () => {
  it('parse Column.tsx', () => {
    const componentPath = path.resolve(__dirname, 'components', 'Column');
    const componentDocs = parse(path.resolve(componentPath, 'Column.tsx'), {
      savePropValueAsString: true,
    })
    expect(markdownRender(componentDocs))
      .toBe(
        readFileSync(
          path.join(componentPath, 'default.md'),
          'utf-8',
        ),
      );
  });
});

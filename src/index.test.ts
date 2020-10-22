import { markdownRender } from './index';
import { readFileSync } from 'fs-extra';
import * as path from 'path';
import { parse } from 'react-docgen-typescript';

const componentPath = path.resolve(__dirname, '..', '__tests__', 'components', 'Column');
describe('markdownRender default', () => {
  it('should render as fluentuiRenderer', () => {
    const componentDocs = parse(path.resolve(componentPath, 'Column.tsx'), {
      savePropValueAsString: true,
    });
    const content = markdownRender(componentDocs);

    expect(content)
      .toBe(
        readFileSync(
          path.resolve(__dirname, 'renderers', 'fluentuiRenderer', 'Column-en_US.md'),
          'utf-8',
        ),
      );
  });
});

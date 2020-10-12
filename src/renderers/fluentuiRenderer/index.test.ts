import { markdownRender } from '../../../src';
import { readFileSync } from 'fs-extra';
import * as path from 'path';
import { parse } from 'react-docgen-typescript';
import { fluentuiRenderer } from './index';

const componentPath = path.resolve(__dirname, '..', '..', '..', '__tests__', 'components', 'Column');
describe('fluentuiRenderer', () => {
  it('default', () => {
    const componentDocs = parse(path.resolve(componentPath, 'Column.tsx'), {
      savePropValueAsString: true,
    });
    const content = markdownRender(componentDocs, { renderer: fluentuiRenderer });

    expect(content)
      .toBe(
        readFileSync(
          path.join(__dirname, 'Column-en_US.md'),
          'utf-8',
        ),
      );
  });

  it('zh_CN', () => {
    const componentDocs = parse(path.resolve(componentPath, 'Column.tsx'), {
      savePropValueAsString: true,
    });
    const content = markdownRender(componentDocs, { renderer: fluentuiRenderer, language: 'zh_CN' });

    expect(content)
      .toBe(
        readFileSync(
          path.join(__dirname, 'Column-zh_CN.md'),
          'utf-8',
        ),
      );
  });
});

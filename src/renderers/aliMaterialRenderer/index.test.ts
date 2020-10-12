import { markdownRender } from '../../../src';
import { readFileSync } from 'fs-extra';
import * as path from 'path';
import { parse } from 'react-docgen-typescript';
import { aliMaterialRenderer } from './index';

const componentPath = path.resolve(__dirname, '..', '..', '..', '__tests__', 'components', 'Column');
describe('aliMaterialRenderer', () => {
  it('default', () => {
    const componentDocs = parse(path.resolve(componentPath, 'Column.tsx'), {
      shouldExtractValuesFromUnion: true,
      savePropValueAsString: true,
    });
    const content = markdownRender(componentDocs, { renderer: aliMaterialRenderer });

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
      shouldExtractValuesFromUnion: true,
      savePropValueAsString: true,
    });
    const content = markdownRender(componentDocs, { renderer: aliMaterialRenderer, language: 'zh_CN' });

    expect(content)
      .toBe(
        readFileSync(
          path.join(__dirname, 'Column-zh_CN.md'),
          'utf-8',
        ),
      );
  });
});

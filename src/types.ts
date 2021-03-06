import { ComponentDoc } from 'react-docgen-typescript';
import { Node } from 'unist';
import * as remarkStringify from 'remark-stringify';

export interface RendererOptions {
  /**
   * language
   * @default "en_US"
   */
  language?: 'zh_CN' | 'en_US';
}

export interface MarkdownRenderOptions extends RendererOptions {
  /**
   * @default renderers.fluentuiRenderer
   */
  renderer?: ComponentDocRenderer;
  remarkStringify?: remarkStringify.PartialRemarkStringifyOptions;
}

export type ComponentDocRenderer = (doc: ComponentDoc, options: RendererOptions) => Node[];

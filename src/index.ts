import { Node } from 'unist';
import { root } from 'mdast-builder';
import { ComponentDoc } from 'react-docgen-typescript';
import * as remarkStringify from 'remark-stringify';
import * as stringWidth from 'string-width';
import * as unified from 'unified';
import { renderers } from './renderers/index';
import { ComponentDocRenderer, MarkdownRenderOptions, RendererOptions } from './types';
export * from './renderers';
export * from './tableMdastBuilder';

export const componentDocsMdastBuilder = (
  docs: ComponentDoc[],
  renderer: ComponentDocRenderer = renderers.fluentuiRenderer,
  options?: RendererOptions,
): Node[] => [].concat(...docs.map(vo => renderer(vo, options)));

export const markdownRender = (
  docs: ComponentDoc[],
  { remarkStringify: remarkStringifyOptions, renderer, ...options }: MarkdownRenderOptions = {}
): string => unified()
  .use(
    remarkStringify,
    { stringLength: stringWidth, ...remarkStringifyOptions },
  )
  .stringify(
    root(componentDocsMdastBuilder(docs, renderer, options)),
  );

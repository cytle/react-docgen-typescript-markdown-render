import { ComponentDoc } from 'react-docgen-typescript';
import * as u from 'unist-builder';
import * as remarkStringify from 'remark-stringify';
import * as stringWidth from 'string-width';
import * as unified from 'unified';
import { mdastBuilder } from './mdastBuilder';
export * from './mdastBuilder';

export const markdownRender = (docs: ComponentDoc[], options?: remarkStringify.PartialRemarkStringifyOptions): string => unified()
  .use(remarkStringify, { stringLength: stringWidth, ...options }).stringify(u('root', mdastBuilder(docs)));

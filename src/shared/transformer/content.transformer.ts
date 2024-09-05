import { TransformFnParams } from 'class-transformer';
import { FilterXSS } from 'xss';
import { allowedHtmlTagsConstant } from '../constant/allowed-html-tags.constant';

export function htmlTransformer(items: TransformFnParams): string {
  const xss = new FilterXSS({
    whiteList: allowedHtmlTagsConstant,
    css: false,
    allowCommentTag: false,
    stripIgnoreTag: true,
  });

  return xss.process(items.value);
}

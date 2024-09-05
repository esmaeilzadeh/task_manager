import { TransformFnParams } from 'class-transformer';

export function booleanTransformer(items: TransformFnParams): boolean {
  const data = items.value;

  if (data === 'true') {
    return true;
  } else if (data === 'false') {
    return false;
  }
}

import { TransformFnParams } from 'class-transformer';

export function numberArrayQueryTransformer(
  items: TransformFnParams,
): number[] {
  const data = items.value;

  return Array.isArray(data)
    ? data.map((item) => Number(item))
    : [Number(data)];
}

export function numberArrayBodyTransformer(items: TransformFnParams): number[] {
  const data = JSON.parse(items.value);

  return Array.isArray(data)
    ? data.map((item) => Number(item))
    : [Number(data)];
}

export function stringArrayQueryTransformer(
  items: TransformFnParams,
): string[] {
  const data = items.value;

  return Array.isArray(data)
    ? data.map((item) => String(item))
    : [String(data)];
}

export function stringArrayBodyTransformer(items: TransformFnParams): string[] {
  const data = JSON.parse(items.value);

  return Array.isArray(data)
    ? data.map((item) => String(item))
    : [String(data)];
}

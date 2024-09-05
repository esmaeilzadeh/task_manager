import { mapAsync } from './mapAsync';

export async function flatMapAsync<T, U>(
  arr: T[],
  mapper: (item: T) => Promise<U[]>,
): Promise<U[]> {
  const results = await mapAsync(arr, mapper);
  return results.flat();
}

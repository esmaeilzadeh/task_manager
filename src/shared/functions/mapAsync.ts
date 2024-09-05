export async function mapAsync<T, U>(
  arr: T[],
  mapper: (item: T) => Promise<U>,
): Promise<U[]> {
  return Promise.all(arr.map(mapper));
}

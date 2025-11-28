export interface ITransactionManager {
  execute<T>(work: (em: any) => Promise<T>): Promise<T>;
}

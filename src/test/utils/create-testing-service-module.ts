import { Test, TestingModule } from '@nestjs/testing';

export async function createServiceTestingModule<T>(
  service: new (...args: any[]) => T,
  providers: any[] = [],
): Promise<{ service: T; module: TestingModule }> {
  const module: TestingModule = await Test.createTestingModule({
    providers: [service, ...providers],
  }).compile();

  return {
    service: module.get<T>(service),
    module,
  };
}

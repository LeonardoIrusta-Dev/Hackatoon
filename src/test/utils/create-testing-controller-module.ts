import { Test, TestingModule } from '@nestjs/testing';

export async function createControllerTestingModule(
  controllerClass: any,
  providers: any[] = [],
) {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [controllerClass],
    providers,
  }).compile();

  const controller = moduleRef.get(controllerClass);
  return { controller, moduleRef };
}

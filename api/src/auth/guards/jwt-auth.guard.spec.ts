import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../../shared/decorators/is-public/is-public.decorator';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new JwtAuthGuard(reflector);
  });

  const createContext = (handler?: Function, cls?: Function) => {
    return {
      getHandler: () => handler || (() => {}),
      getClass: () => cls || class {},
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as unknown as ExecutionContext;
  };

  it('should allow access for public routes', () => {
    const handler = () => {};
    Reflect.defineMetadata(IS_PUBLIC_KEY, true, handler);
    const context = createContext(handler);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should delegate to parent for non-public routes', () => {
    const context = createContext();
    const spy = jest.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(guard)), 'canActivate').mockReturnValue(true);

    guard.canActivate(context);

    expect(spy).toHaveBeenCalledWith(context);
    spy.mockRestore();
  });
});

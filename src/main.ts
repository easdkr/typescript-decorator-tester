import 'reflect-metadata';

export const CustomDecorator = (): MethodDecorator => {
  return (
    _: unknown,
    methodName: string | symbol,
    descriptor: TypedPropertyDescriptor<unknown>,
  ) => {
    const originalMethod = descriptor.value as () => unknown;

    function wrapper(this: unknown, ...args: unknown[]) {
      console.log('hi');

      const runOriginal = () => {
        originalMethod.apply(this, args);
        console.log('there');
      };

      return runOriginal;
    }

    descriptor.value = wrapper(originalMethod);

    Object.defineProperty(descriptor.value, 'name', {
      value: originalMethod.name,
      writable: false,
    });
  };
};

class CustomDecoratorTesterClass {
  @CustomDecorator()
  targetMethod() {
    console.log('hi there?');
  }
}

const instance = new CustomDecoratorTesterClass();

instance.targetMethod();

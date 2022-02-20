function Log(_: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const newDescriptor = {
    ...descriptor,
    value: function (...args: any[]): any {
      console.log(`Calling ${name} with arguments:`);
      console.dir(args);
      const result = descriptor.value.apply(this, args);
      console.log(`Result: `);
      console.dir(result);
      return result;
    },
  };

  return newDescriptor;
}

export const errorFormat = (error: unknown) => {
  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const result = error.response.data.details.reduce(
      (
        accumulator: {
          property: string[];
          messages: string[];
        },
        currentValue: {
          property: string;
          messages: string[];
        },
      ) => {
        const property = currentValue.property;
        const messages = currentValue.messages;
        return {
          property: [...accumulator.property, property],
          messages: [...accumulator.messages, ...messages],
        };
      },
      {
        property: new Array<string>(),
        messages: new Array<string>(),
      } as {
        property: string[];
        messages: string[];
      },
    ) as {
      property: string[];
      messages: string[];
    };
    return {
      property: result.property,
      messages: result.messages,
    };
  } else {
    return {
      property: [],
      messages: [],
    };
  }
};

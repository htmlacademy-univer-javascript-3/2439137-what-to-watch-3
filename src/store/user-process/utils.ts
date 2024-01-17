export interface Details {
  messages: string[];
  property: string;
  value: string;
}

export const errorFormat = (error: Details[]) => {
  if (error) {
    const result = Array.from(error).reduce(
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

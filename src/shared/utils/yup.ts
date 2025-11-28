import * as yup from 'yup';

export const getYupSchemaFields = <T extends yup.AnyObjectSchema>(
  schema: T,
): (keyof yup.InferType<T>)[] => {
  return Object.keys(schema.fields) as (keyof yup.InferType<T>)[];
};

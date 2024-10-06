import React, { useReducer } from 'react';
import {
  DeepPartial,
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { TField } from '../model';
import { Stack, StackProps } from '@mantine/core';
import RenderElements from '../render/render-elements';

interface Props<T extends FieldValues> {
  fields: TField<T>[];
  onSubmit?: (values: T) => void;
  onChange?: (values: DeepPartial<T>) => void;
  resetOnSubmit?: boolean;
  wrapperProps?: StackProps;
  defaultValues?: UseFormProps<T>["defaultValues"];
  children?: React.ReactNode;
}
const FormBuilder = <T extends FieldValues>({
  fields,
  defaultValues,
  onSubmit,
  onChange,
  resetOnSubmit,
  wrapperProps,
  children
}: Props<T>) => {
  const [key, reset] = useReducer((value: number) => (value + 1) % 1000000, 0);
  const methods = useForm<T>({
    defaultValues,
    reValidateMode: "onChange",
  });
  React.useEffect(() => {
    const subscription = methods.watch((value) => onChange && onChange(value));
    return () => subscription.unsubscribe();
  }, [methods.watch]);
  //useRenderCount("FormBuilder");

  const handleOnSubmit = (data: T) => {
    onSubmit && onSubmit(data);
    if (resetOnSubmit) {
      methods.reset();
      reset();
    }
  };
  return (
    <FormProvider {...methods} key={key}>
      <form className="w-full" onSubmit={methods.handleSubmit(handleOnSubmit)}>
        <Stack {...wrapperProps}>
          {fields?.map((field, i) => (
            <RenderElements<T>
              key={`${field.name as string}-${i}`}
              element={field}
              methods={methods}
            />
          ))}
        </Stack>
        {children}
      </form>
    </FormProvider>
  );
};

export default FormBuilder;

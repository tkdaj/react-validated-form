import { IValidatedFormProps as StandardFormProps } from 'Form/models';
import { IValidatedReduxForm as ReduxFormProps } from 'Form/ValidatedReduxForm';

export { default as ValidatedForm } from './Form/ValidatedForm';
export { default as ValidatedReduxForm } from './Form/ValidatedReduxForm';
export { default as validatedForms } from './Form/validatedForm.reducer';
export type IValidatedForm = StandardFormProps;
export type IValidatedReduxForm = ReduxFormProps;

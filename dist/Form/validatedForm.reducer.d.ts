import { IValidatedFormState } from './models';
import { ValidatedFormAction } from './validatedForm.actions';
export interface IValidatedForms {
    [formName: string]: IValidatedFormState;
}
declare const _default: (state: IValidatedForms | undefined, action: ValidatedFormAction) => IValidatedForms;
export default _default;
//# sourceMappingURL=validatedForm.reducer.d.ts.map
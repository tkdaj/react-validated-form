import React from 'react';
import { IApplicationState } from 'store';
import { ValidatedReduxForm as IValidatedReduxForm } from '../Form/ValidatedReduxForm';
import { DemoState } from './sharedFormFields';
import './demo.scss';
declare const mapState: (state: IApplicationState) => {
    reduxForms: import("../Form/validatedForm.reducer").IValidatedForms;
};
declare type DemoProps = ReturnType<typeof mapState>;
export declare class ReduxFormDemo extends React.Component<DemoProps, DemoState> {
    state: DemoState;
    formRef: React.RefObject<IValidatedReduxForm>;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof ReduxFormDemo, Pick<React.ClassAttributes<ReduxFormDemo> & {
    reduxForms: import("../Form/validatedForm.reducer").IValidatedForms;
}, "ref" | "key">>;
export default _default;
//# sourceMappingURL=ReduxFormDemo.d.ts.map
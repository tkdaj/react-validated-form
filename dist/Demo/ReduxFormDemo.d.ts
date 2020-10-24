import React from 'react';
import { IApplicationState } from 'store';
import { ValidatedReduxForm as IValidatedReduxForm } from '../Form/ValidatedReduxForm';
import './demo.scss';
declare type DemoState = {
    standardFormData: string;
    thecheckbox: boolean;
    theradios: string;
    theradios2: string;
    input1: string;
    input2: string;
    theselect: string;
};
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
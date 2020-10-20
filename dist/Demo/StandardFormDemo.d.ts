import React from 'react';
import ValidatedForm from '../Form/ValidatedForm';
declare type DemoState = {
    standardFormData: string;
    thecheckbox: boolean;
    theradios: string;
    theradios2: string;
    input1: string;
    input2: string;
    theselect: string;
};
export default class StandardFormDemo extends React.Component<{}, DemoState> {
    state: DemoState;
    standardFormRef: React.RefObject<ValidatedForm>;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=StandardFormDemo.d.ts.map
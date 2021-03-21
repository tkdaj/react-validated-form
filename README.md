## ValidatedForms

This project includes both a ValidatedReduxForm and a regular ValidatedForm.
The purpose of both is to take the headache out of validating forms for you!
All you need to do is use one of these components instead of a regular `<form>` tag,
and use standard html validation on your fields (like required, pattern, min, max, etc)
and the component keeps track of your errors for you. You can also add custom error messages
and a custom function for validation logic per field.
The only standard form property this component doesn't accept is "onSubmit". That is because
it has it's own onSubmit function, and after validating the data, it will either fire the
`onValidSubmissionAttempt` or the `onInvalidSubmissionAttempt`.

Here is an example:

```typescript

    import { ValidatedReduxForm } from '@tkdaj/react-validated-form';
    import { TextField } from '@material-ui/core';

    <ValidatedReduxForm
        name="testForm"
        noValidate
        customValidators={{
          input1: {
              errorText: "Please enter a valid number."
          },
          theradios: {
            errorText: "You messed up. The correct answer is 3!",
            isValid: (e) => e.taget.value === '3'
          },
        }}
        onValidSubmissionAttempt={(e, formValues) => {
          console.log("valid submission", formValues);
        }}
        onInvalidSubmissionAttempt={(e, formValues) => {
          console.log("invalid submission", formValues);
        }}
      >
        <input
          checked={this.state.thecheckbox}
          onChange={e => this.setState({ thecheckbox: e.target.checked })}
          name="thecheckbox"
          type="checkbox"
          required
        />
        <label htmlFor="theradios">
          <input
            checked={this.state.theradios === '1'}
            onChange={e => this.setState({ theradios: e.target.value })}
            id="theradios"
            name="theradios"
            required
            type="radio"
            value="1"
          />
          <input
            checked={this.state.theradios === '2'}
            onChange={e => this.setState({ theradios: e.target.value })}
            name="theradios"
            type="radio"
            value="2"
          />
          <input
            checked={this.state.theradios === '3'}
            onChange={e => this.setState({ theradios: e.target.value })}
            name="theradios"
            type="radio"
            value="3"
          />
        </label>
        <TextField
          name="input1"
          value={this.state.input1}
          onChange={e => this.setState({ input1: e.target.value })}
          margin="dense"
          label="Input 1"
          type="text"
          required
          inputProps={{ pattern: '\\d+' }}
        />
        <label htmlFor="theselect">Dropdown</label>
        <select
          value={this.state.theselect}
          onChange={e => this.setState({ theselect: e.target.value })}
          onBlur={e => this.setState({ theselect: e.target.value })}
          required
          name="theselect"
          id="theselect"
        >
          <option value="">Default</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button type="submit">Submit</button>
        <button onClick={this.formRef?.current?.resetFormSubmitted} type="button">
          Reset form submitted value
        </button>
      <ValidatedReduxForm />
```

## API

All regular attributes which can be applied to a form work here too except for onSubmit

`name`: required for the form as well as ALL validatable fields -- If you do not have a name on a field, you will get a warning logged to your console. Since sometimes it is difficult or impossible to add a name to a field (when using third party libraries), the next prop is available to mute those warnings.
<br /><br />
`onInvalidSubmissionAttempt`: If a submission is attempted, but it is invalid, this funcion will be called. Two parameters are passed - the submit event object and the object containing the validated form's values and errors.
<br /><br />
`onValidSubmissionAttempt`: If a submission is attempted, and it is valid, this funcion will be called. Two parameters are passed - the submit event object and the object containing the validated form's values and errors.
<br /><br />
`hideNameWarnings` `optional` as described in the `name` section of this API, names are required, so you will get a warning logged to the console if one of your fields is missing a name by default. You can turn this off by setting `hideNameWarnings` to `true`.
<br /><br />
`formErrorClass`: `optional` Specific error class to be applied to the entire form
<br /><br />
`customValidators`: `optional` An object which can contain custom error messages or validation logic within an `isValid` function. It should be shaped like this: <br />

```typescript
customValidators: {
    [fieldName: string]: {
      isValid?: (value: any) => boolean;
      errorText?: string;
    };
};
```

If you don't supply any custom error text, then the default HTML5 error text will be used.

<br />

`onFormChanged`: `optional` `[ValidatedForm ONLY]` It fires any time a form value is changed and the function is shaped as follows:

```typescript
  onFormChanged?: (
    updatedField: HTMLFormElement,
    updatedFormState: IValidatedFormState
  ) => void;
```

<br />

## Data Structure

A single form follows the shape shown in `IValidatedFormState` shown here:

```typescript
export interface IValidatedFormState {
  submissionAttempted: boolean;
  formIsValid: boolean;
  formValues: FormValues;
}

export type FormValues = {
  [fieldName: string]: {
    value: any;
    error: string;
  };
};
```

## Using Without Redux

To use the standard `ValidatedForm` without redux, you use it in place of a normal `<form>` tag.
Since the non-redux form does not have access to a global store to store the validated data in,
there are 2 methods specifically added to `ValidatedForm` which are meant to be accessed from
outside the form:
`getFormData` and `resetFormSubmitted`
In order to access these, create a ref object using `React.createRef()` or the `useRef(null)` hook.
Then, add the created ref to your `ValidatedForm` like:

```typescript
import { ValidatedForm } from '@tkdaj/react-validated-form';
<ValidatedForm name="myForm" ref={this.myFormRef} />;
```

Once you have done that you can access the function using the ref. For example:
`this.myFormRef.current.getFormData()` or `this.myFormRef.current.resetFormSubmitted()`

## Using With Redux

Since all of the form data is stored inside redux with this component, there is no need for
an accessible `getFormData` function as shown in the "Using Without Redux" section above, but
`resetFormSubmitted` is still publicly available. In order to access it use a ref as shown
in the instructions above under "Using Without Redux". For simplicity, all forms are stored
inside redux under the name: validatedForms. If you want to get data from a form it will be
`validatedForms.myFormName` where `myFormName` is the name of one of your `ValidatedReduxForm`s.
The only boilerplate you need to do to set this up other than using the component is:

```typescript
import { validatedForms } from '@tkdaj/react-validated-form';
// important! You must use the name 'validatedForms' when adding it to your store otherwise the ValidatedReduxForm component won't be able to update the proper values
```

In the case of both redux and non-redux forms you should store the form field's values and set their onChange like normal.
See src/Demo/ReduxFormDemo.tsx or src/Demo/StandardFormDemo.tsx for more information.

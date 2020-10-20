## ValidateForms

This project includes both a ValidateReduxForm and a regular ValidatedForm.
The purpose of both is to take the headache out of validating forms for you!
All you need to do is use one of these components instead of a regular `<form>` tag,
and use standard html validation on your fields (like required, pattern, min, max, etc)
and the component keeps track of your errors for you. You can also add custom error messages
and a custom function for validation logic per field. Here is an example:

```typescript

    import { ValidatedReduxForm } from '@tkdaj/react-validated-form';

    <ValidatedReduxForm
        name="testForm"
        noValidate
        customValidators={{
          field1: {
            errorText: "You messed up",
          },
          field2: {
              errorText: "Please enter a valid number."
              isValid: (e) => !isNaN(parseInt(e.value))
          }
        }}
        onValidSubmissionAttempt={(e, formValues) => {
          console.log("valid submission");
        }}
        onInvalidSubmissionAttempt={(e, formValues) => {
          console.log("invalid submission");
        }}
      >
```

The only standard form property this component doesn't accept is "onSubmit". That is because
it has it's own onSubmit function, and after validating the data, it will either fire the
`onValidSubmissionAttempt` or the `onInvalidSubmissionAttempt`.

## API

All regular attributes which can be applied to a form works here too except for onSubmit

`name`: required for the form as well as ALL validatable fields <br />
`formErrorClass`: `optional` Specific error class to be applied to the entire form <br />
`onInvalidSubmissionAttempt`: If the form is submitted, but is invalid, this funcion will be called. Two parameters are passed - the submit event object and the object containing the validated form's values and errors. <br />
`onValidSubmissionAttempt`: If the form is submitted and is valid this funcion will be called. Two parameters are passed - the submit event object and the object containing the validated form's values and errors. <br />
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
there is a method specifically added to `ValidatedForm` which is meant to be accessed from
outside the form:
`getFormData`
In order to access this, create a ref object using `React.createRef()` or the `useRef(null)` hook.
Then, add the created ref to your `ValidatedForm` like:

```typescript
import { ValidatedForm } from '@tkdaj/react-validated-form';
<ValidatedForm name="myForm" ref={this.myFormRef} />;
```

Once you have done that you can access the function using the ref. For example:
`this.myFormRef.current.getFormData()`

## Using With Redux

Since all of the form data is stored inside redux with this component, there is no publicly
accessible `getFormData` function as shown in the "Using Without Redux" section above.
For simplicity, all forms are stored inside redux under the name: validatedForms.
If you want to get data from a form it will be `validatedForms.myFormName` where `myFormName`
is the name of one of your `ValidatedReduxForm`s. The only boilerplate you need to do to
set this up other than using the component is:

```typescript
import { validatedForms } from '@tkdaj/react-validated-form';
// important! You must use the name 'validatedForms' when adding it to your store otherwise the ValidatedReduxForm component won't be able to update the proper values`
```

In the case of both redux and non-redux forms you should store the form field's values and set their onChange like normal.
See src/Demo/ReduxFormDemo.tsx or src/Demo/StandardFormDemo.tsx for more information.

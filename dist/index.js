import t from"react";import{connect as e}from"react-redux";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)};function r(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}var a=function(){return(a=Object.assign||function(t){for(var e,o=1,r=arguments.length;o<r;o++)for(var a in e=arguments[o])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)};function n(t,e){var o={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(t);a<r.length;a++)e.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(t,r[a])&&(o[r[a]]=t[r[a]])}return o}var i=["BUTTON"],s=function(t){return!i.includes(t.tagName)},m=function(t){return t?Array.from(t.elements).filter((function(t){return s(t)})):[]},l=function(t,e){var o,r,a=t.value,n=t.type,i=t.checked,s=t.name;"checkbox"===n&&(a=i),t.setCustomValidity("");var m=null===(o=e.customValidators[s])||void 0===o?void 0:o.isValid,l=m?m(a):t.checkValidity(),u=null===(r=e.customValidators[s])||void 0===r?void 0:r.errorText;return u?l||t.setCustomValidity(u):u=t.validationMessage,{value:a,error:l?"":u}},u=function(e){function o(){var o=null!==e&&e.apply(this,arguments)||this;return o.state={validationData:{submissionAttempted:!1,formIsValid:!1,formValues:{}}},o.formRef=t.createRef(),o.onFormSubmit=function(t){t.preventDefault(),o.setState((function(t){return{validationData:a(a({},t.validationData),{submissionAttempted:!0})}}),(function(){var e,r,n,i,s,m,l;o.state.validationData.formIsValid?null===(r=null===(e=o.props)||void 0===e?void 0:e.onValidSubmissionAttempt)||void 0===r||r.call(e,t,a({},o.state.validationData.formValues)):null===(i=null===(n=o.props)||void 0===n?void 0:n.onInvalidSubmissionAttempt)||void 0===i||i.call(n,t,a({},o.state.validationData.formValues)),null===(m=(s=o.props).onFormChanged)||void 0===m||m.call(s,null===(l=o.formRef)||void 0===l?void 0:l.current,o.state.validationData)}))},o.getFormData=function(){return o.state},o.resetFormSubmitted=function(){return o.setState((function(t){return{validationData:a(a({},t.validationData),{submissionAttempted:!1})}}))},o}return r(o,e),o.prototype.componentDidMount=function(){var t,e=this,o={};m(null===(t=this.formRef)||void 0===t?void 0:t.current).forEach((function(t){var r,a;t.name?((null===(r=e.props.customValidators[t.name])||void 0===r?void 0:r.isValid)&&!(null===(a=e.props.customValidators[t.name])||void 0===a?void 0:a.errorText)&&console.warn("A custom error message must be provided when using a custom isValid function for field:",t),o[t.name]=l(t,e.props)):s(t)&&!e.props.hideNameWarnings&&console.warn("You must have a name on all form fields within ValidatedForm",t)})),this.setState({validationData:{submissionAttempted:!1,formValues:o,formIsValid:!Object.values(o).find((function(t){return t.error}))}},(function(){var t,o;null===(o=(t=e.props).onFormChanged)||void 0===o||o.call(t,e.formRef.current,e.state.validationData)}))},o.prototype.componentDidUpdate=function(){var t=this,e=m(this.formRef.current),o=e.reduce((function(e,o){if(o.name)if(t.state.validationData.formValues[o.name]){var r="checkbox"===o.type,a="radio"===o.type;(a&&o.checked&&t.state.validationData.formValues[o.name].value!==o.value||r&&t.state.validationData.formValues[o.name].value!==o.checked||!a&&!r&&t.state.validationData.formValues[o.name].value!==o.value)&&(e[o.name]=l(o,t.props))}else e[o.name]=l(o,t.props);return e}),{}),r=Object.keys(this.state.validationData.formValues).filter((function(t){return!e.find((function(e){return!e.name||e.name===t}))}));(Object.keys(o).length||r.length)&&this.setState((function(t){var e=a(a({},t.validationData.formValues),o);return r.forEach((function(t){return delete e[t]})),{validationData:a(a({},t.validationData),{formValues:e,formIsValid:!Object.values(e).find((function(t){return t.error}))})}}),(function(){var e,o;null===(o=(e=t.props).onFormChanged)||void 0===o||o.call(e,t.formRef.current,t.state.validationData)}))},o.prototype.render=function(){var e,o=this.props,r=(o.onInvalidSubmissionAttempt,o.onValidSubmissionAttempt,o.customValidators,o.className),i=o.children,s=o.formErrorClass,m=(o.onFormChanged,o.hideNameWarnings,n(o,["onInvalidSubmissionAttempt","onValidSubmissionAttempt","customValidators","className","children","formErrorClass","onFormChanged","hideNameWarnings"])),l=this.state.validationData,u=l.submissionAttempted,d=l.formIsValid,f=((e={"validated-form":!0,"validated-form-submission-attempted":Boolean(u)})[s]=!d,e[r]=Boolean(r),e),p=Object.keys(f).filter((function(t){return f[t]})).join(" ");return t.createElement("form",a({},m,{ref:this.formRef,onSubmit:this.onFormSubmit,className:p}),i)},o.defaultProps={customValidators:{},hideNameErrors:!1,formErrorClass:"validated-form-error"},o}(t.Component),d="UPDATE_VALIDATED_FORM",f="CLEAR_VALIDATED_FORM",p="INIT_VALIDATED_FORM",c=e((function(t){return{reduxForms:t.validatedForms}}),{updateValidatedForm:function(t){var e=t.newFormState,o=t.formName;return{type:d,payload:{formName:o,newFormState:e}}}},null,{forwardRef:!0})(function(e){function o(){var o=null!==e&&e.apply(this,arguments)||this;return o.formRef=t.createRef(),o.onFormSubmit=function(t){var e,r,n,i;t.preventDefault();var s=a(a({},o.props.reduxForms[o.props.name]),{submissionAttempted:!0});o.props.updateValidatedForm({formName:o.props.name,newFormState:s}),o.props.reduxForms[o.props.name].formIsValid?null===(r=null===(e=o.props)||void 0===e?void 0:e.onValidSubmissionAttempt)||void 0===r||r.call(e,t,a({},s.formValues)):null===(i=null===(n=o.props)||void 0===n?void 0:n.onInvalidSubmissionAttempt)||void 0===i||i.call(n,t,a({},s.formValues))},o.resetFormSubmitted=function(){var t=a(a({},o.props.reduxForms[o.props.name]),{submissionAttempted:!1});o.props.updateValidatedForm({formName:o.props.name,newFormState:t})},o}return r(o,e),o.prototype.componentDidMount=function(){var t,e=this,o={};m(null===(t=this.formRef)||void 0===t?void 0:t.current).forEach((function(t){var r,a;t.name?((null===(r=e.props.customValidators[t.name])||void 0===r?void 0:r.isValid)&&!(null===(a=e.props.customValidators[t.name])||void 0===a?void 0:a.errorText)&&console.warn("A custom error message must be provided when using a custom isValid function for field:",t),o[t.name]=l(t,e.props)):s(t)&&!e.props.hideNameWarnings&&console.warn("You must have a name on all form fields within ValidatedForm",t)})),this.props.updateValidatedForm({formName:this.props.name,newFormState:{submissionAttempted:!1,formIsValid:!Object.values(o).find((function(t){return t.error})),formValues:o}})},o.prototype.componentDidUpdate=function(){var t=this,e=this.props.reduxForms[this.props.name],o=m(this.formRef.current),r=o.reduce((function(o,r){if(r.name){var a=e.formValues;if(a[r.name]){var n="checkbox"===r.type,i="radio"===r.type;(i&&r.checked&&a[r.name].value!==r.value||n&&a[r.name].value!==r.checked||!i&&!n&&a[r.name].value!==r.value)&&(o[r.name]=l(r,t.props))}else o[r.name]=l(r,t.props)}return o}),{}),n=Object.keys(e.formValues).filter((function(t){return!o.find((function(e){return!e.name||e.name===t}))}));if(Object.keys(r).length||n.length){var i=a(a({},e.formValues),r);n.forEach((function(t){return delete i[t]})),this.props.updateValidatedForm({formName:this.props.name,newFormState:a(a({},e),{formValues:i,formIsValid:!Object.values(i).find((function(t){return t.error}))})})}},o.prototype.render=function(){var e,o=this.props,r=(o.onInvalidSubmissionAttempt,o.onValidSubmissionAttempt,o.updateValidatedForm,o.customValidators,o.className),i=o.children,s=o.reduxForms,m=o.name,l=o.formErrorClass,u=(o.hideNameWarnings,n(o,["onInvalidSubmissionAttempt","onValidSubmissionAttempt","updateValidatedForm","customValidators","className","children","reduxForms","name","formErrorClass","hideNameWarnings"])),d=s[m],f=((e={"validated-form":!0,"validated-form-submission-attempted":Boolean(null==d?void 0:d.submissionAttempted)})[l]=!(null==d?void 0:d.formIsValid),e[r]=Boolean(r),e),p=Object.keys(f).filter((function(t){return f[t]})).join(" ");return t.createElement("form",a({},u,{ref:this.formRef,onSubmit:this.onFormSubmit,className:p}),i)},o.defaultProps={customValidators:{},hideNameErrors:!1,formErrorClass:"validated-form-error"},o}(t.Component)),v={},h=function(t,e){var o;if(void 0===t&&(t=v),[p,f,d].includes(e.type)){var r=e.payload,n=r.formName,i=r.newFormState;switch(e.type){case d:return a(a({},t),((o={})[n]=a({},i),o));default:return t}}return t};export{u as ValidatedForm,c as ValidatedReduxForm,h as validatedForms};
//# sourceMappingURL=index.js.map

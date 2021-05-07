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
***************************************************************************** */var o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)};function a(t,e){function a(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}var r=function(){return(r=Object.assign||function(t){for(var e,o=1,a=arguments.length;o<a;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};function n(t,e){var o={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(o[a]=t[a]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(t);r<a.length;r++)e.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(t,a[r])&&(o[a[r]]=t[a[r]])}return o}var i=["BUTTON","OBJECT","FIELDSET"],s=function(t,e){if(void 0===e&&(e=!1),!t)return[];var o=Array.from(t.elements).filter((function(t){return function(t){return!i.includes(t.tagName)}(t)})),a=new Set;return o.forEach((function(o){a.has(o.name)&&"radio"!==o.type&&!e&&console.error('All fields within a ValidatedForm must have unique names (except radio buttons).\n        Field with name "'+o.name+'" '+(t.name?'within the form "'+t.name+'" ':"")+"is a duplicate"),a.add(o.name)})),o},l=function(t,e,o){var a,r,n,i;void 0===o&&(o=[]);var s=t.value,l=t.type,m=t.checked,u=t.name;"checkbox"===l&&(s=m),"radio"===l&&(s=null!==(r=null===(a=null==o?void 0:o.filter((function(t){return t.name===u})).find((function(t){return t.checked})))||void 0===a?void 0:a.value)&&void 0!==r?r:null),t.setCustomValidity("");var d=null===(n=e.customValidators[u])||void 0===n?void 0:n.isValid,p=d?d(s):t.checkValidity(),f=null===(i=e.customValidators[u])||void 0===i?void 0:i.errorText;return f?p||t.setCustomValidity(f):f=t.validationMessage,{value:s,error:p?"":f}},m=function(e){function o(){var o=null!==e&&e.apply(this,arguments)||this;return o.state={validationData:{submissionAttempted:!1,formIsValid:!1,formValues:{}}},o.formRef=t.createRef(),o.onFormSubmit=function(t){t.preventDefault(),o.setState((function(t){return{validationData:r(r({},t.validationData),{submissionAttempted:!0})}}),(function(){var e,a,n,i,s,l,m;o.state.validationData.formIsValid?null===(a=null===(e=o.props)||void 0===e?void 0:e.onValidSubmissionAttempt)||void 0===a||a.call(e,t,r({},o.state.validationData.formValues)):null===(i=null===(n=o.props)||void 0===n?void 0:n.onInvalidSubmissionAttempt)||void 0===i||i.call(n,t,r({},o.state.validationData.formValues)),null===(l=(s=o.props).onFormChanged)||void 0===l||l.call(s,null===(m=o.formRef)||void 0===m?void 0:m.current,o.state.validationData)}))},o.getFormData=function(){return o.state},o.resetFormSubmitted=function(){o.setState((function(t){return{validationData:r(r({},t.validationData),{submissionAttempted:!1})}}),(function(){var t,e;null===(e=(t=o.props).onFormChanged)||void 0===e||e.call(t,o.formRef.current,o.state.validationData)}))},o}return a(o,e),o.prototype.componentDidMount=function(){var t,e=this,o={};s(null===(t=this.formRef)||void 0===t?void 0:t.current,this.props.hideNameWarnings).forEach((function(t){var a,r;t.name&&((null===(a=e.props.customValidators[t.name])||void 0===a?void 0:a.isValid)&&!(null===(r=e.props.customValidators[t.name])||void 0===r?void 0:r.errorText)&&console.warn("A custom error message must be provided when using a custom isValid function for field:",t),o[t.name]=l(t,e.props))})),this.setState({validationData:{submissionAttempted:!1,formValues:o,formIsValid:!Object.values(o).find((function(t){return t.error}))}},(function(){var t,o;null===(o=(t=e.props).onFormChanged)||void 0===o||o.call(t,e.formRef.current,e.state.validationData)}))},o.prototype.componentDidUpdate=function(){var t=this,e=s(this.formRef.current,this.props.hideNameWarnings),o=e.reduce((function(o,a){if(a.name)if(t.state.validationData.formValues[a.name]){var r="checkbox"===a.type,n="radio"===a.type;r&&t.state.validationData.formValues[a.name].value!==a.checked||!n&&!r&&t.state.validationData.formValues[a.name].value!==a.value?o[a.name]=l(a,t.props):n&&t.state.validationData.formValues[a.name].value!==l(a,t.props,e).value&&(o[a.name]=l(a,t.props,e))}else o[a.name]=l(a,t.props);return o}),{}),a=Object.keys(this.state.validationData.formValues).filter((function(t){return!e.find((function(e){return!e.name||e.name===t}))}));(Object.keys(o).length||a.length)&&this.setState((function(t){var e=r(r({},t.validationData.formValues),o);return a.forEach((function(t){return delete e[t]})),{validationData:r(r({},t.validationData),{formValues:e,formIsValid:!Object.values(e).find((function(t){return t.error}))})}}),(function(){var e,o;null===(o=(e=t.props).onFormChanged)||void 0===o||o.call(e,t.formRef.current,t.state.validationData)}))},o.prototype.render=function(){var e,o=this.props,a=(o.onInvalidSubmissionAttempt,o.onValidSubmissionAttempt,o.customValidators,o.className),i=o.children,s=o.formErrorClass,l=(o.onFormChanged,o.hideNameWarnings,n(o,["onInvalidSubmissionAttempt","onValidSubmissionAttempt","customValidators","className","children","formErrorClass","onFormChanged","hideNameWarnings"])),m=this.state.validationData,u=m.submissionAttempted,d=m.formIsValid,p=((e={"validated-form":!0,"validated-form-submission-attempted":Boolean(u)})[s]=!d,e[a]=Boolean(a),e),f=Object.keys(p).filter((function(t){return p[t]})).join(" ");return t.createElement("form",r({},l,{ref:this.formRef,onSubmit:this.onFormSubmit,className:f}),i)},o.defaultProps={customValidators:{},hideNameWarnings:!1,formErrorClass:"validated-form-error"},o}(t.Component),u="UPDATE_VALIDATED_FORM",d="CLEAR_VALIDATED_FORM",p="INIT_VALIDATED_FORM",f=e((function(t){return{reduxForms:t.validatedForms}}),{updateValidatedForm:function(t){var e=t.newFormState,o=t.formName;return{type:u,payload:{formName:o,newFormState:e}}}},null,{forwardRef:!0})(function(e){function o(){var o=null!==e&&e.apply(this,arguments)||this;return o.formRef=t.createRef(),o.onFormSubmit=function(t){var e,a,n,i;t.preventDefault();var s=r(r({},o.props.reduxForms[o.props.name]),{submissionAttempted:!0});o.props.updateValidatedForm({formName:o.props.name,newFormState:s}),o.props.reduxForms[o.props.name].formIsValid?null===(a=null===(e=o.props)||void 0===e?void 0:e.onValidSubmissionAttempt)||void 0===a||a.call(e,t,r({},s.formValues)):null===(i=null===(n=o.props)||void 0===n?void 0:n.onInvalidSubmissionAttempt)||void 0===i||i.call(n,t,r({},s.formValues))},o.resetFormSubmitted=function(){var t=r(r({},o.props.reduxForms[o.props.name]),{submissionAttempted:!1});o.props.updateValidatedForm({formName:o.props.name,newFormState:t})},o}return a(o,e),o.prototype.componentDidMount=function(){var t,e=this,o={};s(null===(t=this.formRef)||void 0===t?void 0:t.current,this.props.hideNameWarnings).forEach((function(t){var a,r;t.name&&((null===(a=e.props.customValidators[t.name])||void 0===a?void 0:a.isValid)&&!(null===(r=e.props.customValidators[t.name])||void 0===r?void 0:r.errorText)&&console.warn("A custom error message must be provided when using a custom isValid function for field:",t),o[t.name]=l(t,e.props))})),this.props.updateValidatedForm({formName:this.props.name,newFormState:{submissionAttempted:!1,formIsValid:!Object.values(o).find((function(t){return t.error})),formValues:o}})},o.prototype.componentDidUpdate=function(){var t=this,e=this.props.reduxForms[this.props.name],o=s(this.formRef.current,this.props.hideNameWarnings),a=o.reduce((function(a,r){if(r.name){var n=e.formValues;if(n[r.name]){var i="checkbox"===r.type,s="radio"===r.type;i&&n[r.name].value!==r.checked||!s&&!i&&n[r.name].value!==r.value?a[r.name]=l(r,t.props):s&&n[r.name].value!==l(r,t.props,o).value&&(a[r.name]=l(r,t.props,o))}else a[r.name]=l(r,t.props)}return a}),{}),n=Object.keys(e.formValues).filter((function(t){return!o.find((function(e){return!e.name||e.name===t}))}));if(Object.keys(a).length||n.length){var i=r(r({},e.formValues),a);n.forEach((function(t){return delete i[t]})),this.props.updateValidatedForm({formName:this.props.name,newFormState:r(r({},e),{formValues:i,formIsValid:!Object.values(i).find((function(t){return t.error}))})})}},o.prototype.render=function(){var e,o=this.props,a=(o.onInvalidSubmissionAttempt,o.onValidSubmissionAttempt,o.updateValidatedForm,o.customValidators,o.className),i=o.children,s=o.reduxForms,l=o.name,m=o.formErrorClass,u=(o.hideNameWarnings,n(o,["onInvalidSubmissionAttempt","onValidSubmissionAttempt","updateValidatedForm","customValidators","className","children","reduxForms","name","formErrorClass","hideNameWarnings"])),d=s[l],p=((e={"validated-form":!0,"validated-form-submission-attempted":Boolean(null==d?void 0:d.submissionAttempted)})[m]=!(null==d?void 0:d.formIsValid),e[a]=Boolean(a),e),f=Object.keys(p).filter((function(t){return p[t]})).join(" ");return t.createElement("form",r({},u,{ref:this.formRef,onSubmit:this.onFormSubmit,className:f}),i)},o.defaultProps={customValidators:{},hideNameWarnings:!1,formErrorClass:"validated-form-error"},o}(t.Component)),c={},v=function(t,e){var o;if(void 0===t&&(t=c),[p,d,u].includes(e.type)){var a=e.payload,n=a.formName,i=a.newFormState;switch(e.type){case u:return r(r({},t),((o={})[n]=r({},i),o));default:return t}}return t};export{m as ValidatedForm,f as ValidatedReduxForm,v as validatedForms};
//# sourceMappingURL=index.js.map

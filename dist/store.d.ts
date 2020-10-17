declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    validatedForms: import("./Form/validatedForm.reducer").IValidatedForms;
}>, import("./Form/validatedForm.actions").ValidatedFormAction>;
export declare type IApplicationState = ReturnType<typeof rootReducer>;
declare const _default: import("redux").Store<import("redux").CombinedState<{
    validatedForms: import("./Form/validatedForm.reducer").IValidatedForms;
}>, import("./Form/validatedForm.actions").ValidatedFormAction>;
export default _default;
//# sourceMappingURL=store.d.ts.map
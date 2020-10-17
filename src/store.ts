import { combineReducers, createStore, compose } from 'redux';
import validatedForms from './Form/validatedForm.reducer';

const rootReducer = combineReducers({
  validatedForms,
});

export type IApplicationState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers());

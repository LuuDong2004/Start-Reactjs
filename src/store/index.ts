// If there are no slice reducers yet, export a simple identity reducer
// so `configureStore` receives a valid reducer function.
const rootReducer = (state = {}) => state;

export default rootReducer;

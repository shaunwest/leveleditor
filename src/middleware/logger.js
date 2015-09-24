/**
 * Created by shaunwest on 9/10/15.
 */

const logger = store => next => action => {
  console.group('State Update');
  console.log('Dispatching', action);

  const result = next(action);
  const state = store.getState();
  const nextState = Object
    .keys(state)
    .reduce((nextState, key) => {
      nextState[key] = state[key].toJS();
      return nextState;
    }, {});

  console.log('Next State', nextState);
  console.groupEnd();
  return result;
};

export default logger;
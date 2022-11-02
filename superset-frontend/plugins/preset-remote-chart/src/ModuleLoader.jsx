import React, { Suspense } from 'react';
import useDynamicScript from './hooks/useDynamicScript';

/**
 * This is critical for loading remote modules when running superset in dev mode
 */
if (process.env.NODE_ENV !== 'production') {
  global.$RefreshReg$ = () => {};
  global.$RefreshSig$ = () => () => {};
}

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

function ModuleLoader(props) {
  const { url = '', module = '', scope = '', modProps = {} } = props;
  const { ready, failed } = useDynamicScript({
    url: module && url,
  });

  if (!module) {
    return <h2>Not Remote Module specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(loadComponent(scope, module));

  return (
    <Suspense fallback="Loading Module">
      <Component {...modProps} />
    </Suspense>
  );
}

export default ModuleLoader;

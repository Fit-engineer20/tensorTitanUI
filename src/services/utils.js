const getConfig = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const envSettings = window;
    return envSettings.config || {};
  };
  
  export const ignoreAuth = (apiEndpoint) => {
    const endpointsToIgnore = ['/api/v1/auth/signin', '/api/v1/auth/signup'];
    let bool = false;
    endpointsToIgnore.map((endpoint) => {
      if (apiEndpoint.includes(endpoint)) bool = true;
      return null;
    });
    return bool;
  };
  
  export { getConfig };
  
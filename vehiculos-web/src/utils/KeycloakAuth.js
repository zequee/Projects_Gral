class KeycloakAuth {
  static getUser = kc => {
    const client = kc.tokenParsed.resource_access['vehiculos'];
    const roles = client ? client.roles : [];
    return {
      id: kc.tokenParsed.sub,
      username: kc.tokenParsed.username,
      name: kc.tokenParsed.name,
      roles
    };
  };
  static updateSavedToken = kc => {
    localStorage.setItem('vehiculos-token', kc.token);
    localStorage.setItem('vehiculos-refreshToken', kc.refreshToken);
  };
  static clearSavedToken = () => {
    localStorage.removeItem('vehiculos-token');
    localStorage.removeItem('vehiculos-refreshToken');
  };
}

export default KeycloakAuth;

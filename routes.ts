/**
 * An array of routes that are accessible to the public
 * There routes do not rquired authenyticatiohn
 * @type {string[]}
 */
export const publicroutes: string[] = ["/"];

/**
 * An array of routes that are userd for authentication
 * There route will redirect logged in usess to home page
 * @type {string[]}
 */
export const authRoutes: string = "/signin";

/**
 * The prefix for API authentication
 * Routes that start withthis prfiux are used for API authentication
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/orders";

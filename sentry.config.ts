export const sentryConfig = {
  enabled: Boolean(process.env.SENTRY_AUTH_TOKEN),
  tracesSampleRate: 0.1,
};

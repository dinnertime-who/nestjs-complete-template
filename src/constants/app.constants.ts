export enum LogService {
  Console = 'console',
  GoogleLogging = 'google-logging',
  AwsCloudWatch = 'aws-cloudwatch',
}

// Redact value of these paths from logs
export const loggingRedactPaths = [
  'req.headers.authorization',
  'req.body.token',
  'req.body.refreshToken',
  'req.body.email',
  'req.body.password',
  'req.body.oldPassword',
];

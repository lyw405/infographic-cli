import chalk from 'chalk';

export function error(message: string): never {
  console.error(chalk.red(`\n✖ ${message}\n`));
  process.exit(1);
}

export function info(message: string): void {
  console.info(chalk.cyan(message));
}

export function success(message: string): void {
  console.info(chalk.green(`\n✔ ${message}\n`));
}

import { initEthereumWalletMock } from "./initEthereumWalletMock";
import setupTasks from "./setupTasks";

let port = 0;

function ensureRdpPort(args: string[]) {
  const existing = args.find(
    (arg) => arg.slice(0, 23) === "--remote-debugging-port"
  );

  if (existing) {
    return Number(existing.split("=")[1]);
  }

  const port = 40000 + Math.round(Math.random() * 25000);

  args.push(`--remote-debugging-port=${port}`);

  return port;
}

export default function installSynpress(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) {
  const browsers = config.browsers.filter((b) => b.name === "chrome");
  if (browsers.length === 0) {
    throw new Error("No Chrome browser found in the configuration");
  }

  on("before:browser:launch", async (_, launchOptions) => {
    // Enable debug mode to establish playwright connection
    const args = Array.isArray(launchOptions)
      ? launchOptions
      : launchOptions.args;
    port = ensureRdpPort(args);
  });

  on("before:spec", async () => {
    await initEthereumWalletMock(port);
  });

  setupTasks(on);

  return {
    ...config,
    browsers,
  };
}

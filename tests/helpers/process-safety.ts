const darwinSafeSignals = new Set<NodeJS.Signals>(["SIGINT", "SIGTERM", "SIGHUP"])
const darwinCrashSignals = new Set<NodeJS.Signals>([
  "SIGQUIT",
  "SIGABRT",
  "SIGSEGV",
  "SIGBUS",
  "SIGILL",
  "SIGFPE",
  "SIGTRAP",
])

export function processSignalPolicy(
  signal: NodeJS.Signals,
  platform: NodeJS.Platform = process.platform,
): { skip: boolean; reason: string | null } {
  if (platform !== "darwin" || darwinSafeSignals.has(signal)) {
    return { skip: false, reason: null }
  }

  const reason = darwinCrashSignals.has(signal)
    ? `${signal} can terminate the process and open a macOS crash dialog`
    : `${signal} is not registered as safe to send to a test process on macOS`
  return { skip: true, reason }
}

export function sendTestSignal(
  target: { kill: (signal: NodeJS.Signals) => unknown },
  signal: NodeJS.Signals,
): unknown {
  const policy = processSignalPolicy(signal)
  if (policy.skip) {
    throw new Error(`Refusing to send ${signal}: ${policy.reason}`)
  }
  return target.kill(signal)
}

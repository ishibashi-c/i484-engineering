import { describe, expect, test } from "bun:test"
import { processSignalPolicy, sendTestSignal } from "./helpers/process-safety"

describe("process signal policy", () => {
  test("skips SIGQUIT on Darwin with a reason", () => {
    const policy = processSignalPolicy("SIGQUIT", "darwin")

    expect(policy.skip).toBe(true)
    expect(policy.reason).toBeTruthy()
  })

  test("keeps SIGQUIT enabled on Linux", () => {
    expect(processSignalPolicy("SIGQUIT", "linux")).toEqual({ skip: false, reason: null })
  })

  test.each(["SIGINT", "SIGTERM", "SIGHUP"] as const)("keeps %s enabled on Darwin", (signal) => {
    expect(processSignalPolicy(signal, "darwin")).toEqual({ skip: false, reason: null })
  })

  test.each(["SIGQUIT", "SIGABRT", "SIGSEGV", "SIGBUS", "SIGILL", "SIGFPE", "SIGTRAP"] as const)(
    "skips crash signal %s on Darwin",
    (signal) => {
      const policy = processSignalPolicy(signal, "darwin")

      expect(policy.skip).toBe(true)
      expect(policy.reason).toBeTruthy()
    },
  )

  test("does not silently allow an unregistered Darwin signal", () => {
    const policy = processSignalPolicy("SIGUSR1" as NodeJS.Signals, "darwin")

    expect(policy.skip).toBe(true)
    expect(policy.reason).toBeTruthy()
  })

  test("applies the runtime policy before delivering a signal", () => {
    let delivered = false
    const target = {
      kill() {
        delivered = true
      },
    }

    if (process.platform === "darwin") {
      expect(() => sendTestSignal(target, "SIGQUIT")).toThrow()
      expect(delivered).toBe(false)
    } else {
      expect(() => sendTestSignal(target, "SIGQUIT")).not.toThrow()
      expect(delivered).toBe(true)
    }
  })

  test("delivers an allowed runtime signal to the target", () => {
    let delivered = false
    const target = {
      kill() {
        delivered = true
      },
    }

    expect(() => sendTestSignal(target, "SIGTERM")).not.toThrow()
    expect(delivered).toBe(true)
  })
})

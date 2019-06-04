/**
 * Set of variables that are currently dirty / have recently changed.
 */
export const dirty = new Set()

/**
 * The scheduled update if there is one.
 */
let scheduledUpdate: NodeJS.Timeout | undefined

/**
 * An array of update functions, each file has an update function.
 */
export const updates: Function[] = []

/**
 * Updates everything.
 */
function updateAll(): void {
  for (const update of updates) {
    update()
  }
  dirty.clear()
  scheduledUpdate = undefined
}

/**
 * Marks a variable as dirty and triggers an update so that other variables that depend on this variable update.
 *
 * @param variableName - The name of the variable that changed.
 */
export function invalidate(variableName: string): void {
  dirty.add(variableName)
  if (!scheduledUpdate) {
    scheduledUpdate = setTimeout(updateAll, 0)
  }
}

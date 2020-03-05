import { exception } from './analytics'
import * as levels from './constants/logLevels'

const debug = (context) => {
  if (process.env.NODE_ENV === 'development') console.log(context.id, context)
}

const info = (context) => console.log(context.id, context)
const warn = (context) => console.warn(context.id, context)
const error = (context) => {
  console.error(context.id, context)
  exception({ description: context.description || (context.error && context.error.message) || '', fatal: Boolean(context.fatal), args: context.args || [], error: context.error })
}

const levelsLogFunctions = {
  [levels.DEBUG]: debug,
  [levels.INFO]: info,
  [levels.WARN]: warn,
  [levels.ERROR]: error
}

const log = (level, context) => {
  const levelCB = levelsLogFunctions[level] || info
  levelCB(context)
}

export default log

export {
  log,
  debug,
  info,
  warn,
  error,
  levels
}

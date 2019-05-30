import * as path from 'path'
import { exec } from 'child_process'

// exec(`cd ${__dirname} && pwd`).on('message', console.log)
// const result = program.parse(['fixtures/test.ui'])
function cli(args: string[], cwd: string): Promise<any> {
  return new Promise(resolve => {
    exec(
      `node ${path.join(__dirname, '../dist/index.js')} ${args.join(' ')}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        })
      }
    )
  })
}
test('cli', async () => {
  const result = await cli(['fixture.ui'], __dirname)
  expect(result.code).toBe(0)
})

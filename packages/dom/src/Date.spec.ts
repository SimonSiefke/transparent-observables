import { TDate } from './Date'

test('Date', async () => {
  const now = TDate.value
  await new Promise(resolve => setTimeout(resolve, 2))
  const then = TDate.value
  expect(then).not.toEqual(now)
})

export const throttled = (
  fn: () => void,
  delay: number = 500,
  immediate: boolean = false
) => {
  let old_time = Date.now()
  if (immediate) {
    fn()
  }
  return function (...args: any) {
    let new_time = Date.now()
    if (new_time - old_time >= delay) {
      console.log('111')

      fn.apply(null, args)
    }
  }
}

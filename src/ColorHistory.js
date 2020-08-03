export default class ColorHistory {
  constructor (maxLength = 14) {
    this.stack = []
    this.maxLength = maxLength
  }
  push (color) {
    if (!color) {
      return
    }
    let list = [color].concat(this.stack.filter(c => c !== color))
    if (list.length > this.maxLength) {
      list = list.slice(0, this.maxLength)
    }
    this.stack = list
  }
}

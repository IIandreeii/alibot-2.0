/* eslint-disable @typescript-eslint/no-explicit-any */
export const objectToArray = <T>(obj: any): T[] => {
  let arr: T[] = []
  
  for (const item in obj as any) {
    if (Object.prototype.hasOwnProperty.call(obj, item)) {
    const element = obj[item]

    arr = [...arr, element]
    }
  }

  return arr
}
  
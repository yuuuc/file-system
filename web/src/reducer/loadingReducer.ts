export type State = {
  visiable: boolean
}

export const loadReducer = (state: State, action: { type: string }): State => {
  switch (action.type) {
    case 'show':
      return {
        visiable: true
      }
    case 'hide':
      return {
        visiable: false
      }
  }
  return {
    visiable: false
  }
}

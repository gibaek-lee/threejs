interface IParamChangeAnimation {
  mixer: THREE.AnimationMixer,
  animations: THREE.AnimationClip[]
}

interface IActionData {
  name: string,
  action: THREE.AnimationAction
}

interface IInvokeClipAction {
  [key: string]: Function
}

export default function changeAnimation ({
  mixer,
  animations
}: IParamChangeAnimation): { invokeClipAction: IInvokeClipAction } {
  const invokeClipAction: IInvokeClipAction = {}
  const actionQueue: IActionData[] = []

  animations.forEach((animation) => {
    const { name } = animation
    Object.assign(invokeClipAction, {
      [name]: () => {
        actionQueue.forEach((data: IActionData) => {
          if (data.name !== name) {
            data.action.stop()
          }
        })

        let iClipAction = null
        const isFirstFiredAction = actionQueue.every(a => a.name !== name)
        if (isFirstFiredAction) {
          iClipAction = mixer.clipAction(animation)
          actionQueue.push({ name, action: iClipAction })
        }

        const actionDataReserved = actionQueue.find(a => a.name === name)
        if (actionDataReserved) {
          actionDataReserved.action.play()
        }
      }
    })
  })

  Object.assign(invokeClipAction, {
    stop: () => {
      actionQueue.forEach((data: IActionData) => {
        data.action.stop()
      })
    }
  })

  const clipKeys = animations.reduce((a: string[], c: THREE.AnimationClip) => a.concat([c.name]), [])
  window.addEventListener('keydown', (event) => {
    const mapKey = clipKeys[Number(event.key) - 1]
    const invoker = invokeClipAction[mapKey] || invokeClipAction.stop

    invoker()
  })

  return {
    invokeClipAction
  }
}

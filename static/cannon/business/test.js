let world

self.onmessage = function (event) {
  console.log('tagScript get message', event.data, self)
  const { physicsLibUrl } = event.data

  if (physicsLibUrl && !world) {
    self.importScripts(physicsLibUrl)

    world = new CANNON.World()
    console.log('@@@canon world generated', world)
  }
}

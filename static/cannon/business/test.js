let world
self.onmessage = function (event) {
  console.log('tagScript get message', event.data, self)
  const { cannonUrl } = event.data

  if (cannonUrl && !world) {
    self.importScripts(cannonUrl)

    world = new CANNON.World()
    console.log('@@@canon world generated', world)
  }
}

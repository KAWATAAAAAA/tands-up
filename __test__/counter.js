import TandsUp from "../index.js"
const channel = new TandsUp("center")

export async function setupAll(element) {
   
  element.addEventListener('click', async () => {
    const b = await channel.all()
    console.log(b)
    
  })
}

export async function setupRace(element) {

  element.addEventListener('click', async () => {
    const b = await channel.race()
    console.log(b)
  })
}

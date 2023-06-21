import sleep from '/@src/utils/sleep'
import { services } from '/@src/texts/services'

export async function getService(slug: string) {
  const service = services.find((service) => service.slug === slug)

  // simulate api call
  await sleep(200)

  if (!service) {
    return Promise.reject(new Error(`Service ${slug} not found`))
  }

  return Promise.resolve(service)
}

export async function getServices() {
  // simulate api call
  await sleep(200)

  return Promise.resolve(services.map((service) => service))
}

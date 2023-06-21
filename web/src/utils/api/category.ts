import sleep from '/@src/utils/sleep'
import { helpCategories } from '/@src/texts/help'

export async function getCategory(type:string, slug: string) {
  const _category = helpCategories[type]
  
  const category = _category.find(
    (category) => category.slug === slug
  )


  // simulate api call
  await sleep(200)

  if (!category) {
    return Promise.reject(new Error(`Category ${slug} not found`))
  }

  return Promise.resolve(category)
}

export async function getCategories() {
  // simulate api call
  await sleep(200)

  return Promise.resolve(helpCategories.map((category) => category))
}

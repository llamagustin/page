import sleep from '/@src/utils/sleep'
import { helpCategories } from '/@src/texts/help'



export async function getArticle(type:string, slug: string) {
  const helpCenterArticlesMapped = helpCategories[type].map(
    (categories) =>
      categories.articles.map((article) => ({
        article,
      })) ?? []
  )
  
  const helpCenterArticles = helpCenterArticlesMapped.flat(1)
  const array = helpCenterArticles.map((item) => item.article)

  const article = array.find((item) => item.slug === slug)

  // simulate api call
  await sleep(200)

  if (!article) {
    return Promise.reject(new Error(`Article ${slug} not found`))
  }

  return Promise.resolve(article)
}

export async function getArticles() {
  // simulate api call
  await sleep(200)

  return Promise.resolve(array.map((article) => article))
}

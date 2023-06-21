// ** Mock Adapter
// import mock from '@/@fake-db/mock'

// ** Types
import type { SearchHeader, SearchItem } from '@/@fake-db/types'

const database: SearchItem[] = [
  {
    id: 1,
    url: { name: 'apps-calendar' },
    icon: 'tabler-calendar',
    title: 'Sandbox',
    category: 'dashboards',
  },
  {
    id: 2,
    url: { name: 'apps-email' },
    icon: 'tabler-mail',
    title: 'Agenda',
    category: 'dashboards',
  },
  {
    id: 3,
    url: { name: 'apps-chat' },
    icon: 'tabler-message',
    title: 'Messenger',
    category: 'dashboards',
  },
  {
    id: 4,
    url: { name: 'form-lead' },
    icon: 'tabler-star',
    title: 'Solicitar Kit',
    category: 'appsPages',
  },
  {
    id: 5,
    url: { name: 'help-center' },
    icon: 'tabler-file',
    title: 'Ayuda',
    category: 'appsPages',
  },
  {
    id: 6,
    url: { name: 'faq' },
    icon: 'tabler-file',
    title: 'Faq',
    category: 'appsPages',
  }
]

// ** GET Search Data
// eslint-disable-next-line sonarjs/cognitive-complexity
// mock.onGet('/app-bar/search').reply(config => {
export const data_bar = (q) => {
  // const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const exactData: { [k: string]: SearchItem[] } = {
    dashboards: [],
    appsPages: []
  }

  const includeData: { [k: string]: SearchItem[] } = {
    dashboards: [],
    appsPages: []
  }

  database.forEach(obj => {
    const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
    if (isMatched && exactData[obj.category].length < 5)
      exactData[obj.category].push(obj)
  })

  database.forEach(obj => {
    const isMatched
      = !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)

    if (isMatched && includeData[obj.category].length < 5)
      includeData[obj.category].push(obj)
  })

  const categoriesCheck: string[] = []

  Object.keys(exactData).forEach(category => {
    if (exactData[category].length > 0)
      categoriesCheck.push(category)
  })
  if (categoriesCheck.length === 0) {
    Object.keys(includeData).forEach(category => {
      if (includeData[category].length > 0)
        categoriesCheck.push(category)
    })
  }

  const resultsLength = categoriesCheck.length === 1 ? 5 : 3

  const mergedData: (SearchItem | SearchHeader)[] = []

  Object.keys(exactData).forEach(element => {
    if (exactData[element].length || includeData[element].length) {
      const r: (SearchItem | SearchHeader)[] = exactData[element].concat(includeData[element]).slice(0, resultsLength)

      r.unshift({ header: element, title: element })

      mergedData.push(...r)
    }
  })
  
  return {
    mergedData
  }

  // return [200, [...mergedData]]
})

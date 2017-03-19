import Axios from 'axios'
import shortid from 'shortid'
import { compact } from 'lodash'

// $ curl -G https://api.github.com/search/repositories       \
//     --data-urlencode "q=created:>`date -v-7d '+%Y-%m-%d'`" \
//     --data-urlencode "sort=stars"                          \
//     --data-urlencode "order=desc"                          \
//     -H "Accept: application/vnd.github.preview"            \
//     | jq ".items[0,1,2] | {name, description, language, watchers_count, html_url}"

export default class GithubTrends {
  title = 'Github Trends'

  constructor() {
    this.key = shortid.generate()
  }

  async fetchItems() {
    const period = (new Date(Date.now() - (24 * 60 * 60 * 1000))).toISOString().split('T')[0]
    const response = await Axios.get('https://api.github.com/search/repositories', { params: {
      q: `created:>${period}`,
      sort: 'stars',
      order: 'desc'
    } })

    return response.data.items.map(({ id, name, description, language, html_url, owner }) => ({
      key: id,
      title: compact([compact([name, description]).join(': '), language]).join(' '),
      url: html_url,
      author: owner.login,
      avatar: owner.avatar_url
    }))
  }
}

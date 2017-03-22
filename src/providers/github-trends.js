import Axios from 'axios'
import { compact } from 'lodash'

export default class GithubTrends {
  static key = 'github-trends'
  static title = 'Github Trends'
  static color = '#24292e'
  static sections = ['javascript', 'ruby']

  static async fetch() {
    const period = 7 * 24 * 60 * 60 * 1000
    const fromDate = new Date(Date.now() - period)
    const params = {
      q: `created:>${fromDate.toISOString().split('T')[0]}`,
      sort: 'stars',
      order: 'desc'
    }

    const response = await Axios.get('https://api.github.com/search/repositories', { params })

    return response.data.items.map(({ id, name, description, language, html_url, owner }) => ({
      key: id,
      title: compact([compact([name, description]).join(': '), language]).join(' '),
      url: html_url,
      author: owner.login,
      avatar: owner.avatar_url
    }))
  }
}

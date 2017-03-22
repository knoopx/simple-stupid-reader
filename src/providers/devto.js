import Axios from 'axios'
import cheerio from 'cheerio-without-node-native'

export default class DevTo {
  static key = 'devto'
  static title = 'dev.to'
  static color = '#fff'
  static isPaginable = true

  static async fetch(page = 1) {
    const response = await Axios.get('https://dev.to/', { params: { page } })
    const $ = cheerio.load(response.data, { normalizeWhitespace: true })
    return Array.from($('#substories > .single-article')).map((el, i) => ({
      key: $('a[data-preload-image]', el).prop('id'),
      title: $('.content h3', el).text().trim(),
      url: `https://dev.to/${$('a[data-preload-image]', el).prop('href')}`,
      author: $('h4', el).text(),
      avatar: $('.small-pic img', el).prop('src')
    }))
  }
}

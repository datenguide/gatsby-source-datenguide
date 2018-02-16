const axios = require(`axios`)
const crypto = require(`crypto`)

const get = (url, query) =>
  axios.get(`${url}${encodeURIComponent(query)}`)

exports.sourceNodes = async ({
  boundActionCreators,
  getNode,
  hasNodeChanged,
}, pluginOptions) => {
  const { createNode } = boundActionCreators
  const { queryUrl, obtainQueryUrl } = pluginOptions

  console.time(` --> fetch Datenguide data`)

  // Fetch full query as string:
  const defaultQueryResult = await axios.get(obtainQueryUrl)
  const defaultQuery = defaultQueryResult.data

  // Fetch district identifiers:
  const result = await get(queryUrl, defaultQuery)
  const { districts } = result.data.data

  districts.forEach(district => {
    createNode({
      ...district,
      parent: null,
      children: [],
      internal: {
        type: `District`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(district))
          .digest(`hex`),
      }
    })
  })

  console.timeEnd(` --> fetch Datenguide data`)

  return
}

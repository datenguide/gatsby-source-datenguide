const axios = require(`axios`)
const crypto = require(`crypto`)

const get = (url, query) => axios.get(`${url}${encodeURIComponent(query)}`)

exports.sourceNodes = async (
  { boundActionCreators, getNode, hasNodeChanged },
  pluginOptions
) => {
  const { createNode } = boundActionCreators
  const { queryUrl, obtainQueryUrl } = pluginOptions

  console.time(` --> fetch Datenguide data`)

  // Fetch full query as string:
  const defaultQueryResult = await axios.get(obtainQueryUrl)
  const defaultQuery = defaultQueryResult.data

  // Fetch region identifiers:
  const result = await get(queryUrl, defaultQuery)
  const { regions } = result.data.data

  regions.forEach(region => {
    createNode({
      ...region,
      parent: null,
      children: [],
      internal: {
        type: `Region`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(region))
          .digest(`hex`)
      }
    })
  })

  console.timeEnd(` --> fetch Datenguide data`)

  return
}

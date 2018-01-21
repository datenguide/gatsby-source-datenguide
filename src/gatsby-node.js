const axios = require(`axios`)
const crypto = require(`crypto`)

const defaultQuery = `
{
  districts {
    id
    name
    name_ext
    slug
    area
    pop {
      m
      w
    }
    Schulstatistik {
      Gymnasien {
        BIL003 {
          BILKL2 {
            JGSTUFE11
            JGSTUFE7
          }
          GES {
            I
            M
          }
          NAT {
            NATA
          }
        }
      }
    }
  }
}`

const get = (url, query) =>
  axios.get(`${url}${encodeURIComponent(query)}`)

exports.sourceNodes = async ({
  boundActionCreators,
  getNode,
  hasNodeChanged,
}, pluginOptions) => {
  const { createNode } = boundActionCreators
  const { queryUrl } = pluginOptions

  console.time(` --> fetch Datenguide data`)

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

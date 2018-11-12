# ⚠️ This plugin is deprecated and no longer maintained

This plugin is no longer needed for using the Datenguide API within Gatsby, 
as Gatsby now supports 3rd party GraphQL APIs out of the box via the 
[`gatsby-source-graphql`](https://www.gatsbyjs.org/packages/gatsby-source-graphql/). 

See the [`datenguide-frontend`](https://github.com/datenguide/datenguide-frontend/) 
Gatsby configuration for an example of how to use `gatsby-source-graphql` 
with the Datenguide API. 

---

Plugin for pulling data into [Gatsby](https://www.gatsbyjs.org) from
the [Datenguide API](https://github.com/datenguide/datenguide-backend)

## Install

`yarn add gatsby-source-datenguide`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-datenguide',
    options: {
      queryUrl: 'http://127.0.0.1:5000/\?query\=',
    }
  }
];
```

## How to query

You can query nodes created from Datenguide like the following:

```graphql
query StoriesQuery {
  allDistrict
}
```

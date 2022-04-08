import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = (props) => {
  const { site } = useStaticQuery(graphql`
      query {
          site {
              siteMetadata {
                  lang
                  title
                  description
                  siteUrl
              }
          }
      }
  `)
  //
  const title = props.pagetitle
    ? `${props.pagetitle} | ${site.siteMetadata.title}`
    : site.siteMetadata.title
  const description = props.pagedesc || site.siteMetadata.description
  const url = props.pagepath
    ? `${site.siteMetadata.siteUrl}${props.pagepath}`
    : site.siteMetadata.siteUrl
  //
  return (
    <Helmet>
      {/* common */}
      <html lang={site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="robots" content="noindex" />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
export default Seo

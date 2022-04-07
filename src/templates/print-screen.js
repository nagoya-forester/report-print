import * as React from "react"
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";
import {graphql, Link} from "gatsby";
import ReactHtmlParser, {processNodes} from "react-html-parser"
import Seo from "../components/seo";


export const query = graphql`
    query ($id: String!) {
        record: nodeRecord(id: { eq: $id }) {
            id
            title
            field_start_time(formatString: "YYYY年MM月DD日HH時mm分")
            field_end_time(formatString: "YYYY年MM月DD日HH時mm分")
            field_place
            field_detail
            field_weather
            field_sonota
            field_number_participants
            field_general_entry
            field_notices
            changed(formatString: "YYYY/MM/DD")
            body {
                value
            }
        }
        allFileFile {
            edges {
                node {
                    drupal_id
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED
                                placeholder: BLURRED
                                transformOptions: { fit: COVER }
                            )
                        }
                    }
                }
            }
        }
    }
`

// markup
const PrintScreen = ({location, data}) => {
  const record = data.record

  //Image conversion
  function transform(node) {
    if (node.type === "tag" && node.name === "p") {
      return <>{processNodes(node.children, transform)}</>
    }
    if (node.type === "tag" && node.name === "img") {
      let uuid = node.attribs["data-entity-uuid"]
      let alt = node.attribs["alt"]
      return data.allFileFile.edges.map((edge) => {
        if (edge.node.drupal_id === uuid) {
          return (
            <figure className="image_area_figure">
              <GatsbyImage
                alt={alt}
                image={edge.node.localFile.childImageSharp.gatsbyImageData}
              />
              <figcaption>{alt}</figcaption>
            </figure>
          )
        }
        return undefined
      })
    } else {
      return (
        <>
        </>
      )
    }

  }

  const options = {
    decodeEntities: true,
    transform,
  }
//Image conversion END
  return (
    <>
      <Seo
        pagetitle={record.id}
        pagedesc={record.id}
        pagepath={location.pathname}
      />
      <Link className="back_index" to={'/'}>
        <span>一覧に戻る</span>
      </Link>
      <section className="a4">
        <div className="header">
          <div className="h_image">
            <StaticImage src="../images/site_logo.png" alt="LOGO" width="320" height="80"/>
          </div>
          <div className="h_data">
            <p>特定非営利活動法人名古屋シティ・フォレスター倶楽部</p>
            <p>{record.id}</p>
            <p>{record.changed}</p>
            <p>担当者 </p>
            <p>nagoya-forester.or.jp</p>
          </div>
        </div>
        <div className="main">
          <h1 className="m_title">活動記録</h1>
          <div className="m_display">
            <h2>活動日時</h2>
            <p>{record.field_start_time}～{record.field_end_time}</p>
          </div>
          <div className="m_display">
            <h2>事業内容</h2>
            <p>{record.title}</p>
          </div>
          <div className="m_side">
            <div className="m_display">
              <h2>活動場所</h2>
              <p>{record.field_place}</p>
            </div>
            <div className="m_display">
              <h2>天候</h2>
              <p>{record.field_weather}</p>
            </div>
          </div>
          <div className="m_member">
            <div className="m_member_list">
              <h2>参加者</h2>
              <div className="m_member_list_data">
                <h3>倶楽部員</h3>
                <p>{record.field_number_participants} 人</p>
              </div>
              <div className="m_member_list_data">
                <h3>一般参加</h3>
                <p>
                  {record.field_general_entry} 人
                </p>
              </div>
            </div>
          </div>
          <div className="m_data_list">
            <div className="m_data_title">
              <h2>活動内容の詳細</h2>
            </div>
            <p className="m_data">
              {record.field_detail}
            </p>
          </div>
          <div className="m_data_list">
            <div className="m_data_title">
              <h2>特記事項・引継ぎ事項</h2>
            </div>
            <p className="m_data">
              {record.field_notices}
            </p>
          </div>
          <div className="m_data_list">
            <div className="m_data_title">
              <h2>その他</h2>
            </div>
            <p className="m_data">
              {record.field_sonota}
            </p>
          </div>
          <div className="image_area">
            {ReactHtmlParser(record.body.value, options)}
          </div>
        </div>
        <div className="footer">
        </div>
      </section>
    </>
  )
}

export default PrintScreen

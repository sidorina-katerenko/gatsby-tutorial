import * as React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import { container, mainContent, sideContent, sideHeading, navLinkList, navLinkItem, navLinkText } from "./{mdx.slug}.module.css";

const BlogPost = ({ data }) => {
	const image = getImage(data.mdx.frontmatter.hero_image);

	console.log(data.allMdx.nodes);

	return (
		<Layout pageTitle={data.mdx.frontmatter.title} contentClassName={container}>
			<div className={mainContent}>
				<p>{data.mdx.frontmatter.date}</p>
				<GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
				<p>
					Photo Credit: <a href={data.mdx.frontmatter.hero_image_credit_link}>{data.mdx.frontmatter.hero_image_credit_text}</a>
				</p>
				<MDXRenderer>{data.mdx.body}</MDXRenderer>
			</div>
			<div className={sideContent}>
				<p className={sideHeading}>Other posts you might like:</p>
				<ul className={navLinkList}>
					{data.allMdx.nodes.map((node) => (
						<li key={node.id} className={navLinkItem}>
							<Link className={navLinkText} to={`/blog/${node.slug}`}>
								{node.frontmatter.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		mdx(id: { eq: $id }) {
			body
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				hero_image_alt
				hero_image_credit_link
				hero_image_credit_text
				hero_image {
					childImageSharp {
						gatsbyImageData
					}
				}
			}
		}
		allMdx(sort: { fields: frontmatter___date, order: DESC }) {
			nodes {
				frontmatter {
					title
				}
				id
				slug
			}
		}
	}
`;

export default BlogPost;

// app/articles/[slug]/page.js
import Image from 'next/image';
import { getArticleBySlug, getStrapiMedia } from '@/lib/strapi/api';
import { notFound } from 'next/navigation';

const parseEmbeddedContent = (node) => {
    // Check for code blocks that might contain iframes
    if (node.type === 'text' && node.code) {
      // If it contains iframe tags, render it as HTML
      if (node.text.includes('<iframe')) {
        return <div className="video-container my-6" dangerouslySetInnerHTML={{ __html: node.text }} />;
      }
      // Regular code that's not an iframe
      return <code className="px-1 py-0.5 bg-white-100 rounded">{node.text}</code>;
    }
    
    // Regular text with possible formatting
    if (node.type === 'text') {
      if (node.bold) {
        return <strong>{node.text}</strong>;
      }
      if (node.italic) {
        return <em>{node.text}</em>;
      }
      if (node.underline) {
        return <u>{node.text}</u>;
      }
      return node.text;
    }
    
    return null;
  };

// Component to render a content node
const ContentNode = ({ node }) => {
  if (node.type === 'paragraph') {
    return (
      <div className="my-4">
        {node.children.map((child, i) => (
          <span key={i}>{parseEmbeddedContent(child)}</span>
        ))}
      </div>
    );
  }
  
  if (node.type === 'heading') {
    const HeadingTag = `h${node.level}`;
    return (
      <HeadingTag className={`my-4 font-bold ${node.level === 1 ? 'text-3xl' : 'text-2xl'}`}>
        {node.children.map((child, i) => (
          <span key={i}>{parseEmbeddedContent(child)}</span>
        ))}
      </HeadingTag>
    );
  }
  
  return null;
};

// Generate metadata for the page
export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
  try {
    const {data} = await getArticleBySlug(slug);
    if (data && data.length > 0) {
      const article = data[0];
      console.log("article",article)
      return {
        title: `${article.title} | Your Site Name`,
        description: article.excerpt,
      };
    }
  } catch (error) {
    console.error("Failed to fetch article metadata:", error);
  }
  
  return {
    title: "Article | Your Site Name",
    description: "Article details",
  };
}

export default async function ArticlePage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
  
  try {
    const {data} = await getArticleBySlug(slug);
    // console.log("data here", data.data)
    if (!data || data.length === 0) {
      notFound();
    }
    
    const article = data[0];
    console.log(article)
    return (
        <div className=" min-h-screen py-8">
          <article className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto rounded-lg shadow-sm overflow-hidden">
              <header className="p-6 md:p-8 border-b">
                <div className="text-sm text-white-500 mb-2">
                  {article.category} • {new Date(article.publish_date).toLocaleDateString()}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                <p className="text-lg text-white mb-6">{article.excerpt}</p>
              </header>
              
              {article.featured_image && (
                <div className="relative w-full aspect-[16/9]">
                  <Image 
                    src={getStrapiMedia(article.featured_image)} 
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw"
                    priority
                  />
                </div>
              )}
  
              <div className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none">
                  {article.content.map((node, index) => (
                    <ContentNode key={index} node={node} />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      );
    } catch (error) {
      console.error('Error fetching article:', error);
      return (
        <div className="container mx-auto p-6">
          Error loading article. Please try again later.
        </div>
      );
  }
}
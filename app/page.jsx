import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getFeaturedArticle, getStrapiMedia, getArticles, getPodcasts } from "@/lib/strapi/api"

export default async function Home() {
  // Fetch data
  const featuredArticleResponse = await getFeaturedArticle().catch(() => ({ data: null }))
  const articlesResponse = await getArticles().catch(() => ({ data: [] }))
  const podcastsResponse = await getPodcasts().catch(() => ({ data: [] }))
  // console.log(articlesResponse)
  // Extract the actual articles from the response
  const featuredArticles = featuredArticleResponse.data || []
  const articles = articlesResponse.data || []
  const podcasts = podcastsResponse.data || []

  // Get the first featured article if available
  const featuredArticle = featuredArticles.length > 0 ? featuredArticles[0] : null
  // console.log(featuredArticle)
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <Card className="relative h-[600px] w-full rounded-xl overflow-hidden border-0">
          <Image
            src={getStrapiMedia(featuredArticle.featured_image)}
            alt={featuredArticle?.title || "Featured article"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <span className="text-secondary mb-2 inline-block bg-primary/10 px-2 py-1 rounded-md">
              {featuredArticle.category || "Category"}
            </span>
            <h1 className="text-4xl font-bold mb-4 text-white">{featuredArticle?.title || "Featured Article Title"}</h1>
            <div className="flex items-center space-x-4">
              {/* <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={
                    featuredArticle?.author?.data?.attributes?.avatar
                      ? getStrapiMedia(featuredArticle.author.data.attributes.avatar)
                      : "/placeholder.svg"
                  }
                  alt={featuredArticle?.author?.data?.attributes?.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div> */}
              <div>
                {/* <p className="font-medium text-white">
                  By {featuredArticle?.author?.data?.attributes?.name || "Author Name"}
                </p> */}
                <p className="text-sm text-white/75">
                  {Math.ceil((featuredArticle?.content?.length || 0) / 1000)} min read
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Related Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {(articles.slice(0, 3) || Array(3).fill(null)).map((article, i) => (
          <Link key={i} href={`/articles/${article?.slug || i}`} passHref>
            <Card key={i} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={article?.featured_image ? getStrapiMedia(article.featured_image) : "/placeholder.svg"}
                  alt={article?.title || "Article thumbnail"}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <span className="text-sm text-secondary">{article?.category?.data?.attributes?.name || "Category"}</span>
                <h3 className="text-lg font-semibold mt-2 mb-1">{article?.title || "Article Title"}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>By {article?.author?.data?.attributes?.name || "Author"}</span>
                  <span className="mx-2">•</span>
                  <span>{Math.ceil((article?.content?.length || 0) / 1000)} min read</span>
                </div>
              </CardContent>
            </Card>
          </Link>

        ))}
      </section>

      {/* Latest Articles Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(articles.slice(3, 9) || Array(6).fill(null)).map((article, i) => (
            <article key={i} className="flex flex-col space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={article?.featured_image ? getStrapiMedia(article.featured_image) : "/placeholder.svg"}
                  alt={article?.title || "Article thumbnail"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-sm text-secondary">
                  {article?.category?.data?.attributes?.name || "Category"}
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-1">{article?.title || "Article Title"}</h3>
                <p className="text-muted-foreground mb-2">{article?.excerpt || "Article excerpt..."}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>By {article?.author?.data?.attributes?.name || "Author"}</span>
                  <span className="mx-2">•</span>
                  <span>{Math.ceil((article?.content?.length || 0) / 1000)} min read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Podcast Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Podcasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(podcasts.slice(0, 4) || Array(4).fill(null)).map((podcast, i) => (
            <Card key={i}>
              <div className="relative w-full pt-[100%]">
                <Image
                  src={podcast?.cover ? getStrapiMedia(podcast.cover) : "/placeholder.svg"}
                  alt={podcast?.title || "Podcast cover"}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{podcast?.title || "Podcast Title"}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Latest episode: {podcast?.latestEpisode || "Episode Title"}
                </p>
                <Link href={podcast?.link || "#"} className="text-primary hover:text-primary/90 text-sm">
                  Listen Now →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}


import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold">
            Right Down Broadway
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {/* Living Lists */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Lists</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/lists/nba-rankings" 
                          className="block p-3 space-y-1 hover:bg-accent rounded-md"
                        >
                          <div className="font-medium">NBA Player Rankings</div>
                          <p className="text-sm text-muted-foreground">
                            Weekly updated rankings of the top NBA players
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/lists/prospects" 
                          className="block p-3 space-y-1 hover:bg-accent rounded-md"
                        >
                          <div className="font-medium">Top Prospects</div>
                          <p className="text-sm text-muted-foreground">
                            Future stars and draft prospects to watch
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Blog Posts */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/blog/latest" 
                          className="block p-3 space-y-1 hover:bg-accent rounded-md"
                        >
                          <div className="font-medium">Latest Posts</div>
                          <p className="text-sm text-muted-foreground">
                            Most recent analysis and opinion pieces
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/blog/categories" 
                          className="block p-3 space-y-1 hover:bg-accent rounded-md"
                        >
                          <div className="font-medium">Categories</div>
                          <p className="text-sm text-muted-foreground">
                            Browse posts by topic
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Podcasts */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Podcasts</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/podcasts/latest" 
                          className="block p-3 space-y-1 hover:bg-accent rounded-md"
                        >
                          <div className="font-medium">Latest Episodes</div>
                          <p className="text-sm text-muted-foreground">
                            New releases from our podcast network
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/podcasts/shows" 
                          className="block p-3 space-y-1 hover:bg-accent rounded-md"
                        >
                          <div className="font-medium">Shows</div>
                          <p className="text-sm text-muted-foreground">
                            Browse all our podcast series
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/search">Search</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
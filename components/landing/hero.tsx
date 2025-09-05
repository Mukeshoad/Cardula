import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Zap, Globe } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl"></div>

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>500+ Professional Templates Available</span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-balance text-foreground leading-tight">
            Build stunning websites{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              in minutes
            </span>
          </h1>

          <p className="mt-8 text-xl sm:text-2xl text-foreground/70 text-balance max-w-3xl mx-auto leading-relaxed">
            Create professional websites with our intuitive drag-and-drop builder.
            <span className="text-foreground font-medium"> No coding required.</span>
            Join 100,000+ creators who trust SiteForge.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-10 py-4 h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              asChild
            >
              <Link href="/signup">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 h-14 bg-background/50 backdrop-blur-sm border-2 hover:bg-secondary/50 font-semibold rounded-xl transition-all duration-200"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-foreground/70">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-foreground/70">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium">Mobile Responsive</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-foreground/70">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">SEO Optimized</span>
            </div>
          </div>

          <div className="mt-20">
            <p className="text-sm text-foreground/60 mb-10 font-medium">Trusted by industry leaders</p>
            <div className="flex items-center justify-center space-x-12 opacity-40 grayscale">
              <div className="h-10 w-28 bg-foreground/20 rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-sm">TechCorp</span>
              </div>
              <div className="h-10 w-28 bg-foreground/20 rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-sm">StartupXYZ</span>
              </div>
              <div className="h-10 w-28 bg-foreground/20 rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-sm">CreativeStudio</span>
              </div>
              <div className="h-10 w-28 bg-foreground/20 rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-sm">DesignCo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Zap, Palette, Smartphone, Globe, Shield, Headphones } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Build and publish websites in minutes, not hours. Our optimized builder ensures rapid development.",
  },
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Choose from hundreds of professionally designed templates or start from scratch.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Every website automatically adapts to all screen sizes for perfect mobile experience.",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Connect your own domain or use our free subdomain to get online instantly.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee and automatic backups.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help whenever you need it with our dedicated support team and extensive documentation.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-balance text-foreground">
            Everything you need to build amazing websites
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Powerful features that make website building simple and enjoyable for everyone.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="h-full p-8 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-card-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

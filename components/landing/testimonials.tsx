import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Freelance Designer",
    avatar: "/professional-woman-designer.png",
    content:
      "SiteForge transformed how I deliver websites to clients. What used to take weeks now takes hours. The quality is incredible and my clients love the results.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Small Business Owner",
    avatar: "/professional-businessman.png",
    content:
      "I launched my restaurant's website in under an hour. The templates are beautiful and the mobile experience is flawless. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Marketing Manager",
    avatar: "/professional-woman-marketing-manager.jpg",
    content:
      "Our team uses SiteForge for all our landing pages. The collaboration features and analytics help us optimize conversions like never before.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-balance text-foreground">
            Loved by creators worldwide
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Join thousands of satisfied users who've transformed their web presence with SiteForge.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-card-foreground leading-relaxed mb-6">"{testimonial.content}"</blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-display font-bold text-card-foreground">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

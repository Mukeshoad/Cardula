import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for personal projects and getting started",
    features: ["1 website", "Basic templates", "SiteForge subdomain", "Community support", "Basic analytics"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "Best for professionals and growing businesses",
    features: [
      "Unlimited websites",
      "Premium templates",
      "Custom domain",
      "Priority support",
      "Advanced analytics",
      "Remove SiteForge branding",
      "Custom code injection",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "per month",
    description: "For teams and agencies managing multiple sites",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "White-label solution",
      "API access",
      "Advanced integrations",
      "Dedicated account manager",
      "Custom training",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32 bg-muted/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-balance text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative ${plan.popular ? "scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div
                  className={`h-full p-8 bg-card rounded-xl border-2 ${plan.popular ? "border-primary" : "border-border"} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="text-center">
                    <h3 className="font-display font-bold text-2xl text-card-foreground">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-4xl font-display font-black text-foreground">{plan.price}</span>
                      <span className="ml-2 text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="mt-4 text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full mt-8 ${plan.popular ? "" : "variant-outline"}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

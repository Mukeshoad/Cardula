"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ContactBlockProps {
  title?: string
  description?: string
  fields?: string[]
  submitText?: string
}

export function ContactBlock({
  title = "Get In Touch",
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  fields = ["name", "email", "message"],
  submitText = "Send Message",
}: ContactBlockProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <form className="space-y-4">
          {fields.includes("name") && (
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" placeholder="Your name" className="mt-1" />
            </div>
          )}

          {fields.includes("email") && (
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" placeholder="your@email.com" className="mt-1" />
            </div>
          )}

          {fields.includes("phone") && (
            <div>
              <Label htmlFor="contact-phone">Phone</Label>
              <Input id="contact-phone" type="tel" placeholder="Your phone number" className="mt-1" />
            </div>
          )}

          {fields.includes("message") && (
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea id="contact-message" placeholder="Your message" rows={4} className="mt-1" />
            </div>
          )}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            {submitText}
          </Button>
        </form>
      </div>
    </section>
  )
}

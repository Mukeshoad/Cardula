"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  Book,
  MessageCircle,
  Mail,
  ExternalLink,
  Search,
  ChevronRight,
  Play,
  FileText,
  Users,
} from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I create my first website?",
      answer:
        "Click 'Create New Site' from your dashboard, choose a template, and start customizing with our drag-and-drop builder.",
      category: "Getting Started",
    },
    {
      question: "Can I use my own domain?",
      answer:
        "Yes! You can connect your custom domain in the site settings. We support both subdomains and root domains.",
      category: "Domains",
    },
    {
      question: "How do I publish my website?",
      answer:
        "Once you're happy with your design, click the 'Publish' button in the builder. Your site will be live instantly.",
      category: "Publishing",
    },
    {
      question: "What's included in the Pro plan?",
      answer: "Pro includes unlimited sites, custom domains, advanced analytics, priority support, and more templates.",
      category: "Billing",
    },
    {
      question: "How do I add a contact form?",
      answer:
        "Drag the 'Contact Form' block from the editor panel. You can customize fields and set up email notifications.",
      category: "Features",
    },
    {
      question: "Can I export my website?",
      answer: "Yes, Pro users can export their websites as HTML/CSS files for hosting elsewhere.",
      category: "Export",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:pl-64">
          <DashboardHeader />
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">Help & Support</h1>
                <p className="text-muted-foreground">Find answers to common questions and get help when you need it</p>
              </div>

              {/* Search */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for help articles, tutorials, or FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Book className="h-5 w-5 text-primary" />
                      Documentation
                    </CardTitle>
                    <CardDescription>Comprehensive guides and tutorials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between">
                      Browse Docs
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Play className="h-5 w-5 text-primary" />
                      Video Tutorials
                    </CardTitle>
                    <CardDescription>Step-by-step video guides</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between">
                      Watch Videos
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-primary" />
                      Community
                    </CardTitle>
                    <CardDescription>Connect with other users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between">
                      Join Community
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* FAQs */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    {searchQuery
                      ? `${filteredFaqs.length} results for "${searchQuery}"`
                      : "Common questions and answers"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground">{faq.question}</h4>
                          <Badge variant="secondary" className="ml-2">
                            {faq.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                    {filteredFaqs.length === 0 && searchQuery && (
                      <div className="text-center py-8 text-muted-foreground">
                        <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No results found for "{searchQuery}"</p>
                        <p className="text-sm">Try different keywords or contact support</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Contact Support
                    </CardTitle>
                    <CardDescription>Send us a message and we'll get back to you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input placeholder="What can we help you with?" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Message</label>
                      <Textarea placeholder="Describe your issue or question in detail..." rows={4} />
                    </div>
                    <Button className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support Resources</CardTitle>
                    <CardDescription>Additional ways to get help</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>Knowledge Base</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          <span>Live Chat</span>
                        </div>
                        <Badge variant="outline">Pro Only</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>Email Support</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Response Times</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>• Free Plan: 48-72 hours</p>
                        <p>• Pro Plan: 12-24 hours</p>
                        <p>• Enterprise: 2-4 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

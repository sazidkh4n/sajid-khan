"use client"

import { useEffect } from "react"
import { X, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectModalProps {
  projectId: string
  onClose: () => void
}

const projectData: Record<
  string,
  {
    title: string
    subtitle: string
    description: string
    challenge: string
    solution: string
    features: string[]
    tech: string[]
    image: string
    githubUrl?: string
    liveUrl?: string
  }
> = {
  quickcore: {
    title: "QuickCore",
    subtitle: "A Flutter Social Video Application",
    description:
      "A universe of bite-sized knowledge. QuickCore is a cross-platform mobile app designed to deliver engaging educational content in a modern, short-form video format.",
    challenge:
      "To build a highly performant, scalable, and user-friendly video-sharing platform that works flawlessly on both iOS and Android from a single codebase, while handling complex backend operations like video storage, user authentication, and real-time engagement.",
    solution:
      "I engineered a complete end-to-end solution using Flutter for the front-end, ensuring a beautiful and native-feeling UI on all devices. For the backend, I integrated Supabase for its powerful PostgreSQL database and authentication capabilities, and Amazon S3 for robust, scalable cloud video storage and streaming.",
    features: [
      "Full User Authentication (Sign-up, Login, Profile Management)",
      "Cloud Video Upload & Optimized Streaming via AWS S3",
      "Real-time Engagement System (Likes, Comments, View Counts)",
      "Dynamic, Algorithmic Content Feed",
      "Clean, Gesture-Based UI/UX",
    ],
    tech: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Amazon S3"],
    image: "/flutter-mobile-app-dashboard.jpg",
    githubUrl: "https://github.com/sazidkh4n/QuickCore",
  },
  "jewel-jaipur": {
    title: "The Jewel Jaipur",
    subtitle: "A Headless E-commerce Case Study",
    description:
      "A full-stack e-commerce architecture bridging timeless Rajasthani tradition with the blistering performance of modern web technologies.",
    challenge:
      "To design a complete e-commerce ecosystem that could handle the robust, secure backend needs of a business (inventory, payments, shipping) while providing a lightning-fast, visually stunning, and modern front-end experience for the customer.",
    solution:
      "I engineered a decoupled, or 'headless,' system. The backend is a powerful, secure, and easy-to-manage WordPress/WooCommerce store. The frontend is a completely separate, custom-built application using React, Next.js, and TypeScript, which communicates with the WordPress backend via a REST API. This provides the best of both worlds: robust stability and bleeding-edge performance.",
    features: [
      "Backend: Full integration of CCAvenue Payment Gateway and Delhivery Shipping APIs",
      "Complete product and order management system",
      "Frontend: Server-Side Rendering (SSR) with Next.js for incredible speed and SEO",
      "Real-time product data fetching from the WordPress API",
      "Custom, responsive UI/UX",
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "WordPress",
      "WooCommerce",
      "PHP",
      "MySQL",
      "REST API",
      "CCAvenue API",
      "Delhivery API",
    ],
    image: "/luxury-jewelry-ecommerce-website.jpg",
    githubUrl: "https://github.com/sazidkh4n/the-jewel-jaipur",
  },
  "woocommerce-platform": {
    title: "WooCommerce Integration Platform",
    subtitle: "Custom E-commerce Solution",
    description:
      "A comprehensive WooCommerce-based platform with custom plugins and integrations for seamless online retail operations.",
    challenge:
      "Create a scalable e-commerce solution that integrates multiple payment gateways, inventory management systems, and shipping providers while maintaining high performance and security.",
    solution:
      "Developed custom WooCommerce plugins and REST API integrations to connect various third-party services. Implemented caching strategies and database optimization for handling high traffic volumes.",
    features: [
      "Multi-gateway payment processing (Stripe, PayPal, Razorpay)",
      "Real-time inventory synchronization",
      "Automated shipping label generation",
      "Custom product configurator",
      "Advanced analytics dashboard",
    ],
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "REST API", "JavaScript"],
    image: "/ecommerce-dashboard.png",
  },
  "ai-analytics": {
    title: "AI-Powered Analytics Dashboard",
    subtitle: "Machine Learning Data Visualization",
    description:
      "An intelligent analytics platform that uses machine learning to provide predictive insights and automated reporting for business intelligence.",
    challenge:
      "Build a real-time analytics system that processes large datasets, applies ML models for predictions, and presents complex data in an intuitive, interactive dashboard.",
    solution:
      "Created a full-stack application with Python-based ML backend and React frontend. Implemented WebSocket connections for real-time updates and used TensorFlow for predictive modeling.",
    features: [
      "Real-time data processing and visualization",
      "Predictive analytics using ML models",
      "Customizable dashboard widgets",
      "Automated report generation",
      "Multi-source data integration",
    ],
    tech: ["React", "Next.js", "Python", "TensorFlow", "PostgreSQL", "WebSocket", "D3.js"],
    image: "/ai-analytics-dashboard.png",
  },
  "social-network": {
    title: "Social Network Interface",
    subtitle: "Community Platform",
    description:
      "A modern social networking platform with real-time messaging, content sharing, and community features built for scalability and engagement.",
    challenge:
      "Design a social platform that handles real-time interactions, media uploads, and complex user relationships while maintaining fast load times and smooth user experience.",
    solution:
      "Architected a microservices-based system with separate services for messaging, media processing, and user management. Used Redis for caching and WebSocket for real-time features.",
    features: [
      "Real-time messaging and notifications",
      "Media upload and processing pipeline",
      "Advanced user profiles and connections",
      "Content feed with algorithmic ranking",
      "Group and community management",
    ],
    tech: ["React", "Node.js", "MongoDB", "Redis", "WebSocket", "AWS S3", "Docker"],
    image: "/social-network-interface.jpg",
  },
  "analytics-tool": {
    title: "Real-time Analytics Tool",
    subtitle: "Business Intelligence Platform",
    description:
      "A comprehensive analytics tool that provides real-time insights into business metrics with customizable dashboards and automated reporting.",
    challenge:
      "Create a flexible analytics platform that can handle multiple data sources, provide real-time updates, and offer customizable visualizations for different business needs.",
    solution:
      "Built a modular architecture with pluggable data connectors, real-time data processing pipeline, and a component-based dashboard system that allows users to create custom views.",
    features: [
      "Multi-source data integration",
      "Real-time metric tracking",
      "Customizable dashboard builder",
      "Scheduled report automation",
      "Team collaboration features",
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Chart.js", "WebSocket"],
    image: "/analytics-tool-charts.jpg",
  },
}

export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const project = projectData[projectId]

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="glass-panel glow-border relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl p-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-foreground hover:text-primary"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="space-y-8">
          <div>
            <h2 className="glow-text mb-2 font-mono text-4xl font-bold text-foreground">{project.title}</h2>
            <p className="mb-4 font-mono text-xl text-primary">{project.subtitle}</p>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          <img src={project.image || "/placeholder.svg"} alt={project.title} className="h-auto w-full rounded-xl" />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="mb-3 font-mono text-xl font-semibold text-primary">The Challenge</h3>
              <p className="text-pretty leading-relaxed text-muted-foreground">{project.challenge}</p>
            </div>

            <div className="glass-panel rounded-2xl p-6">
              <h3 className="mb-3 font-mono text-xl font-semibold text-primary">The Architectural Solution</h3>
              <p className="text-pretty leading-relaxed text-muted-foreground">{project.solution}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xl font-semibold text-primary">Key Features Implemented</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xl font-semibold text-primary">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-sm text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.githubUrl && (
            <div className="flex justify-center">
              <Button asChild className="bg-primary font-mono text-primary-foreground hover:bg-primary/90">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code on GitHub
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

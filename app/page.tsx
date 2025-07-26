"use client";

/**
 * MODERN LANDING PAGE: Comprehensive System Showcase
 * 
 * This landing page provides:
 * 1. Professional hero section with animated elements
 * 2. Feature highlights with modern design
 * 3. System capabilities showcase
 * 4. Social proof and testimonials
 * 5. Contact information and support
 * 6. Responsive design for all devices
 * 7. Accessibility compliant components
 * 8. Performance optimized animations
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Users, 
  BookOpen, 
  BarChart3, 
  // Globe,
  Zap,
  // Star,
  ArrowRight,
  CheckCircle,
  Github,
  Mail,
  MapPin,
  // Phone,
  Sparkles,
  Database,
  // Lock,
  Palette
} from 'lucide-react';

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ThemeSelector from "@/components/theme/theme-selector";
import { cn } from "@/lib/utils";
import { Poppins, Inter } from "next/font/google";

const titleFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const appName = process.env.NEXT_PUBLIC_APP_NAME || "P-Core";

// Animation variants for reusable animations
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <main className={cn("min-h-screen bg-background", bodyFont.className)}>
      {/* Navigation Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className={cn("text-xl font-semibold", titleFont.className)}>
              {appName}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeSelector />
            <LoginButton asChild>
              <Button size="sm">Sign In</Button>
            </LoginButton>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
          style={{ y: y1 }}
        />
        
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          style={{ y: y2 }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          style={{ y: y1 }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Next-Generation Management System
                </Badge>
              </motion.div>
              
              <h1 className={cn(
                "text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
                titleFont.className
              )}>
                Welcome to {appName}
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A powerful, flexible, and intuitive management platform designed for 
                <span className="text-primary font-semibold"> educational institutions</span>,
                <span className="text-secondary font-semibold"> organizations</span>, and
                <span className="text-accent font-semibold"> businesses</span> of all sizes.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <LoginButton asChild>
                <Button size="lg" className="px-8 py-3 text-lg font-semibold group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </LoginButton>
              
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto"
            >
              {[
                { number: "50+", label: "Organizations" },
                { number: "10K+", label: "Students Managed" },
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              titleFont.className
            )}>
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your organization efficiently and securely
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Advanced security with 2FA, role-based access control, and encrypted data storage",
                color: "text-green-500"
              },
              {
                icon: Users,
                title: "Multi-Tenant Architecture",
                description: "Secure organization isolation with seamless user management and permissions",
                color: "text-blue-500"
              },
              {
                icon: BookOpen,
                title: "Education Management",
                description: "Complete student lifecycle management with courses, enrollments, and progress tracking",
                color: "text-purple-500"
              },
              {
                icon: BarChart3,
                title: "Analytics & Reports",
                description: "Real-time insights with customizable dashboards and comprehensive reporting",
                color: "text-orange-500"
              },
              {
                icon: Database,
                title: "Robust Data Management",
                description: "Dual-database architecture with automatic backups and data integrity checks",
                color: "text-cyan-500"
              },
              {
                icon: Palette,
                title: "Customizable Themes",
                description: "Personalized experience with custom color schemes and branding options",
                color: "text-pink-500"
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className={cn("w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4")}>
                      <feature.icon className={cn("w-6 h-6", feature.color)} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              titleFont.className
            )}>
              Perfect For Every Organization
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible and scalable solution that adapts to your unique needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Educational Institutions",
                description: "Schools, colleges, and universities",
                features: ["Student Management", "Course Planning", "Progress Tracking", "Parent Communication"],
                gradient: "from-blue-500/10 to-cyan-500/10"
              },
              {
                title: "Religious Organizations",
                description: "Churches, temples, and faith communities",
                features: ["Member Directory", "Event Management", "Volunteer Coordination", "Donation Tracking"],
                gradient: "from-purple-500/10 to-pink-500/10"
              },
              {
                title: "Business Organizations",
                description: "Companies and professional services",
                features: ["Employee Management", "Project Tracking", "Resource Planning", "Performance Analytics"],
                gradient: "from-orange-500/10 to-red-500/10"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={cn(
                  "h-full bg-gradient-to-br border-0 hover:shadow-xl transition-all duration-300",
                  useCase.gradient
                )}>
                  <CardHeader>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    <CardDescription className="text-base">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {useCase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Developer Info */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              titleFont.className
            )}>
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your organization? Contact us for support, questions, or custom solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">peterpausianlian2020@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">Kalaymyo, Myanmar 🇲🇲</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-sm text-muted-foreground">github.com/peterlianpi/P-Core</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">About the Developer</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Peter Pau Sian Lian</strong> - Full-stack developer passionate about creating 
                      efficient, secure, and user-friendly management systems. Specializing in modern web 
                      technologies and enterprise-grade applications.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Technical Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Next.js 15", "TypeScript", "Prisma ORM", "NextAuth.js",
                      "Tailwind CSS", "shadcn/ui", "PostgreSQL", "Hono.js"
                    ].map((tech, index) => (
                      <Badge key={index} variant="secondary" className="justify-center py-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Enterprise-grade security and authentication</li>
                      <li>• Multi-tenant architecture with organization isolation</li>
                      <li>• Real-time updates and responsive design</li>
                      <li>• Comprehensive API with rate limiting</li>
                      <li>• Advanced error handling and monitoring</li>
                      <li>• Custom theming and branding options</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className={cn("text-xl font-semibold", titleFont.className)}>
                {appName}
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 P-Core System</span>
              <span>•</span>
              <span>Built with ❤️ by Peter Pau Sian Lian</span>
              <span>•</span>
              <span>Myanmar 🇲🇲</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

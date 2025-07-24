"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  ArrowLeft,
  Search,
  FileQuestion,
  Compass,
  RefreshCw,
  Sparkles,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate random sparkles
    const sparkleArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setSparkles(sparkleArray);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      {/* Animated Background Sparkles */}
      {mounted && sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <Star className="h-4 w-4 text-primary/20 animate-pulse" />
        </div>
      ))}
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/5 rounded-full animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-accent/5 rounded-full animate-float-fast"></div>
      </div>

      <div className={cn(
        "w-full max-w-2xl transform transition-all duration-1000",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 relative">
              <div className="relative group">
                <FileQuestion className="h-32 w-32 text-muted-foreground/30 mx-auto transition-all duration-500 group-hover:text-muted-foreground/50 group-hover:scale-105 animate-float-gentle" />
                <div className="absolute -top-2 -right-2 bg-primary/10 rounded-full p-3 animate-bounce-gentle hover:bg-primary/20 transition-colors duration-300">
                  <Search className="h-8 w-8 text-primary animate-pulse" />
                </div>
                
                {/* Sparkle effects around the icon */}
                <div className="absolute -top-4 -left-4 animate-spin-slow">
                  <Sparkles className="h-6 w-6 text-primary/40" />
                </div>
                <div className="absolute -bottom-4 -right-4 animate-spin-slow" style={{ animationDelay: '1s' }}>
                  <Sparkles className="h-4 w-4 text-secondary/40" />
                </div>
              </div>
            </div>
            
            <CardTitle className={cn(
              "text-6xl font-bold mb-2 transition-all duration-700 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
              mounted ? "animate-bounce-in" : ""
            )}>
              404
            </CardTitle>
            
            <div className={cn(
              "space-y-2 transition-all duration-700",
              mounted ? "animate-slide-up" : "opacity-0 translate-y-4"
            )}>
              <h1 className="text-2xl font-semibold text-foreground animate-fade-in">
                Oops! Page Not Found
              </h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto animate-fade-in-delayed">
                The page you're looking for seems to have wandered off into the digital wilderness. 
                Let's get you back on track! 🚀
              </p>
            </div>
          </CardHeader>

          <CardContent className={cn(
            "space-y-6 transition-all duration-700",
            mounted ? "animate-fade-in-up" : "opacity-0 translate-y-4"
          )}>
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleGoBack}
                variant="outline"
                size="lg"
                className="h-14 group hover:border-primary/50 hover:scale-105 transition-all duration-300 animate-slide-in-left"
              >
                <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 group-hover:text-primary transition-all duration-300" />
                <div className="text-left">
                  <div className="font-medium group-hover:text-primary transition-colors">Go Back</div>
                  <div className="text-xs text-muted-foreground">
                    Previous page
                  </div>
                </div>
              </Button>

              <Button
                asChild
                size="lg"
                className="h-14 group hover:shadow-lg hover:scale-105 transition-all duration-300 animate-slide-in-right bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Link href="/">
                  <Home className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <div className="text-left">
                    <div className="font-medium">Home</div>
                    <div className="text-xs opacity-90">Go to dashboard</div>
                  </div>
                </Link>
              </Button>
            </div>

            {/* Additional Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up-delayed">
              <Button
                onClick={handleRefresh}
                variant="ghost"
                size="lg"
                className="h-12 hover:bg-muted/50 hover:scale-105 transition-all duration-300 group"
              >
                <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Refresh Page
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 hover:bg-muted/50 hover:scale-105 transition-all duration-300 group"
              >
                <Link href="/help">
                  <Compass className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Get Help
                </Link>
              </Button>
            </div>

            {/* Popular Pages */}
            <div className="pt-4 border-t animate-fade-in-up-more-delayed">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Popular Pages
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/school-management", label: "School Management" },
                  { href: "/organization-management", label: "Organizations" },
                  { href: "/settings", label: "Settings" },
                  { href: "/profile", label: "Profile" },
                  { href: "/help", label: "Help Center" }
                ].map((item, index) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    size="sm"
                    className="justify-start h-9 hover:scale-105 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animation: mounted ? 'slideInScale 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center pt-4 border-t animate-fade-in-final">
              <p className="text-sm text-muted-foreground">
                Still can't find what you're looking for?{" "}
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="p-0 h-auto font-medium hover:scale-110 transition-transform duration-300 text-primary hover:text-primary/80"
                >
                  <Link href="/contact">Contact Support ✨</Link>
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(-90deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
          0% { transform: translateX(-50px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          0% { transform: translateX(50px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInScale {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(10px, -10px) rotate(90deg); opacity: 0.6; }
          50% { transform: translate(-5px, -20px) rotate(180deg); opacity: 0.8; }
          75% { transform: translate(-15px, -5px) rotate(270deg); opacity: 0.6; }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
          33% { transform: translate(-15px, 15px) rotate(120deg); opacity: 0.5; }
          66% { transform: translate(15px, -10px) rotate(240deg); opacity: 0.7; }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(20px, -20px) scale(1.2); opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.3s forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out 0.4s forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out 0.5s forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out 0.6s forwards; }
        .animate-fade-in-delayed { animation: fade-in-delayed 0.8s ease-out 0.8s forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out 0.6s forwards; }
        .animate-fade-in-up-delayed { animation: fade-in-up 0.6s ease-out 0.8s forwards; }
        .animate-fade-in-up-more-delayed { animation: fade-in-up 0.6s ease-out 1s forwards; }
        .animate-fade-in-final { animation: fade-in-up 0.6s ease-out 1.2s forwards; }
        .animate-float-slow { animation: float-slow 20s linear infinite; }
        .animate-float-medium { animation: float-medium 15s linear infinite; }
        .animate-float-fast { animation: float-fast 10s linear infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}

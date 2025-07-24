"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ServerCrash,
  ArrowLeft,
  Home,
  RefreshCw,
  Wrench,
  AlertTriangle,
  Mail,
  Zap,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function InternalServerError() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate random sparkles
    const sparkleArray = Array.from({ length: 12 }, (_, i) => ({
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50/50 via-background to-red-50/30 relative overflow-hidden">
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
          <Zap className="h-4 w-4 text-orange-400/30 animate-pulse" />
        </div>
      ))}
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/5 rounded-full animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-red-500/5 rounded-full animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-yellow-500/5 rounded-full animate-float-fast"></div>
      </div>

      <div className={cn(
        "w-full max-w-2xl transform transition-all duration-1000",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 border-orange-200/50">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse blur-sm"></div>
                <ServerCrash className="h-32 w-32 text-red-500/70 mx-auto relative z-10 transition-all duration-500 group-hover:text-red-500 group-hover:scale-105 animate-float-gentle" />
                
                {/* Warning indicator */}
                <div className="absolute -top-2 -right-2 bg-orange-100 rounded-full p-2 animate-bounce-gentle">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                
                {/* Tool overlay */} 
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <Wrench className="h-8 w-8 text-orange-600 animate-wiggle" />
                </div>
                
                {/* Sparkle effects */}
                <div className="absolute -top-4 -left-4 animate-spin-slow">
                  <Sparkles className="h-6 w-6 text-orange-400/60" />
                </div>
                <div className="absolute -bottom-4 -right-4 animate-spin-slow" style={{ animationDelay: '1.5s' }}>
                  <Sparkles className="h-5 w-5 text-red-400/60" />
                </div>
              </div>
            </div>
            
            <CardTitle className={cn(
              "text-6xl font-bold mb-2 transition-all duration-700 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent",
              mounted ? "animate-bounce-in" : ""
            )}>
              500
            </CardTitle>
            
            <div className={cn(
              "space-y-2 transition-all duration-700",
              mounted ? "animate-slide-up" : "opacity-0 translate-y-4"
            )}>
              <h1 className="text-2xl font-semibold text-foreground animate-fade-in">
                Internal Server Error
              </h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto animate-fade-in-delayed">
                Oops! Something went wrong on our end. Our engineers have been notified 
                and are working to fix this issue. 🔧
              </p>
            </div>
          </CardHeader>

          <CardContent className={cn(
            "space-y-6 transition-all duration-700",
            mounted ? "animate-fade-in-up" : "opacity-0 translate-y-4"
          )}>
            {/* Primary Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleRefresh}
                size="lg"
                className="h-14 group hover:shadow-lg hover:scale-105 transition-all duration-300 animate-slide-in-left bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                <div className="text-left">
                  <div className="font-medium">Try Again</div>
                  <div className="text-xs opacity-90">Reload the page</div>
                </div>
              </Button>

              <Button
                onClick={handleGoBack}
                variant="outline"
                size="lg"
                className="h-14 group hover:border-orange-300 hover:scale-105 transition-all duration-300 animate-slide-in-right"
              >
                <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 group-hover:text-orange-500 transition-all duration-300" />
                <div className="text-left">
                  <div className="font-medium group-hover:text-orange-500 transition-colors">Go Back</div>
                  <div className="text-xs text-muted-foreground">Previous page</div>
                </div>
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up-delayed">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 hover:bg-orange-50 hover:scale-105 transition-all duration-300 group"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Homepage
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 hover:bg-orange-50 hover:scale-105 transition-all duration-300 group"
              >
                <Link href="mailto:support@p-core.com">
                  <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Report Issue
                </Link>
              </Button>
            </div>

            {/* Information Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 animate-fade-in-up-more-delayed">
              <h3 className="font-medium text-orange-800 mb-2 flex items-center">
                <Wrench className="w-4 h-4 mr-2" />
                What happened?
              </h3>
              <p className="text-sm text-orange-700">
                Our server encountered an unexpected condition that prevented it from 
                fulfilling your request. This could be due to:
              </p>
              <ul className="list-disc list-inside text-sm text-orange-700 mt-2 space-y-1">
                <li>Temporary server overload</li>
                <li>Database connectivity issues</li>
                <li>Application configuration problems</li>
                <li>Third-party service interruptions</li>
              </ul>
            </div>

            {/* Status Links */}
            <div className="pt-4 border-t animate-fade-in-up-more-delayed">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center justify-center">
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Service Status
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { href: "/status", label: "System Status" },
                  { href: "/health", label: "Health Check" },
                  { href: "/docs", label: "Documentation" },
                  { href: "/support", label: "Support" },
                  { href: "/changelog", label: "Updates" },
                  { href: "/contact", label: "Contact" }
                ].map((item, index) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    size="sm"
                    className="justify-start h-9 hover:scale-105 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
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
                Issue persisting?{" "}
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="p-0 h-auto font-medium hover:scale-110 transition-transform duration-300 text-orange-600 hover:text-orange-500"
                >
                  <Link href="mailto:support@p-core.com">Contact Our Support Team 🛠️</Link>
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(8deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.2) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(-90deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
          0% { transform: translateX(-60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          0% { transform: translateX(60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInScale {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(20px, -20px) rotate(90deg); opacity: 0.6; }
          50% { transform: translate(-15px, -30px) rotate(180deg); opacity: 0.8; }
          75% { transform: translate(-25px, -15px) rotate(270deg); opacity: 0.6; }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
          33% { transform: translate(-25px, 25px) rotate(120deg); opacity: 0.5; }
          66% { transform: translate(25px, -20px) rotate(240deg); opacity: 0.7; }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(30px, -30px) scale(1.4); opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float-gentle { animation: float-gentle 5s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 1.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.3s forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out 0.4s forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out 0.5s forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out 0.6s forwards; }
        .animate-fade-in-delayed { animation: fade-in-delayed 0.8s ease-out 0.8s forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out 0.6s forwards; }
        .animate-fade-in-up-delayed { animation: fade-in-up 0.6s ease-out 0.8s forwards; }
        .animate-fade-in-up-more-delayed { animation: fade-in-up 0.6s ease-out 1s forwards; }
        .animate-fade-in-final { animation: fade-in-up 0.6s ease-out 1.2s forwards; }
        .animate-float-slow { animation: float-slow 30s linear infinite; }
        .animate-float-medium { animation: float-medium 25s linear infinite; }
        .animate-float-fast { animation: float-fast 20s linear infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  Sparkles,
  Zap,
  Star,
  Circle,
  Triangle,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loading() {
  const [mounted, setMounted] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading");
  const [dots, setDots] = useState("");
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  const loadingMessages = [
    "Loading your dashboard",
    "Preparing your workspace",
    "Setting up your environment",
    "Almost ready",
    "Just a moment",
    "Getting things ready",
    "Loading components",
    "Initializing system"
  ];

  useEffect(() => {
    setMounted(true);
    
    // Generate floating particles
    const particleArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 0.5 + 0.5,
    }));
    setParticles(particleArray);

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    // Change loading text
    const textInterval = setInterval(() => {
      setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(textInterval);
    };
  }, []);

  const ParticleIcon = ({ index }: { index: number }) => {
    const icons = [Sparkles, Zap, Star, Circle, Triangle, Square];
    const Icon = icons[index % icons.length];
    return <Icon className="w-full h-full" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Animated Background Particles */}
      {mounted && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            transform: `scale(${particle.size})`,
          }}
        >
          <div className="w-4 h-4 text-primary animate-float-particle">
            <ParticleIcon index={particle.id} />
          </div>
        </div>
      ))}
      
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/3 rounded-full animate-float-slow blur-sm"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-secondary/3 rounded-full animate-float-medium blur-sm"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/3 rounded-full animate-float-fast blur-sm"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-primary/2 rotate-45 animate-float-gentle blur-sm"></div>
      </div>

      {/* Main Loading Content */}
      <div className={cn(
        "relative z-10 transform transition-all duration-1000",
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
          <CardContent className="p-12 text-center space-y-8">
            {/* Main Loading Spinner */}
            <div className="relative mx-auto">
              {/* Outer rotating ring */}
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin-slow absolute inset-0"></div>
              
              {/* Middle rotating ring */}
              <div className="w-24 h-24 rounded-full border-3 border-secondary/20 border-r-secondary animate-spin-reverse absolute inset-4"></div>
              
              {/* Inner pulsing circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse-scale absolute inset-8 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-orbit">
                <div className="w-4 h-4 bg-primary rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <div className="absolute inset-0 animate-orbit-reverse" style={{ animationDelay: '1s' }}>
                <div className="w-3 h-3 bg-secondary rounded-full absolute -bottom-1.5 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>

            {/* Loading Text with Animation */}
            <div className="space-y-4">
              <h2 className={cn(
                "text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-500",
                mounted ? "animate-fade-in-bounce" : "opacity-0"
              )}>
                {loadingText}{dots}
              </h2>
              
              <p className={cn(
                "text-muted-foreground text-lg transition-all duration-700",
                mounted ? "animate-fade-in-delayed" : "opacity-0"
              )}>
                Please wait while we prepare everything for you ✨
              </p>
            </div>

            {/* Progress Indicators */}
            <div className={cn(
              "space-y-4 transition-all duration-900",
              mounted ? "animate-slide-up" : "opacity-0 translate-y-4"
            )}>
              {/* Animated Progress Bar */}
              <div className="w-64 h-2 bg-muted rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary animate-progress-wave"></div>
              </div>
              
              {/* Loading Steps */}
              <div className="flex justify-center space-x-3">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className="w-3 h-3 rounded-full bg-primary/30 animate-pulse-sequence"
                    style={{ animationDelay: `${step * 0.3}s` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Fun Elements */}
            <div className={cn(
              "flex justify-center space-x-6 transition-all duration-1100",
              mounted ? "animate-bounce-in-sequence" : "opacity-0"
            )}>
              <div className="animate-bounce-gentle" style={{ animationDelay: '0s' }}>
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <div className="animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>
                <Star className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes fade-in-bounce {
          0% { opacity: 0; transform: translateY(-20px) scale(0.9); }
          50% { opacity: 0.7; transform: translateY(5px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes progress-wave {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-sequence {
          0%, 80%, 100% { 
            transform: scale(1);
            background-color: rgb(var(--primary) / 0.3);
          }
          40% { 
            transform: scale(1.3);
            background-color: rgb(var(--primary) / 1);
          }
        }
        
        @keyframes bounce-in-sequence {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg) scale(1); 
            opacity: 0.3; 
          }
          25% { 
            transform: translate(10px, -15px) rotate(90deg) scale(1.2); 
            opacity: 0.7; 
          }
          50% { 
            transform: translate(-5px, -25px) rotate(180deg) scale(0.8); 
            opacity: 1; 
          }
          75% { 
            transform: translate(-15px, -10px) rotate(270deg) scale(1.1); 
            opacity: 0.5; 
          }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(20px, -20px) rotate(90deg); opacity: 0.6; }
          50% { transform: translate(-10px, -30px) rotate(180deg); opacity: 0.8; }
          75% { transform: translate(-25px, -15px) rotate(270deg); opacity: 0.6; }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(45deg); opacity: 0.2; }
          33% { transform: translate(-25px, 25px) rotate(165deg); opacity: 0.5; }
          66% { transform: translate(25px, -20px) rotate(285deg); opacity: 0.7; }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: translate(30px, -30px) scale(1.3) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -15px) rotate(45deg); }
        }
        
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 2s linear infinite; }
        .animate-pulse-scale { animation: pulse-scale 2s ease-in-out infinite; }
        .animate-orbit { animation: orbit 4s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 3s linear infinite; }
        .animate-fade-in-bounce { animation: fade-in-bounce 1s ease-out 0.3s forwards; }
        .animate-fade-in-delayed { animation: fade-in-delayed 0.8s ease-out 0.6s forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.8s forwards; }
        .animate-progress-wave { animation: progress-wave 2s ease-in-out infinite; }
        .animate-pulse-sequence { animation: pulse-sequence 1.5s ease-in-out infinite; }
        .animate-bounce-in-sequence { animation: bounce-in-sequence 0.6s ease-out 1s forwards; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 20s linear infinite; }
        .animate-float-medium { animation: float-medium 15s linear infinite; }
        .animate-float-fast { animation: float-fast 12s linear infinite; }
        .animate-float-gentle { animation: float-gentle 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

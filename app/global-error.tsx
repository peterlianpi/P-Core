"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Bug,
  Send,
  Zap,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    console.error("Global error:", error);
    
    // Generate random sparkles
    const sparkleArray = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setSparkles(sparkleArray);
  }, [error]);

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleSendReport = () => {
    // You can implement error reporting here
    const errorReport = {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    console.log("Error report:", errorReport);
    // Send to your error reporting service
  };

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50/50 via-background to-orange-50/30 relative overflow-hidden">
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
              <Zap className="h-4 w-4 text-red-400/30 animate-pulse" />
            </div>
          ))}
          
          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/5 rounded-full animate-float-slow"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-orange-500/5 rounded-full animate-float-medium"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-yellow-500/5 rounded-full animate-float-fast"></div>
          </div>

          <div className={cn(
            "w-full max-w-2xl transform transition-all duration-1000",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 border-red-200/50">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-6 relative">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse blur-sm"></div>
                    <AlertTriangle className="h-32 w-32 text-red-500/70 mx-auto relative z-10 transition-all duration-500 group-hover:text-red-500 group-hover:scale-105 animate-float-gentle" />
                    
                    {/* Bug indicator */}
                    <div className="absolute -top-2 -right-2 bg-red-100 rounded-full p-2 animate-bounce-gentle">
                      <Bug className="h-6 w-6 text-red-600" />
                    </div>
                    
                    {/* Sparkle effects */}
                    <div className="absolute -top-4 -left-4 animate-spin-slow">
                      <Sparkles className="h-6 w-6 text-red-400/60" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 animate-spin-slow" style={{ animationDelay: '1.5s' }}>
                      <Sparkles className="h-5 w-5 text-orange-400/60" />
                    </div>
                  </div>
                </div>
                
                <CardTitle className={cn(
                  "text-4xl font-bold mb-4 transition-all duration-700 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent",
                  mounted ? "animate-bounce-in" : ""
                )}>
                  Application Error
                </CardTitle>
                
                <div className={cn(
                  "space-y-3 transition-all duration-700",
                  mounted ? "animate-slide-up" : "opacity-0 translate-y-4"
                )}>
                  <h1 className="text-xl font-semibold text-foreground animate-fade-in">
                    Oops! Something went wrong
                  </h1>
                  <p className="text-muted-foreground max-w-md mx-auto animate-fade-in-delayed">
                    We encountered an unexpected error. Our team has been notified and is working to fix this issue.
                  </p>
                  
                  {process.env.NODE_ENV === "development" && (
                    <details className="text-left bg-red-50 border border-red-200 rounded-lg p-4 mt-4 max-w-lg mx-auto animate-fade-in-more-delayed">
                      <summary className="cursor-pointer font-medium text-red-700 mb-2 flex items-center">
                        <Bug className="w-4 h-4 mr-2" />
                        Error Details (Development)
                      </summary>
                      <div className="space-y-2 text-red-600 text-sm">
                        <div>
                          <strong>Message:</strong> {error.message}
                        </div>
                        {error.digest && (
                          <div>
                            <strong>Digest:</strong> {error.digest}
                          </div>
                        )}
                        <div>
                          <strong>Stack:</strong>
                          <pre className="whitespace-pre-wrap mt-1 text-xs max-h-32 overflow-y-auto bg-white/50 p-2 rounded">
                            {error.stack}
                          </pre>
                        </div>
                      </div>
                    </details>
                  )}
                </div>
              </CardHeader>

              <CardContent className={cn(
                "space-y-6 transition-all duration-700",
                mounted ? "animate-fade-in-up" : "opacity-0 translate-y-4"
              )}>
                {/* Primary Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    onClick={reset}
                    size="lg"
                    className="h-14 group hover:shadow-lg hover:scale-105 transition-all duration-300 animate-slide-in-left bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  >
                    <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                    <div className="text-left">
                      <div className="font-medium">Try Again</div>
                      <div className="text-xs opacity-90">Reload component</div>
                    </div>
                  </Button>

                  <Button
                    onClick={handleGoHome}
                    variant="outline"
                    size="lg"
                    className="h-14 group hover:border-red-300 hover:scale-105 transition-all duration-300 animate-slide-in-right"
                  >
                    <Home className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <div className="text-left">
                      <div className="font-medium group-hover:text-red-500 transition-colors">Go Home</div>
                      <div className="text-xs text-muted-foreground">Back to safety</div>
                    </div>
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up-delayed">
                  <Button
                    onClick={handleReload}
                    variant="ghost"
                    size="lg"
                    className="h-12 hover:bg-red-50 hover:scale-105 transition-all duration-300 group"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Reload Page
                  </Button>

                  <Button
                    onClick={handleSendReport}
                    variant="ghost"
                    size="lg"
                    className="h-12 hover:bg-red-50 hover:scale-105 transition-all duration-300 group"
                  >
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    Report Issue
                  </Button>
                </div>

                {/* Help Text */}
                <div className="text-center pt-4 border-t animate-fade-in-final">
                  <p className="text-sm text-muted-foreground">
                    If this problem persists, please{" "}
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto font-medium hover:scale-110 transition-transform duration-300 text-red-600 hover:text-red-500"
                      onClick={() => window.location.href = "mailto:support@example.com"}
                    >
                      contact our support team ⚡
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
            
            @keyframes fade-in-more-delayed {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fade-in-up {
              0% { opacity: 0; transform: translateY(25px); }
              100% { opacity: 1; transform: translateY(0); }
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
            .animate-bounce-in { animation: bounce-in 1.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
            .animate-slide-up { animation: slide-up 0.8s ease-out 0.3s forwards; }
            .animate-slide-in-left { animation: slide-in-left 0.6s ease-out 0.4s forwards; }
            .animate-slide-in-right { animation: slide-in-right 0.6s ease-out 0.5s forwards; }
            .animate-fade-in { animation: fade-in 0.8s ease-out 0.6s forwards; }
            .animate-fade-in-delayed { animation: fade-in-delayed 0.8s ease-out 0.8s forwards; }
            .animate-fade-in-more-delayed { animation: fade-in-more-delayed 0.8s ease-out 1s forwards; }
            .animate-fade-in-up { animation: fade-in-up 0.6s ease-out 0.6s forwards; }
            .animate-fade-in-up-delayed { animation: fade-in-up 0.6s ease-out 0.8s forwards; }
            .animate-fade-in-final { animation: fade-in-up 0.6s ease-out 1.2s forwards; }
            .animate-float-slow { animation: float-slow 30s linear infinite; }
            .animate-float-medium { animation: float-medium 25s linear infinite; }
            .animate-float-fast { animation: float-fast 20s linear infinite; }
            .animate-spin-slow { animation: spin-slow 12s linear infinite; }
          `}</style>
        </div>
      </body>
    </html>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  ShieldX,
  ArrowLeft,
  Home,
  Lock,
  AlertTriangle,
  Mail,
  Settings,
  User,
  Crown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessDeniedPageProps {
  title?: string;
  description?: string;
  requiredRole?: string;
  currentRole?: string;
  contactEmail?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  className?: string;
}

export const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({
  title = "Access Denied",
  description = "You don't have permission to access this resource. Please contact your administrator if you believe this is an error.",
  requiredRole,
  currentRole,
  contactEmail = "admin@example.com",
  showBackButton = true,
  showHomeButton = true,
  className,
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate floating icons
    const iconsArray = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setFloatingIcons(iconsArray);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const getRoleIcon = (role?: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
      case "super admin":
        return <Crown className="w-4 h-4" />;
      case "editor":
        return <Settings className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
      case "super admin":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "editor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50/50 via-background to-orange-50/30 relative overflow-hidden",
      className
    )}>
      {/* Animated Background Elements */}
      {mounted && floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute pointer-events-none opacity-10"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animationDelay: `${icon.delay}s`,
          }}
        >
          <ShieldX className="h-8 w-8 text-red-500 animate-float-gentle" />
        </div>
      ))}
      
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-red-500/5 rounded-full animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-orange-500/5 rounded-full animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-500/5 rounded-full animate-float-fast"></div>
      </div>

      <div className={cn(
        "w-full max-w-2xl transform transition-all duration-1000",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 border-red-200/50">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>
                <ShieldX className="h-32 w-32 text-red-500/70 mx-auto relative z-10 transition-all duration-500 group-hover:text-red-500 group-hover:scale-105 animate-float-gentle" />
                
                {/* Lock overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <Lock className="h-12 w-12 text-red-600 animate-bounce-gentle" />
                </div>
                
                {/* Warning indicators */}
                <div className="absolute -top-2 -left-2 animate-pulse">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                </div>
                <div className="absolute -bottom-2 -right-2 animate-spin-slow">
                  <Sparkles className="h-5 w-5 text-red-400" />
                </div>
              </div>
            </div>
            
            <CardTitle className={cn(
              "text-4xl font-bold mb-4 transition-all duration-700 text-red-600",
              mounted ? "animate-bounce-in" : ""
            )}>
              {title}
            </CardTitle>
            
            <div className={cn(
              "space-y-3 transition-all duration-700",
              mounted ? "animate-slide-up" : "opacity-0 translate-y-4"
            )}>
              <p className="text-muted-foreground text-lg max-w-md mx-auto animate-fade-in-delayed">
                {description}
              </p>
              
              {/* Role Information */}
              {(requiredRole || currentRole) && (
                <div className="bg-muted/30 rounded-lg p-4 space-y-2 animate-fade-in-more-delayed">
                  {requiredRole && (
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span className="text-muted-foreground">Required role:</span>
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1",
                        getRoleColor(requiredRole)
                      )}>
                        {getRoleIcon(requiredRole)}
                        {requiredRole}
                      </div>
                    </div>
                  )}
                  {currentRole && (
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span className="text-muted-foreground">Your role:</span>
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1",
                        getRoleColor(currentRole)
                      )}>
                        {getRoleIcon(currentRole)}
                        {currentRole}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className={cn(
            "space-y-6 transition-all duration-700",
            mounted ? "animate-fade-in-up" : "opacity-0 translate-y-4"
          )}>
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {showBackButton && (
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  size="lg"
                  className="h-14 group hover:border-red-300 hover:scale-105 transition-all duration-300 animate-slide-in-left"
                >
                  <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 group-hover:text-red-500 transition-all duration-300" />
                  <div className="text-left">
                    <div className="font-medium group-hover:text-red-500 transition-colors">Go Back</div>
                    <div className="text-xs text-muted-foreground">Previous page</div>
                  </div>
                </Button>
              )}

              {showHomeButton && (
                <Button
                  asChild
                  size="lg"
                  className="h-14 group hover:shadow-lg hover:scale-105 transition-all duration-300 animate-slide-in-right bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  <Link href="/">
                    <Home className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <div className="text-left">
                      <div className="font-medium">Dashboard</div>
                      <div className="text-xs opacity-90">Go to main page</div>
                    </div>
                  </Link>
                </Button>
              )}
            </div>

            {/* Help Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up-delayed">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 hover:bg-red-50 hover:scale-105 transition-all duration-300 group"
              >
                <Link href="/settings/permissions">
                  <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Check Permissions
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 hover:bg-red-50 hover:scale-105 transition-all duration-300 group"
              >
                <Link href={`mailto:${contactEmail}`}>
                  <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Contact Admin
                </Link>
              </Button>
            </div>

            {/* Quick Access Links */}
            <div className="pt-4 border-t animate-fade-in-up-more-delayed">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2 animate-pulse" />
                Available Areas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/profile", label: "Profile" },
                  { href: "/settings", label: "Settings" },
                  { href: "/help", label: "Help Center" },
                  { href: "/docs", label: "Documentation" },
                  { href: "/support", label: "Support" }
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
                Need immediate help?{" "}
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="p-0 h-auto font-medium hover:scale-110 transition-transform duration-300 text-red-600 hover:text-red-500"
                >
                  <Link href={`mailto:${contactEmail}`}>Contact Administrator 🔒</Link>
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
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-more-delayed {
          0% { opacity: 0; transform: translateY(15px); }
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
          25% { transform: translate(15px, -15px) rotate(90deg); opacity: 0.6; }
          50% { transform: translate(-10px, -25px) rotate(180deg); opacity: 0.8; }
          75% { transform: translate(-20px, -10px) rotate(270deg); opacity: 0.6; }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
          33% { transform: translate(-20px, 20px) rotate(120deg); opacity: 0.5; }
          66% { transform: translate(20px, -15px) rotate(240deg); opacity: 0.7; }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(25px, -25px) scale(1.3); opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2.5s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.3s forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out 0.4s forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out 0.5s forwards; }
        .animate-fade-in-delayed { animation: fade-in-delayed 0.8s ease-out 0.8s forwards; }
        .animate-fade-in-more-delayed { animation: fade-in-more-delayed 0.8s ease-out 1s forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out 0.6s forwards; }
        .animate-fade-in-up-delayed { animation: fade-in-up 0.6s ease-out 0.8s forwards; }
        .animate-fade-in-up-more-delayed { animation: fade-in-up 0.6s ease-out 1s forwards; }
        .animate-fade-in-final { animation: fade-in-up 0.6s ease-out 1.2s forwards; }
        .animate-float-slow { animation: float-slow 25s linear infinite; }
        .animate-float-medium { animation: float-medium 20s linear infinite; }
        .animate-float-fast { animation: float-fast 15s linear infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>
    </div>
  );
};

export default AccessDeniedPage;

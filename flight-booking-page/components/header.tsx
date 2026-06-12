"use client";

import { Plane, Menu, X, LogOut, MapPin, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";
import { TourRequestModal } from "@/components/tour-request-modal";

interface UserData {
  name: string;
  email: string;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [tourRequestOpen, setTourRequestOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "login" | "register" }>({
    isOpen: false,
    mode: "login",
  });

  const { theme, setTheme } = useTheme();

  const openLogin = () => setAuthModal({ isOpen: true, mode: "login" });
  const openRegister = () => setAuthModal({ isOpen: true, mode: "register" });
  const closeAuth = () => setAuthModal({ isOpen: false, mode: "login" });

  const handleAuthSuccess = (userData: UserData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                  <Plane className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Airvon</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="/#vuelos" className="text-muted-foreground hover:text-foreground transition-colors">
                Vuelos
              </a>
              <Link href="/destinos" className="text-muted-foreground hover:text-foreground transition-colors">
                Destinos
              </Link>
              <a href="/#tours" className="text-muted-foreground hover:text-foreground transition-colors">
                Tours
              </a>
              <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
              <a href="/#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Cambiar tema"
              >
                <Sun className="h-5 w-5 text-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 text-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{user.name.split(" ")[0]}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-lg shadow-lg border border-border py-2">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setTourRequestOpen(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-muted transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Solicitar Tour</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-muted transition-colors text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Cerrar sesion</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={openLogin}>Iniciar Sesion</Button>
                  <Button onClick={openRegister}>Registrarse</Button>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-4">
                <a href="/#vuelos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Vuelos
                </a>
                <Link href="/destinos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Destinos
                </Link>
                <a href="/#tours" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tours
                </a>
                <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                  Admin
                </Link>
                <a href="/#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </a>
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 px-2 py-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-medium text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setTourRequestOpen(true);
                          setMobileMenuOpen(false);
                        }}
                        className="justify-start"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Solicitar Tour
                      </Button>
                      <Button variant="ghost" onClick={handleLogout} className="justify-start text-destructive">
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar sesion
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" onClick={openLogin}>Iniciar Sesion</Button>
                      <Button onClick={openRegister}>Registrarse</Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={closeAuth} 
        initialMode={authModal.mode}
        onAuthSuccess={handleAuthSuccess}
      />

      {user && (
        <TourRequestModal
          isOpen={tourRequestOpen}
          onClose={() => setTourRequestOpen(false)}
          userName={user.name}
        />
      )}
    </>
  );
}

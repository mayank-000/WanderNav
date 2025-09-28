"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Search, Menu, ArrowLeftRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import axios from "axios";

export function ModernNavbar() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExchangeIcon, setIsExchangeIcon] = useState(false);
  const [result, setResult] = useState("");
  const [hasResults, setHasResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: ""
  });


  const menuRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        const target = event.target as Element;
        const isSelectElement = 
          target.closest('[data-radix-select-content]') ||
          target.closest('[data-radix-select-viewport]') ||
          target.closest('[data-radix-select-item]') ||
          target.closest('[data-radix-select-trigger]') ||
          target.closest('[data-radix-popper-content-wrapper]') ||
          target.closest('[role="listbox"]') ||
          target.closest('[role="option"]') ||
          target.hasAttribute('data-radix-select-item') ||
          target.hasAttribute('data-radix-select-trigger');
        
        if (!isSelectElement) {
          setIsExchangeIcon(false);
        }
      }
    }

    // Only add listener when exchange bar is open
    if (isExchangeIcon) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isExchangeIcon]);

  const fetchAllCurrencies = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/currencies");
      const data = await response.json();
      if (data.success) {
        setCurrencies(data.currencies);
      } else {
        setError("Failed to load currencies");
      }
    } catch (error) {
        setError("Error fetching currencies");
    } finally {
        setLoading(false);
    }
  };

  const handleConvert = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/exchange", {
        from: formData.from,
        to: formData.to,
        amount: parseFloat(formData.amount) || 0
      });
      if(response.data.success) {
        setResult(`${formData.amount} ${formData.from} = ${response.data.result.toFixed(2)} ${formData.to}`);
        setHasResults(true);
      } else {
        setResult(response.data.error);
        setHasResults(false);
      }

    } catch (error) {
      console.log("Failed to fetch response", error);
      setResult('Conversion Failed')
      setHasResults(false)
    } finally {
      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    // Navigate to homepage
    router.push("/home");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search functionality here
    }
  };

  return (
    <nav className="border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95 p-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-15">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              aria-label="Go to homepage"
            >
              <div className="w-15 h-15 bg-primary rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="logo" />
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search Destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                />
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu */}
            <div className="relative" ref={menuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:bg-accent hover:text-accent-foreground"
                aria-label="Navigation menu"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      console.log("Navigate to Home");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      console.log("Navigate to Trip Planner");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      console.log("Navigate to Profile");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    AI Trip-Planner
                  </button>
                </div>
              )}
            </div>

            {/* Currency Converter */}
            <div className="relative" ref={currencyRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExchangeIcon(!isExchangeIcon);
                  if(!isExchangeIcon) {
                    fetchAllCurrencies();
                  }
                }}
                className="text-foreground hover:bg-accent hover:text-accent-foreground"
                aria-label="Currency converter"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </Button>

              {isExchangeIcon && (
                <div className="absolute right-0 mt-2 w-100 bg-popover border border-border rounded-md shadow-lg p-4 z-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-popover-foreground">
                      Currency Converter
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExchangeIcon(false)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">
                          From
                        </label>
                        <Select
                          value={formData.from}
                          onValueChange={(value) => {
                            setFormData(prevData => ({
                              ...prevData,
                              from: value
                            }));
                          }}
                        >
                          <SelectTrigger className="bg-input border-border text-foreground">
                            <SelectValue placeholder="Select Currency" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            {currencies.map((currency) => (
                              <SelectItem
                                key={currency}
                                value={currency}
                              >
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">
                          To
                        </label>
                        <Select
                          value={formData.to}
                          onValueChange={(value) => {
                            setFormData(prevData => ({
                              ...prevData,
                              to: value
                            }));
                          }}
                        >
                          <SelectTrigger className="bg-input border-border text-foreground">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            {currencies.map((currency) => (
                              <SelectItem
                                key={currency}
                                value={currency}
                              >
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => {
                            setFormData(prevData => ({
                              ...prevData,
                              amount: e.target.value
                            }));
                          }}
                        min="0"
                        step="any"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <Button
                      onClick={handleConvert}
                      disabled={loading || !formData.from || !formData.to || !formData.amount || parseFloat(formData.amount) <= 0}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {loading ? "Converting..." : "Convert"}
                    </Button>

                    {result && (
                      <div className="mt-3 p-2 bg-accent rounded text-center">
                        <span className="text-sm text-accent-foreground font-medium">
                          {result}
                        </span>
                      </div>
                    )}
                    {error && (
                      <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-center">
                        <span className="text-sm text-destructive">
                          {error}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import EncodePanel from './components/EncodePanel';
import DecodePanel from './components/DecodePanel';
import Footer from './components/Footer';
import { WhatIsAccordion, HowItWorksAccordion } from './components/NullMojiAccordions';
import SplitText from './components/SplitText';
import TextType from './components/TextType';
import DecryptedText from './components/DecryptedText';
import './App.css';


function App() {
  const [whatIsOpen, setWhatIsOpen] = useState(false);
  const [howWorksOpen, setHowWorksOpen] = useState(false);
  const [showMoji, setShowMoji] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // "Null" has 4 letters, 8 iterations per letter, 25ms speed
    // Total time: 4 letters * 8 iterations * 25ms = ~800ms
    const timer = setTimeout(() => {
      setShowMoji(true);
    }, 1200); // Wait 1.2 seconds for Null to complete

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 px-4 py-2 rounded-lg bg-card border border-border/50 hover:bg-card/80 transition-all shadow-lg"
        aria-label="Open menu"
      >
        <i className="fas fa-bars text-xl text-primary"></i>
      </button>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border/50 z-50 p-6 overflow-y-auto animate-slideInRight shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted/20 transition-all"
              aria-label="Close menu"
            >
              <i className="fas fa-times text-xl text-primary"></i>
            </button>

            <div className="mt-12">
              {/* Common Questions */}
              <div className="mb-8">
                <div className="text-primary font-semibold text-lg mb-4">Common Questions</div>
                <div className="text-muted-foreground text-sm space-y-3">
                  <p className="flex items-start gap-2">
                    <i className="fas fa-question text-[#E5C890] mt-1 text-sm"></i>
                    <span
                      onClick={() => {
                        setWhatIsOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="cursor-pointer hover:text-primary transition-colors duration-300 underline"
                    >
                      What is NullMoji ?
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <i className="fas fa-gear text-[#E5C890] mt-1 text-sm"></i>
                    <span
                      onClick={() => {
                        setHowWorksOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="cursor-pointer hover:text-primary transition-colors duration-300 underline"
                    >
                      How NullMoji works ?
                    </span>
                  </p>
                </div>
              </div>

              {/* GitHub Section */}
              <div className="border-t border-border/50 pt-6">
                <div className="text-muted-foreground text-sm space-y-3">
                  <p className="flex items-start gap-2">
                    <i className="fas fa-star text-[#E5C890] mt-1 text-sm"></i>
                    <span>Don't forget to give it a star if you like it</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <i className="fab fa-github text-[#E5C890] mt-1 text-sm"></i>
                    <a
                      href="https://github.com/itssagnikmukherjee/nullmoji"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline cursor-pointer hover:text-primary transition-colors duration-300"
                    >
                      Github
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-start px-2 sm:px-6 md:px-8 py-3 sm:py-6 md:py-8 pb-3 sm:pb-6 md:pb-8">
        {/* Left Side - Branding */}
        <div className="md:w-1/3 w-full flex flex-col items-start animate-fadeIn">
          <div className="flex-1 flex flex-col w-full">
            <div className="text-left">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-wide mb-3 sm:mb-4">
                <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 font-light">
                  <TextType
                    texts={["(｡•́‿•̀｡)"]}
                    typingSpeed={100}
                    showCursor={true}
                    typeOnce={true}
                  />
                </div>
                <div className="mt-4 sm:mt-6">
                  <DecryptedText
                    text="Null"
                    className="text-6xl sm:text-6xl md:text-6xl text-[#E5C890]"
                    encryptedClassName="text-7xl sm:text-7xl md:text-6xl text-[#E5C890]"
                    speed={25}
                    maxIterations={8}
                    animateOn="view"
                    sequential={true}
                    revealDirection="start"
                  />
                  {showMoji && (
                    <DecryptedText
                      text="Moji"
                      className="text-6xl sm:text-6xl md:text-6xl bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent"
                      encryptedClassName="text-6xl sm:text-6xl md:text-6xl text-gray-400/40"
                      speed={25}
                      maxIterations={8}
                      animateOn="view"
                      sequential={true}
                      revealDirection="start"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Tagline */}
            <div className="text-muted-foreground text-sm md:text-base space-y-2 max-w-xs mb-6 sm:mb-8 md:mb-10">
              <p className="flex items-start gap-2">
                <SplitText
                  text="Hide secrets in plain text"
                  className="text-base sm:text-lg md:text-xl text-muted-foreground"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
              </p>
            </div>
            {/* Description - Hidden on Mobile */}
            <div className="hidden md:block text-primary font-semibold text-base sm:text-lg mb-3 sm:mb-4 mt-3 sm:mt-4">Common Questions</div>
            <div className="hidden md:block text-muted-foreground text-sm md:text-base space-y-2 max-w-xs">
              <p className="flex items-start gap-2">
                <i className="fas fa-question text-[#E5C890] mt-1 text-sm"></i>
                <span
                  onClick={() => setWhatIsOpen(true)}
                  className="cursor-pointer hover:text-primary transition-colors duration-300 underline"
                >
                  What is NullMoji ?
                </span>
              </p>
              <p className="flex items-start gap-2">
                <i className="fas fa-gear text-[#E5C890] mt-1 text-sm"></i>
                <span
                  onClick={() => setHowWorksOpen(true)}
                  className="cursor-pointer hover:text-primary transition-colors duration-300 underline"
                >
                  How NullMoji works ?
                </span>
              </p>
            </div>
          </div>

          {/* GitHub Section at Bottom - Hidden on Mobile */}
          <div className="hidden md:block text-muted-foreground text-sm md:text-base space-y-2 pt-6 sm:pt-8 mt-6 sm:mt-10">
            <p className="flex items-start gap-2">
              <i className="fas fa-star text-[#E5C890] mt-1 text-sm"></i>
              <span>Don't forget to give it a star if you like it</span>
            </p>

            <p className="flex items-start gap-2">
              <i className="fab fa-github text-[#E5C890] mt-1 text-sm"></i>
              <a
                href="https://github.com/itssagnikmukherjee/nullmoji"
                target="_blank"
                rel="noopener noreferrer"
                className="underline cursor-pointer hover:text-primary transition-colors duration-300"
              >
                Github
              </a>
            </p>
          </div>
        </div>

        {/* Right Side - Functionality */}
        <div className="md:w-2/3 w-full animate-slideInUp">
          <Card className="border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl" style={{
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}>
            <Tabs defaultValue="encode" className="w-full">
              <div className="border-b border-border/50 bg-muted/10 backdrop-blur-sm">
                <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
                  <TabsTrigger
                    value="encode"
                    className="rounded-t-lg rounded-b-none border-b-2 border-transparent px-4 py-3 transition-all duration-300 data-[state=active]:border-primary data-[state=active]:bg-card/60 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 hover:bg-muted/20"
                  >
                    <span className="font-semibold flex items-center gap-2">
                      <i className="fas fa-code text-[#E5C890]"></i>
                      Encode
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="decode"
                    className="rounded-t-lg rounded-b-none border-b-2 border-transparent px-4 py-3 transition-all duration-300 data-[state=active]:border-primary data-[state=active]:bg-card/60 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 hover:bg-muted/20"
                  >
                    <span className="font-semibold flex items-center gap-2">
                      <i className="fas fa-file-code text-[#E5C890]"></i>
                      Decode
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="encode" className="mt-0">
                <EncodePanel />
              </TabsContent>
              <TabsContent value="decode" className="mt-0">
                <DecodePanel />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Footer */}
      </div>
      <Footer />

      {/* What is NullMoji Dialog */}
      <Dialog open={whatIsOpen} onOpenChange={setWhatIsOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-xl md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">What is NullMoji?</DialogTitle>
            <DialogDescription className="text-sm">
              Learn about NullMoji's steganography capabilities
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <WhatIsAccordion />
          </div>
        </DialogContent>
      </Dialog>

      {/* How NullMoji Works Dialog */}
      <Dialog open={howWorksOpen} onOpenChange={setHowWorksOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-xl md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">How NullMoji Works?</DialogTitle>
            <DialogDescription className="text-sm">
              Understand the encoding and decoding process
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <HowItWorksAccordion />
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
}

export default App;

import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import EncodePanel from './components/EncodePanel';
import DecodePanel from './components/DecodePanel';
import Footer from './components/Footer';
import './App.css';


function App() {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start px-4 lg:px-8 py-8 pb-8">
        {/* Left Side - Branding */}
        <div className="lg:w-1/3 w-full flex flex-col items-center lg:items-start animate-fadeIn">
          <div className="flex-1 flex flex-col w-full">
            <div className="text-center lg:text-left">
              <div className="text-6xl lg:text-7xl font-bold tracking-wide mb-4">
                <span className="text-3xl lg:text-7xl mb-6 font-light"><span className="opacity-50">٩</span>(｡•́‿•̀｡)<span className="opacity-50">۶</span></span>
                <div className="mt-6">
                  <span className="text-7xl lg:text-7xl text-[#E5C890]">Null</span>
                  <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">Moji</span>
                </div>
              </div>
            </div>
            {/* Tagline */}
            <div className="text-muted-foreground text-sm lg:text-base space-y-2 max-w-xs mb-10">
              <p className="flex items-start gap-2">
                <span className="text-xl">Hide secrets in plain text</span>
              </p>
            </div>
            {/* Description */}
            <div className="text-primary font-semibold text-lg mb-4 mt-4">Common Questions</div>
            <div className="text-muted-foreground text-sm lg:text-base space-y-2 max-w-xs">
              <p className="flex items-start gap-2">
                <i className="fas fa-question text-[#E5C890] mt-1"></i>
                <span className="cursor-pointer hover:text-primary transition-colors duration-300 underline">What is NullMoji ?</span>
              </p>
              <p className="flex items-start gap-2">
                <i className="fas fa-gear text-[#E5C890] mt-1"></i>
                <span className="cursor-pointer hover:text-primary transition-colors duration-300 underline">How NullMoji works ?</span>
              </p>
            </div>
          </div>

          {/* GitHub Section at Bottom */}
          <div className="text-muted-foreground text-sm lg:text-base space-y-2 pt-8 mt-10">
            <p className="flex items-start gap-2">
              <i className="fas fa-star text-[#E5C890] mt-1"></i>
              <span>Don't forget to give it a star if you like it</span>
            </p>

            <p className="flex items-start gap-2">
              <i className="fab fa-github text-[#E5C890] mt-1"></i>
              <a
                href="https://github.com/sagnik17/nullmoji"
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
        <div className="lg:w-2/3 w-full animate-slideInUp">
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

      <Toaster />
    </>
  );
}

export default App;

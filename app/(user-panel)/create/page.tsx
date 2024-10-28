"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../content-create/components/Header";
import { BackgroundEffect } from "../content-create/components/BackgroundEffect";
import { PostTypeSelector } from "../content-create/components/PostTypeSelector";
import { ContentSourceSelector } from "../content-create/components/ContentSourceSelector";
import { ContentInput } from "../content-create/components/ContentInput";
import { contentSources } from "@/lib/data";
import { carouselTemplates } from "@/lib/data";

const ContentCreationTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [isGenerating, setIsGenerating] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [contentSource, setContentSource] = useState("text");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 relative min-h-[80vh]">
      <BackgroundEffect />
      <Header />

      <Card className="shadow-lg border border-gray-200/80 bg-white/95 backdrop-blur-xl">
        <CardHeader className="relative pb-0">
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-6">
              <PostTypeSelector
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                carouselTemplates={carouselTemplates}
              />
              <ContentSourceSelector
                contentSource={contentSource}
                setContentSource={setContentSource}
                contentSources={contentSources}
              />
            </div>
            <ContentInput
              contentSource={contentSource}
              isGenerating={isGenerating}
              handleGenerate={handleGenerate}
              handleTextChange={handleTextChange}
            />
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${contentSource}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreationTools;

"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { BackgroundEffect } from "../../../components/content-create/BackgroundEffect";
import { PostTypeSelector } from "../../../components/content-create/PostTypeSelector";
import { ContentSourceSelector } from "../../../components/content-create/ContentSourceSelector";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { contentSources } from "@/lib/data";
import { carouselTemplates } from "@/lib/data";
import { MultiPostPreview } from "../../../components/content-create/MultiPostPreview";

const ContentCreationTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [isGenerating, setIsGenerating] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [contentSource, setContentSource] = useState("text");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [content, setContent] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
    setContent(e.target.value);
  };

  return (
    <div className="container max-w-[1200px] mx-auto px-6 py-12 relative min-h-screen">
      <BackgroundEffect />
      <Header />

      <div className="space-y-6">
        {/* Content Creation Card */}
        <Card className="shadow-lg border border-gray-200/80 bg-white/95 backdrop-blur-xl">
          <CardHeader className="relative pb-0 px-6 pt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-start gap-8">
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
            </div>
          </CardHeader>

          <CardContent className="pt-6 px-6">
            <ContentInput
              contentSource={contentSource}
              isGenerating={isGenerating}
              handleGenerate={handleGenerate}
              handleTextChange={handleTextChange}
            />
          </CardContent>
        </Card>

        {/* Preview Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${contentSource}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <MultiPostPreview content={content} isGenerating={isGenerating} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContentCreationTools;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

const ContentCreationTools = () => {
  const creationOptions = [
    {
      icon: Layers,
      title: "Create AI Carousel",
      description: "Generate engaging multi-slide carousels with AI assistance",
      link: "/carousel-editor",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: FileText,
      title: "Create AI LinkedIn Post",
      description:
        "Craft compelling LinkedIn posts with AI-powered suggestions",
      link: "/create-post",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="mx-auto p-8 space-y-8 bg-white rounded-lg border border-borderColor">
      <h2 className="text-2xl font-medium mb-6 text-gray-800">
        Generate Content with AI
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {creationOptions.map((option, index) => (
          <Link href={option.link} key={index} className="group">
            <Card
              className={`hover:shadow-md transition-all duration-300 ${option.bgColor} border-none`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center text-xl ${option.color}`}
                >
                  <option.icon className="mr-3 h-6 w-6" />
                  {option.title}
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  className={`px-0 ${option.color} hover:bg-transparent hover:underline hover:text-primary`}
                >
                  Start Creating
                </Button>
                <ArrowRight
                  className={`h-5 w-5 ${option.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContentCreationTools;

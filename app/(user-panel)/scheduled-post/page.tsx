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
import Image from "next/image";
import UpcomingPosts from "@/components/workspace/Upcoming-Section.Modal.comp";

const ContentCreationTools = () => {
  const creationOptions = [
    {
      icon: Layers,
      title: "Create AI Carousel",
      description: "Generate engaging multi-slide carousels with AI assistance",
      link: "/carousel-editor",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      logo: "/carousel.png",
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
    <div className="mx-auto p-2 space-y-6 bg-white rounded-lg">
      <h2 className="flex items-center text-xl font-medium mb-4 text-gray-800">
        <Image
          src="/ai-content.png"
          height={20}
          width={30}
          alt="Buildsocialpost.com"
          className="mr-2"
        />
        Generate Content with AI
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {creationOptions.map((option, index) => (
          <Link href={option.link} key={index} className="group">
            <Card
              className={`hover:shadow-md transition-all border-none duration-300 ${option.bgColor}`}
            >
              <div className="p-4 flex items-center justify-between">
                <div>
                  <CardTitle
                    className={`flex items-center text-base ${option.color} mb-1`}
                  >
                    <option.icon className="mr-2 h-4 w-4" />
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-600">
                    {option.description}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  className={`px-2 py-1 text-xs ${option.color} hover:bg-transparent hover:underline hover:text-primary`}
                >
                  Start
                  <ArrowRight
                    className={`ml-1 h-3 w-3 ${option.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Add the UpcomingPosts component here */}
      <div className="mt-8">
        <UpcomingPosts />
      </div>
    </div>
  );
};

export default ContentCreationTools;

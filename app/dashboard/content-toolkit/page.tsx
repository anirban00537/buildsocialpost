import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, FileText } from "lucide-react";
import Link from "next/link";

const ContentCreationTools = () => {
  const creationOptions = [
    {
      icon: Layers,
      title: "AI Carousel",
      description: "Generate engaging multi-slide carousels with AI assistance",
      link: "/create-carousel",
    },
    {
      icon: FileText,
      title: "AI LinkedIn Post",
      description:
        "Craft compelling LinkedIn posts with AI-powered suggestions",
      link: "/create-post",
    },
  ];

  return (
    <div className="mx-auto p-12 space-y-12 bg-white rounded-lg border border-borderColor">
      <div>
        <h3 className="text-2xl font-semibold mb-4">LinkedIn Content Tool's</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {creationOptions.map((option, index) => (
            <Link href={option.link}>
              <Card
                key={index}
                className="hover:shadow-md transition-shadow bg-white"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <option.icon className="mr-2 h-5 w-5 text-blue-500" />{" "}
                    {option.title}
                  </CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Start
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCreationTools;

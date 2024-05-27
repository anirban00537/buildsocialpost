import React from "react";
import { Image, Layers, Type } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MainSidebar = () => {
  return (
    <aside
      className="sticky h-full top-0 flex flex-col p-4 bg-white col-span-2 items-start gap-8"
      x-chunk="dashboard-03-chunk-0"
    >
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Carousel Settings
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="title">Carousel Title</Label>
            <Input id="title" type="text" placeholder="Enter carousel title" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="slides">Number of Slides</Label>
            <Input id="slides" type="number" placeholder="5" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="template">Template</Label>
            <Select>
              <SelectTrigger
                id="template"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="professional">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Layers className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Professional
                        <span className="font-medium text-foreground">
                          {" "}
                          Template
                        </span>
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="creative">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Image className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Creative
                        <span className="font-medium text-foreground">
                          {" "}
                          Template
                        </span>
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="minimal">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Type className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Minimal
                        <span className="font-medium text-foreground">
                          {" "}
                          Template
                        </span>
                      </p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="image-upload">Upload Images</Label>
            <Input id="image-upload" type="file" multiple />
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Slide Content
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="slide-title">Slide Title</Label>
            <Input
              id="slide-title"
              type="text"
              placeholder="Enter slide title"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="slide-content">Slide Content</Label>
            <Textarea
              id="slide-content"
              placeholder="Enter slide content"
              className="min-h-[9.5rem]"
            />
          </div>
          <Button className="mt-2" type="button">
            Add Slide
          </Button>
        </fieldset>
      </form>
    </aside>
  );
};

export default MainSidebar;

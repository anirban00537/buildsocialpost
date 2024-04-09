import React from "react";
import {
  Bird,
  CornerDownLeft,
  Mic,
  Paperclip,
  Rabbit,
  Turtle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MainSidebar from "../sidebar/main.sidebar";
const EditorBody = () => {
  return (
    <main className="grid flex-1  bg-slate-100 overflow-auto  md:grid-cols-2 lg:grid-cols-12">
      <MainSidebar />
      <div className="relative flex h-full   min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-10"></div>
    </main>
  );
};

export default EditorBody;

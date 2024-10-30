"use client";
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: Date) => void;
}

export function ScheduleModal({ isOpen, onClose, onSchedule }: ScheduleModalProps) {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [timezone, setTimezone] = useState("et");

  const timeSlots = [
    "12:00 AM", "12:15 AM", "12:30 AM", "12:45 AM",
    "1:00 AM", "1:15 AM", "1:30 AM", "1:45 AM"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Schedule Post</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 hover:bg-transparent"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Timezone Selector */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <span className="text-base text-gray-600">Select Timezone</span>
          </div>
          <Select defaultValue="et">
            <SelectTrigger className="w-full h-10 bg-white border-gray-200">
              <SelectValue placeholder="Eastern Time (UTC-5)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="et">Eastern Time (UTC-5)</SelectItem>
              <SelectItem value="ct">Central Time (UTC-6)</SelectItem>
              <SelectItem value="mt">Mountain Time (UTC-7)</SelectItem>
              <SelectItem value="pt">Pacific Time (UTC-8)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Options */}
        <div className="flex gap-3 mb-8">
          <Button
            variant="outline"
            className="h-10 px-4 bg-white hover:bg-gray-50 rounded-full"
          >
            Today at 11:49 PM
          </Button>
          <Button
            className="h-10 px-4 bg-primary hover:bg-primary/90 rounded-full text-white"
          >
            Thursday 12:19 AM
          </Button>
        </div>

        <div className="grid grid-cols-[1fr,auto] gap-8">
          {/* Date Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-gray-500" />
              <span className="text-base text-gray-600">Select Date</span>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full border-0 p-0"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                head_cell: "text-muted-foreground font-normal text-[0.9rem] w-10",
                cell: cn(
                  "h-10 w-10 text-center text-sm p-0 relative",
                  "[&:has([aria-selected])]:bg-primary/5",
                ),
                day: cn(
                  "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                  "hover:bg-primary/10",
                  "aria-selected:bg-primary aria-selected:text-white aria-selected:rounded-full"
                ),
                nav_button: "h-7 w-7 bg-transparent p-0 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
              }}
            />
          </div>

          {/* Time Selection */}
          <div className="min-w-[180px]">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-base text-gray-600">Select Time</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 mb-2">Night</h3>
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10 px-3 font-normal text-base",
                    selectedTime === time 
                      ? "bg-primary/5 text-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="ghost"
            className="h-10 px-6"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="h-10 px-6 bg-primary/60 hover:bg-primary/50 text-white rounded-full"
            disabled={!date || !selectedTime}
          >
            Schedule Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
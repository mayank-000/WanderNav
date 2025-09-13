'use client';

import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  destination: z.string().min(2, {
    message: 'Destination must be at least 2 characters.',
  }),
  budget: z.number().min(100).max(10000),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  interests: z.string().min(10, {
    message: 'Please describe your interests.',
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function TripPlannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
  async function fetchDestinations() {
    const res = await fetch('/api/destinations');
    if (res.ok) {
      const data = await res.json();
      console.log('Destinations:', data);
      setDestinations(data);
    }
  }
  fetchDestinations();
}, []);


  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      budget: 2000,
      dates: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      interests: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setGeneratedPlan(null);

    try {
      const res = await fetch('/api/trips/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destinationName: values.destination,
          userInterests: values.interests,
          budget: values.budget,
          dates: {
            from: values.dates.from,
            to: values.dates.to
          }
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await res.json();
      setGeneratedPlan(data.itinerary || 'No itinerary returned.');
    } catch (error) {
      setGeneratedPlan('Error generating itinerary.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">AI Trip Planner</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Let our AI craft the perfect itinerary for your next adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-headline text-2xl mb-4">Plan Your Trip</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your trip destination" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Travel Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value.from && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {isClient && field.value.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} -{' '}
                                  {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{ from: field.value.from, to: field.value.to }}
                          onSelect={(range) => field.onChange(range || { from: new Date(), to: new Date() })}
                          numberOfMonths={2}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget: ${field.value.toLocaleString()}</FormLabel>
                    <FormControl>
                      <Slider
                        min={100}
                        max={10000}
                        step={100}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormDescription>Your estimated total budget for the trip.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points of Interest</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., interested in historical sites, hiking, trying local food, and street art."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe what you'd like to see and do.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Itinerary
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <h2 className="font-headline text-2xl mb-4">Your Generated Plan</h2>
          <Card className="min-h-[400px] flex items-center justify-center">
            <CardContent className="p-6 w-full">
              {isLoading && (
                <div className="text-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>Our AI is crafting your personalized adventure...</p>
                </div>
              )}
              {!isLoading && !generatedPlan && (
                <div className="text-center text-muted-foreground">
                  <p>Your travel plan will appear here once generated.</p>
                </div>
              )}
              {generatedPlan && (
                <div
                  className="prose dark:prose-invert max-w-none prose-p:font-body prose-headings:font-headline"
                  dangerouslySetInnerHTML={{ __html: generatedPlan }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

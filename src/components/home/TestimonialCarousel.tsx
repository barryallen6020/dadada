
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="py-4">
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6">
            <TestimonialCard
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4 md:mt-6 gap-2">
        <CarouselPrevious className="relative static mx-2 bg-deskhive-skyblue border-deskhive-navy/20 text-deskhive-navy" />
        <CarouselNext className="relative static mx-2 bg-deskhive-skyblue border-deskhive-navy/20 text-deskhive-navy" />
      </div>
    </Carousel>
  );
};

export default TestimonialCarousel;

"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };

  const x1 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-600%"]),
    springConfig
  );
  const x2 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "600%"]),
    springConfig
  );
  const x3 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-600%"]),
    springConfig
  );

  const rowsData = [
    { items: products.slice(0, 5), x: x1 },
    { items: products.slice(5, 10), x: x2 },
    { items: products.slice(10, 15), x: x3 },
  ];

  return (
    <div
      ref={ref}
      className="h-[110vh] overflow-hidden antialiased relative flex flex-col self-auto"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* <Header /> */}
        <div className="flex flex-col gap-4 absolute inset-0">
          {rowsData.map((row, index) => (
            <CarouselRow key={index} items={row.items} x={row.x} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselRow = ({
  items,
  x,
}: {
  items: any[];
  x: MotionValue<string>;
}) => {
  return (
    <motion.div
      className="flex gap-4 w-[400vw]"
      style={{
        x,
      }}
    >
      {[...items, ...items, ...items, ...items].map((product, index) => (
        <ProductCard key={`${product.title}-${index}`} product={product} />
      ))}
    </motion.div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 z-10">
      <h1 className="text-2xl md:text-7xl text-textColor font-bold dark:text-white">
        Carousels <br />
        Preview <br />
        <span className="text-sm md:text-xl">Scroll down to see more</span>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-textColor">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
}) => {
  return (
    <div className="h-[300px] w-[300px] relative flex-shrink-0 overflow-hidden rounded-lg">
      <Link href={product.link} className="block h-full w-full">
        <div className="relative w-full h-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

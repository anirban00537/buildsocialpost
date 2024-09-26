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
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[400vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* <Header /> */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex mb-2 gap-2  w-full overflow-hidden">
          <motion.div className="flex gap-2" style={{ x: translateX }}>
            {firstRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </motion.div>
        </motion.div>
        <motion.div className="flex mb-2 gap-2  w-full overflow-hidden">
          <motion.div className="flex gap-2" style={{ x: translateXReverse }}>
            {secondRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </motion.div>
        </motion.div>
        <motion.div className="flex gap-2  w-full overflow-hidden">
          <motion.div className="flex gap-2" style={{ x: translateX }}>
            {thirdRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
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
    <div className="h-[600px] w-[600px] relative flex-shrink-0 overflow-hidden">
      <Link href={product.link} className="block h-full w-full">
        <div className="relative w-full h-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={600}
            height={600}
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

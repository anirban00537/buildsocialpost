import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <motion.section
      id="testimonials"
      className="py-28 bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-textColor">Testimonials</h2>
        <p className="mt-4 text-textColor/70">
          See what our users have to say about AI Carousel Maker.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-12">
          <motion.div
            className="max-w-sm p-6 bg-cardBackground border-borderColor rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-textColor/70">
              "This tool has revolutionized the way I create content for my
              social media. Highly recommended!"
            </p>
            <p className="mt-4 text-textColor font-bold">- Alex Johnson</p>
          </motion.div>
          <motion.div
            className="max-w-sm p-6 bg-cardBackground border-borderColor rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-textColor/70">
              "AI Carousel Maker saves me so much time and effort. The
              AI-generated content is spot on."
            </p>
            <p className="mt-4 text-textColor font-bold">- Maria Davis</p>
          </motion.div>
          <motion.div
            className="max-w-sm p-6 bg-cardBackground border border-borderColor rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-textColor/70">
              "I love the customization options and the modern backgrounds. It's
              perfect for my business needs."
            </p>
            <p className="mt-4 text-textColor font-bold">- James Smith</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
export default Testimonial;

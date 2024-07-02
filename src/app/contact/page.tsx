"use client";
import Layout from "@/components/Layout";
import { useRef } from "react";
import plane from "@public/assets/images/paper-plane.png";
import Image from "next/image";

const ContactMe = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const message = messageRef.current?.value;
    console.log({ name, email, message });
  };
  return (
    <Layout className="bg-primary text-white">
      <section className="max-w-6xl mx-auto px-5 py-6 md:py-12">
        <h2 className="text-3xl md:text-6xl font-bold tracking-wider text-center uppercase text-white mb-16">
          Contact
        </h2>
        {/* contact form */}
        <div className="max-w-3xl mx-auto px-3 relative">
          <form className="my-2 text-white" onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="mb-2 inline-block px-8 py-2 bg-white border-[6px] border-black rounded-2xl font-bold text-xl text-black uppercase"
            >
              Name
            </label>
            <input
              ref={nameRef}
              id="name"
              type="text"
              className="w-full px-3 py-2 bg-[#363636] outline-none rounded-lg"
              placeholder="YOUR NAME..."
            />
            <div className="my-8">
              <label htmlFor="email">EMAIL ADDRESS*</label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                className="w-full px-3 py-2 bg-[#363636] outline-none rounded-lg"
                placeholder="YOUR EMAIL ADDRESS..."
              />
            </div>

            <div className="my-8">
              <label htmlFor="message">MESSAGE*</label>
              <textarea
                ref={messageRef}
                id="message"
                className="w-full px-3 py-2 bg-[#363636] outline-none rounded-lg"
                rows={5}
                placeholder="YOUR MESSAGE..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-2 bg-white text-black font-bold uppercase rounded-full"
            >
              SUBMIT
            </button>
          </form>
          <div className="hidden md:block absolute top-16 -right-56">
            <Image src={plane} alt="plane" width={256} height={256} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactMe;

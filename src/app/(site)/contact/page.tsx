import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  PencilSquareIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  return (
    <div className="w-full flex flex-col p-3 lg:p-36">
      <div className="w-full rounded-3xl shadow h-56 mt-20 lg:flex justify-center items-center relative overflow-hidden hidden">
        <Image
          src={"/assets/contact.jpg"}
          alt="contact"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full bg-black/50 absolute top-0 left-0"></div>
        <h1 className="text-5xl font-bold text-white z-10">Contact Us</h1>
      </div>
      <div className="w-full bg-white px-4 py-12 md:px-12 lg:px-24 mt-20 rounded-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold mb-2">Drop Us A Line</h2>
            <p className="text-gray-500 mb-8">
              Feel free to connect with us through our online channels for
              updates, news, and more.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className=" text-sm font-medium mb-1 flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-blue-500" />
                    Full Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className=" text-sm font-medium mb-1 flex items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                    Email Address:
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className=" text-sm font-medium mb-1 flex items-center gap-2">
                    <PhoneIcon className="h-5 w-5 text-blue-500" />
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    placeholder="ex 012345678"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className=" text-sm font-medium mb-1 flex items-center gap-2">
                    <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                    Subject:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Keyword"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className=" text-sm font-medium mb-1 flex items-center gap-2">
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-blue-500" />
                  Your Message:
                </label>
                <textarea
                  placeholder="Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-blue-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <div className="text-sm text-gray-700 space-y-6">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Address:</p>
                  <p>
                    Gharpadharo HQ, Nanda Ki Chowki-Premnagar, Dehradun,
                    <br />
                    Uttarakhand, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon className="h-6 w-6 text-blue-600 mt-1" />
                <Link href={"tel:7903269007"}>
                  <p className="font-medium">Phone:</p>
                  <p>+91 7903269007</p>
                </Link>
              </div>

              <div className="flex items-start gap-3">
                <EnvelopeIcon className="h-6 w-6 text-blue-600 mt-1" />
                <Link href={"mailto:gharpadharo@gmail"}>
                  <p className="font-medium">Email:</p>
                  <p>gharpadharo@gmail.com</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

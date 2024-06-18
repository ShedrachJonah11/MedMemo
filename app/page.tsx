"use client";

import Image from "next/image";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import Video from "./components/Video";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import Faq from "./components/Faq";

export default function Home() {
  const [activeNav, setActiveNav] = useState("1");

  return (
    <div className="bg-[#E9ECEF]">
      <main className="homeBg h-screen pt-[112px] px-[142px] flex flex-col items-center rounded-b-[48px] overflow-hidden">
        <div className="gradient-overlay"></div>
        <div className="flex justify-center items-center gap-2 bg-[#1018280D] py-1 px-4 border-[#007BFF] border-[1px] rounded-full mb-[32px]">
          <Image src={"/avatas.svg"} width={64} height={32} alt="" />
          <p>Join 5k+ doctors and save time</p>
        </div>
        <div>
          <h1 className="font-[700] text-[64px] leading-[77px] text-center text-[#343A40]">
            <span className="text-gradient">MedMemos</span> Your All-in-One
            Medical Documentation Solution
          </h1>
          <p className="text-center mt-[24px] text-[#71839B] text-[20px] font-[500]">
            Enhance your medical practice with seamless documentation and
            patient management.
          </p>
        </div>
        <div className="mt-[34px] flex justify-center items-center gap-4">
          <div className="text-[#007BFF] font-[600] flex justify-center items-center gap-1">
            <p>Try Demo</p>
            <ArrowRight size="24" color="#007BFF" />
          </div>
          <Link
            href={"/auth/signup"}
            className="h-[56px] flex justify-center items-center px-[42px] rounded-[8px] text-white bg-[#007BFF] text-[16px] font-[600]"
          >
            Get Started Today{" "}
          </Link>
        </div>
      </main>

      <Video />

      <div className="mt-[-150px] chooseBg pt-[196px] px-[80px] pb-[64px] flex justify-between items-center gap-20 rounded-[48px]">
        <div className="w-1/2 flex flex-col gap-4 items-start">
          <button className="h-[35px] font-[600] text-white px-[32px] features rounded-full">
            Features
          </button>

          <h1 className="text-[48px] font-[700] leading-[55px]">
            Why Choose <br /> MedMemos?
          </h1>
          <p className="font-[500] text-[20px] text-[#343A40]">
            Enhance your medical practice with seamless documentation and
            patient management.
          </p>

          <div className="mt-[16px] flex justify-center items-center gap-4">
            <div className="text-[#007BFF] font-[600] flex justify-center items-center gap-1">
              <p>Contact Us</p>
            </div>
            <Link
              href={"/contact"}
              className="h-[56px] flex justify-center items-center px-[42px] rounded-[8px] text-white bg-[#007BFF] text-[16px] font-[600]"
            >
              Get Started{" "}
            </Link>
          </div>
        </div>

        <div className="w-1/2">
          <div className=" flex flex-col items-start">
            <div className="flex flex-col gap-[25px]">
              <div className="flex gap-10">
                <div className="flex flex-col items-center gap-[5px]">
                  <div className={``}>
                    {" "}
                    <Image src={"/Relume.svg"} width={48} height={48} alt="" />
                  </div>
                  <div className="h-[48px] w-[3px] bg-black"></div>
                </div>

                <div>
                  <div className="">
                    <p className="text-[20px] font-[700] mb-4">
                      Patient Registration
                    </p>
                  </div>
                  <p className="text-[16px]">
                    Easily register new patients and maintain detailed records
                    with our intuitive interface.
                  </p>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col items-center gap-[5px]">
                  <div className={``}>
                    {" "}
                    <Image src={"/Relume.svg"} width={48} height={48} alt="" />
                  </div>
                  <div className="h-[48px] w-[3px] bg-black"></div>
                </div>

                <div>
                  <div className="">
                    <p className="text-[20px] font-[700] mb-4">
                      Conversation Recording
                    </p>
                  </div>
                  <p className="text-[16px]">
                    Record and transcribe patient consultations for accurate and
                    accessible documentation.
                  </p>
                </div>
              </div>

              <div className="flex gap-10">
                <div className="flex flex-col items-center gap-[5px]">
                  <div className={``}>
                    {" "}
                    <Image src={"/Relume.svg"} width={48} height={48} alt="" />
                  </div>
                  <div className="h-[48px] w-[3px] bg-black"></div>
                </div>

                <div>
                  <div className="">
                    <p className="text-[20px] font-[700] mb-4">
                      Secure Data Management
                    </p>
                  </div>
                  <p className="text-[16px]">
                    Ensure your patient data is safe with our top-notch security
                    protocols.
                  </p>
                </div>
              </div>

              <div className="flex gap-10">
                <div className="flex flex-col items-center gap-[5px]">
                  <div>
                    <Image src={"/Relume.svg"} width={48} height={48} alt="" />
                  </div>
                </div>

                <div>
                  <div className="">
                    <p className="text-[20px] font-[700] mb-4">
                      Customizable Templates
                    </p>
                  </div>
                  <p className="text-[15px]">
                    Tailor documentation templates to fit the specific needs of
                    your practice.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[112px] px-[64px] bg-[#E9ECEF]">
        <div className="flex justify-between items-end gap-[90px] mb-[60px]">
          <div className="w-1/2">
            <button className="h-[35px] px-[32px] features font-[600] text-white rounded-full">
              How it Works
            </button>

            <h1 className="text-[48px] font-[700] leading-[55px] mb-[74px]">
              Discover How Medmemos Works
            </h1>
          </div>

          <div className="w-1/2">
            <p className="text-[#71839B] text-[18px]">
              Get started with MedMemos by registering your practice and
              customizing your settings. Easily add patients, record
              conversations, and access transcriptions to streamline your
              medical documentation.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-[48px]">
          <div className="flex flex-col items-start gap-[32px] w-[32%]">
            <div className="h-[50px] w-[50px] bg-[#007BFF] text-white flex justify-center items-center font-[600] text-[18px] rounded-full">
              01
            </div>
            <Image
              src={"/img1.svg"}
              width={400}
              height={240}
              className="w-full"
              alt=""
            />
            <div>
              <h1 className="text-[#343A40] text-[32px] font-[700] leading-[40px]">
                Register and Customize Your Practice
              </h1>
              <p className="text-[#71839B] text-[16px] mt-[24px]">
                Sign up and set up your medical practice account. Customize
                MedMemos to suit your specific needs by tailoring documentation
                templates, setting preferences for recording and transcribing,
                and configuring security settings.
              </p>
            </div>
            <Image src={"/lines.svg"} width={360} height={126} alt="" />
          </div>
          <div className="flex flex-col items-start gap-[32px] w-[32%]">
            <div className="h-[50px] w-[50px] text-[#343A40] bg-white flex justify-center items-center font-[600] text-[18px] rounded-full">
              02
            </div>
            <Image
              src={"/img2.svg"}
              width={400}
              height={240}
              className="w-full"
              alt=""
            />
            <div>
              <h1 className="text-[#343A40] text-[32px] font-[700] leading-[40px]">
                Add Patients and Record Conversations{" "}
              </h1>
              <p className="text-[#71839B] text-[16px] mt-[24px]">
                Easily register new patients by entering their personal and
                medical information. During consultations, use MedMemos to
                record conversations, ensuring all details are captured
                accurately and reducing the need for manual note-taking.
              </p>
            </div>
          </div>{" "}
          <div className="flex flex-col items-start gap-[32px] w-[32%]">
            <Image src={"/line.svg"} width={360} height={126} alt="" />
            <div className="h-[50px] w-[50px] text-[#343A40] bg-white flex justify-center items-center font-[600] text-[18px] rounded-full">
              03
            </div>
            <Image
              src={"/img3.svg"}
              width={400}
              height={240}
              className="w-full"
              alt=""
            />
            <div>
              <h1 className="text-[#343A40] text-[32px] font-[700] leading-[40px]">
                Transcribe, Access, and Manage Records{" "}
              </h1>
              <p className="text-[#71839B] text-[16px] mt-[24px]">
                Automatically transcribe recorded conversations for easy
                reference. Access and review transcriptions anytime, using
                search and filter features to quickly find specific patient
                records, enhancing the efficiency and accuracy of your practice
                &apos;s documentation.
              </p>
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="rounded-[48px] bg-[#007BFF] py-[115px] px-[80px]">
        <div className="flex justify-center items-center flex-col gap-4">
          <button className="h-[35px] px-[32px] font-[600] text-white features rounded-full ">
            Testimonials
          </button>
          <h1 className="text-[48px] text-white font-[700] leading-[55px] mb-[74px]">
            What our users say about us{" "}
          </h1>
        </div>

        <div className="py-[32px] w-full">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            // scrollbar={{ draggable: true }}
          >
            <SwiperSlide className="w-full">
              <div className="flex justify-start items-center gap-20 text-white">
                <Image src={"/slide1.svg"} width={440} height={570} alt="" />
                <div className="flex flex-col items-start gap-[32px]">
                  <div className="flex justify-start items-center gap-1">
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                  </div>
                  <p className="font-[700] text-[24px] text-white">
                    &quot;Using MedMemos has significantly enhanced our patient
                    care. The seamless integration with our existing systems and
                    the secure data management gives us peace of mind.&quot;
                  </p>
                  <div>
                    <p className="font-[600] text-[16px]">Dr. Michael Evans</p>
                    <p className="font-[400] text-[16px]">
                      MD, General hospital Abuja.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <div className="flex justify-start items-center gap-20 text-white">
                <Image src={"/slide2.svg"} width={440} height={570} alt="" />
                <div className="flex flex-col items-start gap-[32px]">
                  <div className="flex justify-start items-center gap-1">
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                  </div>
                  <p className="font-[700] text-[24px] text-white">
                    &quot;MedMemos is incredibly user-friendly and has
                    streamlined our workflow. It&apos;s a game-changer for
                    managing patient records and ensuring every detail is
                    accurately documented.&quot;
                  </p>
                  <div>
                    <p className="font-[600] text-[16px]">
                      Nurse Emily Roberts
                    </p>
                    <p className="font-[400] text-[16px]">
                      Nurse, General hospital Abuja.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <div className="flex justify-start items-center gap-20 text-white">
                <Image src={"/slide3.svg"} width={440} height={570} alt="" />
                <div className="flex flex-col items-start gap-[32px]">
                  <div className="flex justify-start items-center gap-1">
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                  </div>
                  <p className="font-[700] text-[24px] text-white">
                    &quot;MedMemos has transformed our practice&apos;s
                    documentation process. The ability to record and transcribe
                    patient consultations has saved us so much time and improved
                    our accuracy.&quot;
                  </p>
                  <div>
                    <p className="font-[600] text-[16px]">Dr John Onu </p>
                    <p className="font-[400] text-[16px]">
                      Doctor, General hospital Lagos.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide className="w-full">
              <div className="flex justify-start items-center gap-20 text-white">
                <Image src={"/slide4.svg"} width={440} height={570} alt="" />
                <div className="flex flex-col items-start gap-[32px]">
                  <div className="flex justify-start items-center gap-1">
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                    <Image src={"/star.svg"} width={24} height={24} alt="" />
                  </div>
                  <p className="font-[700] text-[24px] text-white">
                    &quot;Since adopting MedMemos, our practice has become much
                    more efficient. The customizable templates and easy access
                    to patient records have made our documentation process more
                    organized and reliable.&quot;
                  </p>
                  <div>
                    <p className="font-[600] text-[16px]">
                      Nurse Emily Roberts
                    </p>
                    <p className="font-[400] text-[16px]">
                      Clinic Manager, First aid Clinic Lagos.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="flex justify-start items-center gap-[32px] mt-[32px]">
          <h2 className="text-[32px] text-white font-[700]">
            Ready to get started?
          </h2>
          <Link
            href={"/auth/signup"}
            className="h-[56px] flex justify-center items-center px-[32px] rounded-[8px] text-[#343A40] bg-[#FF8400] text-[16px] font-[600]"
          >
            Sign up for free{" "}
          </Link>
        </div>
      </div>

      <div className="py-[64px] pricing flex  items-center flex-col">
        <div className="flex justify-center items-center flex-col gap-4">
          <button className="h-[35px] px-[32px] font-[600] text-white features rounded-full ">
            Pricing
          </button>
          <h1 className="text-[48px] text-black font-[700] leading-[55px] ">
            Pricing plan
          </h1>
        </div>
        <div className="my-[48px] flex justify-center items-center border-[2px] border-primary w-fit">
          <p
            onClick={() => setActiveNav("1")}
            className={`${
              activeNav === "1"
                ? " text-white bg-[#007BFF]"
                : "backdrop-blur mx-2 text-[#343A40]"
            } px-4 transition-all ease-out duration-200 hover:scale-95 text-[16px] font-[400] cursor-pointer text-center py-[8px]`}
          >
            Monthly
          </p>
          <p
            onClick={() => setActiveNav("2")}
            className={`${
              activeNav === "2"
                ? " text-white bg-[#007BFF]"
                : "backdrop-blur mx-2 text-[#343A40]"
            } px-4 transition-all ease-out duration-200 hover:scale-95 text-[16px] font-[400] cursor-pointer text-center py-[8px]`}
          >
            Yearly
          </p>
        </div>{" "}
        {activeNav === "1" && (
          <div className="w-[37%] rounded-[32px] bg-[#FFFFFFBF] p-[32px] price relative">
            <p className="text-[20px] font-[700] text-[#343A40] mb-1">
              Pro plan
            </p>
            <p className="text-[#71839B] text-[16px]">
              Perfect for individuals or Companies looking to maximize our
              product.
            </p>

            <div className="w-full h-[1px] my-[32px] bg-black"></div>
            <p className="text-[56px] font-[700] text-[#343A40]">
              ₦100,000<span className="text-[30px]">/mo</span>
            </p>

            <div className="mt-[32px]">
              <Link
                href={"/contact"}
                className="h-[56px] flex justify-center items-center px-[42px] rounded-[8px] text-white bg-[#007BFF] text-[16px] font-[600]"
              >
                Get Started{" "}
              </Link>
            </div>

            <div className="w-full h-[1px] my-[32px] bg-black"></div>
            <div className="flex flex-col items-start gap-4">
              <div className="flex justify-start gap-4 items-center">
                <Image src={"/Check.svg"} width={24} height={24} alt="" />
                <p className="text-[#343A40] text-[16px]">Unlimited Sessions</p>
              </div>
              <div className="flex justify-start gap-4 items-center">
                <Image src={"/Check.svg"} width={24} height={24} alt="" />
                <p className="text-[#343A40] text-[16px]">
                  Step-by-Step Wizard Guide
                </p>
              </div>
              <div className="flex justify-start gap-4 items-center">
                <Image src={"/Check.svg"} width={24} height={24} alt="" />
                <p className="text-[#343A40] text-[16px]">
                  4 hours average customer response time
                </p>
              </div>
              <div className="flex justify-start gap-4 items-center">
                <Image src={"/Check.svg"} width={24} height={24} alt="" />
                <p className="text-[#343A40] text-[16px]">
                  Unlimited patients data
                </p>
              </div>
            </div>
          </div>
        )}
        {activeNav === "2" && (
          <div className="w-[37%] rounded-[32px] bg-[#FFFFFFBF] p-[32px] price relative">
            <p className="text-[20px] font-[700] text-[#343A40] mb-1">
              Pro plan
            </p>
            <p className="text-[#71839B] text-[16px]">
              Perfect for individuals or Companies looking to maximize our
              product.
            </p>

            <div className="w-full h-[1px] my-[32px] bg-black"></div>
            <p className="text-[56px] font-[700] text-[#343A40]">
              ₦1,000,000<span className="text-[30px]">/mo</span>
            </p>

            <div className="mt-[32px]">
              <Link
                href={"/contact"}
                className="h-[56px] flex justify-center items-center px-[42px] rounded-[8px] text-white bg-[#007BFF] text-[16px] font-[600]"
              >
                Get Started{" "}
              </Link>
            </div>

            <div className="w-full h-[1px] my-[32px] bg-black"></div>
            <div className="flex flex-col items-start gap-4">
              <div className="flex justify-start gap-4 items-center">
                <Image src={"/Check.svg"} width={24} height={24} alt="" />
                <p className="text-[#343A40] text-[16px]">Unlimited Sessions</p>
              </div>
              <div className="flex justify-start gap-4 items-center">
                <Image src={"/Check.svg"} width={24} height={24} alt="" />
                <p className="text-[#343A40] text-[16px]">
                  Step-by-Step Wizard Guide
                </p>
              </div>
              <div className="flex justify-start gap-4 items-center">
                <Image src={"/Check.svg"} width={24} height={24} alt="" />
                <p className="text-[#343A40] text-[16px]">
                  4 hours average customer response time
                </p>
              </div>
              <div className="flex justify-start gap-4 items-center">
                <Image src={"/Check.svg"} width={24} height={24} alt="" />
                <p className="text-[#343A40] text-[16px]">
                  Unlimited patients data
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="py-[115px] px-[80px]">
        <div className="flex justify-between items-start gap-20">
          <div className="w-[40%]">
            <h1 className="text-[48px] font-[700] mb-[24px] text-[#343A40]">
              FAQs
            </h1>
            <p className="text-[18px] text-[#343A40] mb-[32px]">
              Have questions? We&apos;ve got answers.
            </p>

            <p className="font-[700] text-[18px] text-[#343A40]">
              Have unanswered questions?
            </p>
          </div>
          <div className="w-[60%]">
            <div className=" flex flex-col items-start gap-[52px]">
              <Faq
                question="How secure is my data with MedMemos?"
                answer="We use industry-standard encryption and security measures to protect your data."
              />
              <Faq
                question="Can I integrate MedMemos with my existing systems?"
                answer="Yes, MedMemos is designed to integrate seamlessly with most medical systems."
              />
              <Faq
                question="Is there a free trial available?"
                answer="Yes, we offer a 3-day free trial with access to all features."
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

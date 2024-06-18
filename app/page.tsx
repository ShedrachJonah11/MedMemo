import Image from "next/image";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import Video from "./components/Video";
export default function Home() {
  return (
    <>
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
            href={"/sign-up"}
            className="h-[56px] flex justify-center items-center px-[42px] rounded-[8px] text-white bg-[#007BFF] text-[16px] font-[600]"
          >
            Get Started Today{" "}
          </Link>
        </div>
      </main>

      <Video />

      <div className="mt-[-150px] chooseBg pt-[196px] px-[80px] pb-[64px] flex justify-between items-center gap-20 rounded-[48px]">
        <div className="w-1/2 flex flex-col gap-4 items-start">
          <button className="h-[35px] px-[32px] features rounded-full">
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
            <button className="h-[35px] px-[32px] features rounded-full">
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
                records, enhancing the efficiency and accuracy of your
                practice &apos;s documentation.
              </p>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

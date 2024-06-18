import Image from "next/image";

const Video = () => {
  return (
    <>
      <div className="px-[188px] mt-[-150px] z-80 relative">
        <Image src={"/Vid.svg"} className="w-full h-full" width={36} height={36} alt="" />
      </div>
    </>
  );
};

export default Video;

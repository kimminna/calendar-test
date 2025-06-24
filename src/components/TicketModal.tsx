import { useState } from "react";

export default function TicketModal() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };
  return (
    <div className=" flex flex-col w-full h-[400px] bg-gray-100 p-5 items-center gap-10 ">
      <header>티켓 추가</header>
      <div className="flex flex-row gap-10">
        {/* 이미지 검색 */}
        <div className="flex flex-col items-center gap-5 ">
          <div className="w-[150px] h-[150px] bg-gray-300  cursor-pointer"></div>
          <div>이미지 검색하기</div>
        </div>

        {/* 앨범 선택 */}
        <div className="flex flex-col items-center gap-5">
          <label
            htmlFor="fileInput"
            className="w-[150px] h-[150px] bg-gray-300  cursor-pointer"
          ></label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="fileInput"
          ></input>
          <div>앨범에서 선택</div>
        </div>

        {/* 직접 사진 촬영 */}
        <div className="flex flex-col items-center gap-5">
          <div className="w-[150px] h-[150px] bg-gray-300  cursor-pointer"></div>
          <div>사진 촬영</div>
        </div>
      </div>
    </div>
  );
}

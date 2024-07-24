const DashBoard = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center px-[3%] py-[2%]">
      {/* 배경이미지 */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-[url(https://i.ibb.co/s3QC5vr/3.jpg)] bg-cover bg-fixed" />
      {/* 대시보드 */}
      <div className="h-full w-full flex flex-row z-10 rounded-lg gap-8">
        {/* 메뉴 */}
        <div className="flex flex-col bg-glass backdrop-blur rounded-xl shadow-2xl basis-1/5"></div>
        {/* 오른쪽 구간 */}
        <div className="flex flex-col  basis-4/5 gap-8">
          <div className="basis-1/2 bg-glass backdrop-blur rounded-xl shadow-2xl">
            카테고리통계
          </div>
          <div className="flex flex-row basis-1/2 gap-8">
            <div className="basis-1/2 bg-glass backdrop-blur rounded-xl shadow-2xl">
              캐릭터 순위
            </div>
            <div className="basis-1/2 bg-glass backdrop-blur rounded-xl shadow-2xl">
              매운맛 점수
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

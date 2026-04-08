import React from "react";

const UpcomingEvent = () => {
  return (
    <div className=" h-screen md:h-[600px] flex justify-center items-center bg-[#212325]">
      <iframe
        src="https://luma.com/embed/calendar/cal-MXXaoFnWHFbRyUf/events"
        width="100%"
        height={300}
        frameBorder={0}
        allowFullScreen
        tabIndex={0}
      />
    </div>
  );
};

export default UpcomingEvent;

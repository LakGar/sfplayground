import React from "react";

const UpcomingEvent = () => {
  return (
    <div className=" h-screen md:h-[600px] flex flex-col justify-center gap-6 items-center bg-[#212325]">
      <h2 className="text-5xl mb-4 transition-all duration-700 text-center text-white">
        Upcoming Event
      </h2>
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

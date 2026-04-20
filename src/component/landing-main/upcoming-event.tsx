import React from "react";

const UpcomingEvent = () => {
  return (
    <div className=" h-screen md:h-[600px] flex flex-col justify-center gap-6 items-center p-4">
      <h2 className="text-5xl mb-4 transition-all duration-700 text-center ">
        Upcoming Event
      </h2>
      <div className="w-full md:w-[600px] rounded-xl overflow-hidden">
        <iframe
          src="https://luma.com/embed/calendar/cal-MXXaoFnWHFbRyUf/events"
          width="100%"
          height={300}
          allowFullScreen
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default UpcomingEvent;

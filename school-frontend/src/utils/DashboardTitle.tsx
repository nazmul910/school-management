import React from "react";

interface IDashboardTitleProps {
  blackText?: string;
  greenText?: string;
  className?: string;
}

const DashboardTitle = ({
  blackText,
  greenText,
  className,
}: IDashboardTitleProps) => {
  return (
    <h2
      className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${
        className && className
      }`}
    >
      {blackText} <span className="text-primary">{greenText}</span>
    </h2>
  );
};

export default DashboardTitle;

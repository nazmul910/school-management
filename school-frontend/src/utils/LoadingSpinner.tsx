import { ImSpinner2 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-40 text-4xl">
      <ImSpinner2  className="w-20 h-20 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;

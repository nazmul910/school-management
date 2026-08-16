export default function Tooltip({
  children,
  text,
  styles,
}: {
  children: React.ReactNode;
  text: string;
  styles: {
    left: string;
    top: string;
    bottom: string;
    right: string;
  };
}) {
  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute bottom-full left-${styles.left} top-${styles.top} right-${styles.right}
            transform -translate-x-1/2 mb-2 w-max bg-gray-800 text-white 
            text-xs p-2 rounded opacity-0 
            group-hover:opacity-100 transition-opacity duration-300`}
      >
        {text}
      </div>
    </div>
  );
}

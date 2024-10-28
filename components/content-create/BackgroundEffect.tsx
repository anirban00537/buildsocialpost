export const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-[140px] opacity-[0.08]">
        <div className="aspect-square h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 blur-[140px] opacity-[0.08]">
        <div className="aspect-square h-[400px] bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full" />
      </div>
    </div>
  );
};


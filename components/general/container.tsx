const Container = (props: any) => {
  return (
    <div className="rounded-3xl border-2 border-[#2E2E32] bg-[#1C1C1E] px-4	py-5 text-sm shadow-[-2px_-2px_4px_rgba(223,223,223,0.15)]	">
      {props.children}
    </div>
  );
};

export default Container;

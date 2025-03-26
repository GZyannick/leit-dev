import Image, { StaticImageData } from "next/image";
const Card = ({
  name,
  desc,
  icon,
}: {
  name: string;
  desc: string;
  icon: StaticImageData;
}) => {
  return (
    <div className="flex-shrink flex flex-col justify-center items-center max-w-md p-4 my-16">
      <Image src={icon} alt={`icon for &{name}`} className="w-12 h-12" />
      <h3 className="text-3xl bold text-center py-4 text-[hsl(var(--text))]">
        {name}
      </h3>
      <p className="text-xl text-center ">{desc}</p>
    </div>
  );
};

export default Card;

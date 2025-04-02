import { SVGProps } from "react";
import { IconMap, IconMapTypes } from ".";

interface SVGIconProps {
  icon: IconMapTypes;
  className?: string;
  props?: SVGProps<SVGSVGElement>;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  icon,
  className,
  props
}: SVGIconProps) => {
  const Icon = IconMap[icon as IconMapTypes];

  return (
    <Icon
      className={className}
      {...props}
    />
  );
};

export default SVGIcon;
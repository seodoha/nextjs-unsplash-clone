import { SVGProps, memo, Suspense } from "react";
import { IconMap, IconMapTypes } from ".";

interface SVGIconProps extends SVGProps<SVGSVGElement> {
  icon: IconMapTypes;
}

const SVGIcon = memo(({ icon, ...props }: SVGIconProps) => {
  const Icon = IconMap[icon];

  return (
    <Suspense fallback={<div style={{ width: 24, height: 24 }} />}>
      <Icon {...props} />
    </Suspense>
  );
});

SVGIcon.displayName = 'SVGIcon';

export default SVGIcon;
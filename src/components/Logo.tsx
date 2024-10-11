import classNames from 'classnames';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 60, height = 60, className }: Props) {
  return (
    <img src="/icon.png" 
    alt="Logo" 
    width={width}
    height={height}
    className={classNames('w-[35px] sm:w-[48px] aspect-square', className)}/>
  );
}

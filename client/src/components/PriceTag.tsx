import FormattedPrice from './FormattedPrice';

interface Props {
  regularPrice?: number;
  discountedPrice?: number;
  largeText?: string;
	smallText?: string
}

const PriceTag = ({ regularPrice, discountedPrice, largeText, smallText }: Props) => {
  return (
    <div className='flex items-end gap-2'>
      <p className={`line-through text-gray-500 font-medium ${smallText}`}>
        <FormattedPrice amount={regularPrice} />
      </p>
      <p className={`font-bold text-red-700 ${largeText}`}>
        <FormattedPrice amount={discountedPrice} />
      </p>
    </div>
  );
};

export default PriceTag;
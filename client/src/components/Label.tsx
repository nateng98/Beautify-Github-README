const Label = ({ title, htmlFor }: { title: string; htmlFor?: string }) => {
  return (
    <label
      htmlFor={htmlFor}
      className='block text-sm font-medium left-6 text-darkText'
    >
      {title}
    </label>
  );
};

export default Label;
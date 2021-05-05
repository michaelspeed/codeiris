import clsx from 'clsx';

export type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <textarea
      className={clsx(
        'text-blueGray-600 flex-1 p-2 m-1 bg-blueGray-100 rounded-md focus:border-blue-300 border-2',
        className,
      )}
      {...rest}
    />
  );
}

export default TextArea;

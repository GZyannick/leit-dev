export const FilledBox = ({
  color,
  width,
  height,
}: {
  color: string;
  width: string;
  height: string;
}) => {
  return (
    <svg
      fill={color}
      width={width}
      height={height}
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m21 7.702-8.5 4.62v9.678c1.567-.865 6.379-3.517 7.977-4.399.323-.177.523-.519.523-.891zm-9.5 4.619-8.5-4.722v9.006c0 .37.197.708.514.887 1.59.898 6.416 3.623 7.986 4.508zm-8.079-5.629 8.579 4.763 8.672-4.713s-6.631-3.738-8.186-4.614c-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-8.093 4.564-8.093 4.564z"
        fill-rule="nonzero"
      />
    </svg>
  );
};
export const LinedBox = ({
  color,
  width,
  height,
}: {
  color: string;
  width: string;
  height: string;
}) => {
  return (
    <svg
      fill={color}
      width={width}
      height={height}
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m3.514 6.61c-.317.179-.514.519-.514.887v8.95c0 .37.197.708.514.887 1.597.901 6.456 3.639 8.005 4.512.152.085.319.128.487.128.164 0 .328-.041.477-.123 1.549-.855 6.39-3.523 7.994-4.408.323-.177.523-.519.523-.891v-9.055c0-.368-.197-.708-.515-.887-1.595-.899-6.444-3.632-7.999-4.508-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-6.405 3.609-8 4.508m15.986 2.115v7.525l-6.75 3.722v-7.578zm-15 7.425v-7.458l6.75 3.75v7.511zm.736-8.769 6.764-3.813 6.801 3.834-6.801 3.716z"
        fill-rule="nonzero"
      />
    </svg>
  );
};

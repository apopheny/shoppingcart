export const validateProduct = ({
  title,
  price,
  quantity,
}: {
  title: string;
  price: number;
  quantity: number;
}): boolean => {
  return !!title && price >= 0 && quantity >= 0;
};

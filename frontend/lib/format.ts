const persianDigits = (value: string) => value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

export function formatPrice(price: string): string {
  const number = Number(price);
  if (!Number.isFinite(number)) return `${persianDigits(price)} تومان`;
  return `${new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(number)} تومان`;
}

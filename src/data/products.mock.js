export const products = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  title: "Кабель для wi-fi роутера від повербанка 12V",
  price: 199 + i * 10,
  oldPrice: 449,
  reviews: Math.floor(Math.random() * 300),
  image: "https://placehold.co/300x300",
}));

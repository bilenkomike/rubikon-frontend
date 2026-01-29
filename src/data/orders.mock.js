// src/data/orders.mock.js

export const orders = [
  {
    id: "RZ-10458231",
    created_at: "2026-01-18",
    status: "processing", // processing | shipped | delivered | canceled
    total: 3499,
    currency: "UAH",
    items: [
      {
        id: 1,
        title: "Повербанк Baseus 20000 мА·год 65W",
        qty: 1,
        price: 1999,
        image: "https://placehold.co/80x80",
      },
      {
        id: 2,
        title: "Кабель USB-C → USB-C 100W",
        qty: 1,
        price: 1500,
        image: "https://placehold.co/80x80",
      },
    ],
  },

  {
    id: "RZ-10457902",
    created_at: "2026-01-10",
    status: "delivered",
    total: 899,
    currency: "UAH",
    items: [
      {
        id: 3,
        title: "Мережевий фільтр APC 5 розеток",
        qty: 1,
        price: 899,
        image: "https://placehold.co/80x80",
      },
    ],
  },
];

// src/data/cart.mock.js

export const cartItems = [
  {
    id: 1,
    title: "Повербанк Baseus 20000 мА·год 65W",
    price: 1999,
    qty: 1,
    image: "https://via.placeholder.com/80x80",
  },
  {
    id: 2,
    title: "Кабель USB-C → USB-C 100W",
    price: 1500,
    qty: 2,
    image: "https://via.placeholder.com/80x80",
  },
];

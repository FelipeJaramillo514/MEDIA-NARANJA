export type NewProduct = {
  id: string;
  name: string;
  description: string;
  price: string; // Mostrar en UI (formato local)
  imageUrl: string; // /assets/nuevos/*.jpg
};

export const NewProductsData: NewProduct[] = [
  {
    id: "nuevo-atardecer-coral",
    name: "Atardecer Coral",
    description: "Combinación cálida en tonos coral y durazno.",
    price: "55.000",
    imageUrl: "/assets/nuevos/atardecer-coral.jpg",
  },
  {
    id: "nuevo-brisa-pastel",
    name: "Brisa Pastel",
    description: "Paleta suave en rosas y lavanda, estilo romántico.",
    price: "45.000",
    imageUrl: "/assets/nuevos/brisa-pastel.jpg",
  },
  {
    id: "nuevo-romance-dorado",
    name: "Romance Dorado",
    description: "Toques dorados con rosas premium para ocasiones especiales.",
    price: "90.000",
    imageUrl: "/assets/nuevos/romance-dorado.jpg",
  },
];

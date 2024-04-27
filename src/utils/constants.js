export const CONTENT = {
  title: "Chef IA",
  subtitle: "from Innovation Squad - GenIA",
  chef: {
    welcome:
      "Hola, soy tu chef personal. ¡Puedo ayudarte a armar una receta! Dime ¿Qué ingredientes tienes?",
    loading: "Mmm... Interesante...",
    success:
      "Genial, he encontrado dos recetas que puedes preparar con tus ingredientes. Seleccioná cual te gusta y te ayudaré a prepararla.",
    error:
      "Lo siento, no he podido encontrar una receta para tus ingredientes.",
  },
  placeholder: {
    input: "¿Qué ingredientes tienes?",
    loading: "El chef está pensando recetas según tus ingredientes",
  },
  button: {
    start: "Preguntar al chef",
    loading: "Pensando ...",
  },
};

export const URL = "http://localhost:11434/api/generate";

export const DATA_MOCK = {
  response: "¡Excelente elección!",
  recipesTitle: ["Torta de manzana", "Omelette"],
  recipes: [
    "Haz una torta de manzana: mezcla 2 huevos con 1 cucharada de harina y agrega rebanadas de manzana. Cocina en un sartén hasta que esté dorado.",
    "Haz una omelette: bate 2 huevos con 1 cucharada de harina y cocina en un sartén hasta que esté cocido. Agrega rebanadas de manzana y dobla la omelette para servir.",
  ],
};

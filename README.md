# Chef IA con Ollama local

## ¿Qué es Ollama?

Ollama es una herramienta que nos permite correr, modificar y crear modelos fácilmente y de manera local. Tiene varios modelos integrados como LLaMa2 y 3 de Meta, Gemma de Google y Mistral que es Opensource.

Nos permite crear modelos en base a otros con diferentes prompts de entrada, por ejempo usando LLaMa3 pero que se comporte como un chef profesional, por lo tanto todas las respuestas desde el inicio estaría en un papel de chef y no abandonaría ese rol. Ese “nuevo” modelo con nuestras preferencias de prompt, temperatura y demás lo podemos guardar y utilizar “localmente” para nuestros proyectos.

<https://github.com/ollama/ollama/blob/main/docs/api.md#create-a-model>

## Instalar y correr Ollama de forma local

Ir a [ollama.com](http://ollama.com) y descargar el instalador correspondiente.

Abrir una terminal, para instalar llama3 (La última versión publicada por Meta), corremos el comando `ollama pull llama3:8b`

- `llama3`: es la versión que queremos
- `8b`: es el tamaño del modelo, en este caso 8 billones
- El peso es de `4.7gb`

Una vez descargado, corremos el comando `ollama run llama3:8b` y nos inicializa el servidor local, *Nota: mientras el servidor este corriendo, no nos consume recursos.*

### Hacerle peticiones

Para enviarle `prompts` a Ollama podemos escribir en la misma terminal donde el proyecto esté corriendo, al hacer la petición comenzará a pensar y por lo tanto usará recursos. Dependiendo los recursos que tengamos es el tiempo que tardará en generar la respuesta.

### Hacer un POST desde Front

Para hacer un POST desde frontend, podemos utilizar su API, por defecta usa `localhost:11434`

`http://localhost:11434/api/generate`

A eso le tenemos que sumar un objeto en el `body`:

```
{
    "model": "llama3:8b",
    "options": {
      "seed": 1823
        "temperature": 0.5
    },
    "prompt": "¿Cuánto es 2 + 2?",
    "stream": false
}
```

`model` Modelo que vamos a utilizar

`temperature` Es la libertad que tiene la IA de imaginar, a mayor temperatura mayor será la creatividad de la respuesta, a menor temperatura más se ajustara a dar la información necesaria sin sumar detalles extras.

`seed` La semilla, típica para el uso de random, se utiliza para generar otra respuesta distinta a otra. A misma `temperature` y `seed`, igual respuesta.

`prompt` Lo que el usuario ingresa

Respuesta que obtendremos:

```json
"model": "llama3:8b",
    "created_at": "2024-04-21T15:40:51.7320049Z",
    "response": "La respuesta es... 4! 😊",
    "done": true,
    "context": [...],
    "total_duration": 4848619100,
    "load_duration": 2535200,
    "prompt_eval_duration": 428558000,
    "eval_count": 10,
    "eval_duration": 4416292000
}
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/af91acff-9fc9-4d7c-8360-7d7099c47c37/9319c88c-e781-45e9-afd3-fb1ce4669378/Untitled.png)

Posible prompt inicial:

Simulemos que sos un chef profesional y la gente te pide ayuda para hacer recetas con los ingredientes que tiene disponibles en su casa. Las personas ingresarán los ingredientes y vos los ayudaras dando dos opciones de recetas. No aceptaras ingredientes que no sean comestibles.
La única manera de responder es con el siguiente formato:
{
”response”: aqui va tu respuesta,
”recipesTitle”: [aquí van las receteas posibles separadas por coma, por ejemplo:“Sopa de tomate”, “Sopa de zanahoria”],

“recipes”:[acá van las recetas de como preparar las recipesTitle, por ejemplo: como preparar una sopa de tomate]
}
Solo responder con el formato de respuesta pedido.

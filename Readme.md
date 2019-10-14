API Sitios de Interés con Firestore


1. Logueate como cliente para acceder a las operaciones CRUD.

POST: http://localhost:3000/api/auth/

Los datos de acceso en formato JSON (body message) están incluidos en la solicitud del proyecto en Postman. Utiliza el token retornado para asignarlo a la cabecera de las próximas solicitudes.

2. Explora los campos. 

Podrás actualizar, eliminar, filtrar, etc, en el orden que tu elijas, pero es aconsejable conocer los datos primero.

2.1. GET: http://localhost:3000/api/sites/?limit=4

En la primera consulta, utiliza este end-point para adquirir los sitios de interes con paginación. Asigna un límite de elementos para ser visualizados en cada página. 

{
    "sites": [
        {
            "id": 0,
            "nombre": "Sitio1"
        },
        {
            "id": 1,
            "nombre": "Sitio2"
        },
        ...
    ],
    "lastId": 3 //Copia este valor
}

Podrás seguir paginando los resultados agregando un parámetro adicional:

GET: http://localhost:3000/api/sites/?limit=4&lastId=3

"lastId" cuyo valor debe ser el mismo adquirido en la anterior respuesta. Para este ejemplo, lastId equivale a 3. Con este valor se le indicará a Firestore volver a consultar los n (ejemplo=4) elementos siguientes a un sitio de interes con este id.

2.2. GET: http://localhost:3000/api/sites/?nombre=xxxxx

Filtra sitios por nombre. Se utiliza el nombre exacto de un sitio existente, la expectiva consistía en listar los sitios cuyo nombre contenían la cadena de caracteres del parámetro.

3. Crear y actualizar sitio.

Utiliza esta solicitud para crear un nuevo sitio

POST | PUT: http://localhost:3000/api/sites/

Body (Content-type: JSON)
{
		"id":X,
		"nombre":"xxxxxx",
		"descripcion":"xxxxxxx",
		"url_imagen":"https://www.xxxx.yy/xxx.zzz",
		"ubicacion":{
			"_lat":xx.xxxx,
			"_lon":xx.xxxx
		}
}
Con este formato se podrá crear o actualizar un sitio. La API retornará un mensaje (404) si el elemento con ese id existe o no, en caso de crear o actualizar, respectivamente.

Se incluyó una capa de validación de propiedades en un middelware para los siguientes casos:

> id: Si existe, si es entero positivo, si es nulo o vacío se ejecutará la solicitud con valor id=0.
> url_imagen: Si existe, si corresponde a una cadena URL escrita correctamente.
> ubicacion (_lat, _lon): Si existe, si es un número flotante. 
> nombre y descripcion: Si existe, si son cadenas de caracteres.

4. Eliminar | Adquirir sitio por ID:

DELETE | GET: http://localhost:3000/api/sites/{id}

Elimina o adquiere detalles de un sitio por su id. También se valida si el sitio existe antes de realizar la operación.

>>> IMPORTANTE: Recuerda crear el token en la sección Headers.
KEY: token
VALUE: Leer sección 1.

En cada solicitud se verificá el token, su validez y autenticidad. Por lo tanto, debes adquirir uno nuevo si no estas autorizado.

NOTAS ADICIONALES

- Se logró modularizar tanto como se pudo.
- Se puede mejorar al agregar un middelware para la validación de sitios con id existentes y reducir la cantidad de lineas de código en el controlador, actualmente se valida en cada solicitud que corresponde. 
- Escritura de código con Typescript por comodidad.
- Ejecutar con "npm start"






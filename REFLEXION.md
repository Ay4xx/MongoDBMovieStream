# Reflexión del proyecto MovieStream en MongoDB

## 1. Volviendo a empezar

Si tuviera que rediseñar el modelo desde cero, probablemente cambiaría la forma en la que manejé la relación entre películas, géneros y actores. Al inicio decidí guardar dentro de cada película una versión resumida de sus géneros y actores, incluyendo el `_id` y el nombre. Esta decisión hizo que listar películas fuera muy sencillo, porque al consultar la colección `movies` ya tenía casi toda la información necesaria para mostrarla en la interfaz.

Sin embargo, durante la implementación me di cuenta de que genera un problema al editar el nombre de un género, no basta con actualizar el documento dentro de la colección `genres`; también hay que actualizarlo dentro de todas las películas que tengan ese género. Aun así, no considero que el modelo esté mal. 

## 2. La conversación con mi modelo

La operación que se sintió más incómoda fue editar un género que ya estaba siendo usado por varias películas. En este modelo, como las películas tienen embebido el nombre del género, se tienen que hacer dos cosas: actualizar el documento del género en la colección `genres`, y ademsa actualizarlo en todas las películas donde aparecía ese género dentro del arreglo `genres`. Esto se resolvió con un `updateMany`, pero fue una operación menos natural que en SQL.

Lo positivo es que listar películas fue muy cómodo. La pantalla principal de películas puede mostrar título, año, duración, rating, géneros y actores consultando directamente la colección `movies`. Esa parte se sintió más simple que reconstruir la información con varias tablas intermedias como en SQL.

## 3. La pregunta honesta: ¿NoSQL fue mejor opción para MovieStream?

Depende del tipo de operaciones que uno quiera priorizar.

Si la aplicación se enfoca principalmente en mostrar catálogos de películas, géneros, actores y datos relacionados, MongoDB sí puede ser una buena opción. En mi caso, fue práctico que cada película tuviera dentro del mismo documento sus géneros y actores resumidos. Esto hizo que la interfaz fuera más fácil de construir, especialmente para listar películas y mostrarlas con información completa sin depender de muchas consultas separadas.

Sin embargo, si fuera una plataforma más grande el modelo relacional original podría seguir siendo más conveniente. En SQL, las relaciones muchos-a-muchos, como películas con actores o películas con géneros, se manejan de forma más estructurada. Además, la consistencia de los datos se protege mejor.

En mi experiencia construyendo esta app, MongoDB fue útil para avanzar rápido y para representar documentos que naturalmente agrupan información. Por ejemplo, el historial y los ratings de un usuario tienen sentido dentro del documento del usuario, porque pertenecen directamente a su actividad. También fue útil para tener películas con arreglos de géneros y actores.

Por eso, para este proyecto académico, considero que NoSQL sí fue una buena opción porque permitió experimentar con un modelo más flexible y comparar con un modelo SQL. Pero para una versión real y grande probablemente usaría un enfoque híbrido o tendría que diseñar con mucho más cuidado qué datos se embeben y cuáles se referencian.

La principal lección que me llevo es que el mejor modelo no depende solamente de si la base es relacional o documental, sino de cómo se va a usar la información. MongoDB funcionó bien para lecturas rápidas y documentos con información agrupada, pero exigió más responsabilidad en la aplicación para mantener consistencia.
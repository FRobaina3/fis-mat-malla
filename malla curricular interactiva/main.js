
let creditosGlobal=0;
let contenedorHtml = document.getElementById("matematicas");
matematicas.forEach(mat=> imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("fisica");
fisica.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("quimica");
quimica.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("ComputacionCientifica");
computacionCientifica.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("ModeladoFiscoMatematico");
modeladoFisicoMatematico.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("ActividadesComplementarias");
actividadesComplementarias.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("IngenieriaYSociedad");
ingenieriaYSociedad.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("AreaDeFormacionTecnologica");
areaDeFormacionTecnologica.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("Talleres");
Talleres.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("Pasantia");
pasantia.forEach(mat=>imprimir(mat,contenedorHtml));

contenedorHtml=document.getElementById("ProyectoFinal");
proyectoFinal.forEach(mat=>imprimir(mat,contenedorHtml));


contenedorHtml=document.getElementById("repetidasId");

// repetidasId.forEach(mat=>{imprimirRepetidas(mat,contenedorHtml)});
// repetidasNombre.forEach(mat=>{imprimirRepetidas(mat,contenedorHtml)});
// function imprimirRepetidas(materia,contenedor){
//   contenedor.innerHTML+="<div><p>" + materia + "</p></div>";
// }




actualizarDisponiblesInicial();

previasInvertidas();

actualizarDisponibles();
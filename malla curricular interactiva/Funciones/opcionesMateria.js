function setNombresDeArrayId(array){
  let arrayNombres= [];
  for(const matId of array){
    let mat=materiasMap.get(matId);
    arrayNombres.push(mat.nombre);
  }
  return arrayNombres;
}
function imprimirExamenesPrevios(materiaId){
  let materia=materiasMap.get(materiaId);
  let previasHtml= document.getElementById("opcionesMateriaPrevias");
  let nombPrevCurso=setNombresDeArrayId(materia.previasCurso);
  let nombPrevExamen=setNombresDeArrayId(materia.previasExamen);
  previasHtml.innerHTML="<p>Examenes previos: " +nombPrevExamen.join(", ")+"<p>"
  +"<p>Cursos previos: " +nombPrevCurso.join("  ,  ")+"<p>";
}
function imprimirCursosPrevios(materiaId){
  let materia=materiasMap.get(materiaId);
  let credAreaHtml=document.getElementById("opcionesMateriaCreditosArea");
  credAreaHtml.innerHTML="<p>Creditos por area:</p>"
  if(materia.creditosPorArea.size>0){
    let nombre;
    for(const [clave,cred] of materia.creditosPorArea){
      nombre=mapNombresAreas.get(clave);
      credAreaHtml.innerHTML+=`<p>${nombre}: ${cred}</p>`;
    }
  } 
}
function imprimirCreditosPorArea(materiaId){
  let habilitaHtml= document.getElementById("opcionesMateriaHabilita");
  habilitaHtml.innerHTML="<p>Habilita: <p>";
  if(materiaHabilitaMap.has(materiaId)){
    let setHabilitadasId=materiaHabilitaMap.get(materiaId);
    let arrayIdHabilitadas=Array.from(setHabilitadasId);
    let nombHabilitadas=setNombresDeArrayId(arrayIdHabilitadas);
    habilitaHtml.innerHTML="<p>Habilita: " +nombHabilitadas.join(" , ")+"<p>";
  }
}


function ventanaOpcionesMateria(materiaId){
  let materia=materiasMap.get(materiaId);
  imprimirExamenesPrevios(materiaId);
  imprimirCursosPrevios(materiaId)
  imprimirCreditosPorArea(materiaId)

  if(materia.condicionesPrevias){

  }

  ocultarMostrarIdElemento('opcionesMateria-overlay');
}
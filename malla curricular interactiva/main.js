

function imprimir(materia,contenedor){
  contenedor.innerHTML+="<div><button id='"+materia.id+"' class='noDisponible' onclick=cambiarEstado('"+materia.id+"')>" 
 + materia.nombre + "  (" +materia.creditos +")" + "</button></div>"
  
}

//Cambia la materia de disponible a no disponible si siono=1, si es =0 la deshabilita. No controla si es valido
function habilitar(materiaId,siono){
  let estado=document.getElementById(materiaId);
  if(estado.className=="noDisponible" && siono==1){
    estado.className="disponible"
  }else if(estado.className!="noDisponible" && siono==0){
    estado.className="noDisponible"
  }
}

function disponible(materiaId,arreglo){
  let materia=arreglo.find(mat=> mat.id===materiaId);
  let res=true;
  //Se puede optimizar de for a while (res==true)
  for(let i=0;i<materia.previasCurso.length;i++){ //ojo con esto no se si va hasta donde tiene que ir
    let preC=document.getElementById(materia.previasCurso[i]);
    res=res && (preC.className==="cursoAprobado" || preC.className==="examenAprobado");
  };
  for(let i=0;i<materia.previasExamen.length;i++){ //ojo con esto no se si va hasta donde tiene que ir
    let preE=document.getElementById(materia.previasExamen[i]);
    res=res && preE.className==="examenAprobado";
  };
  return res;
}

//O(n^2) se puede optimizar
function actualizarDisponibles(){
  matematicas.forEach(mat=>{
   if(disponible(mat.id,matematicas)){
    habilitar(mat.id,1);
   }else{
    habilitar(mat.id,0);
   }
  })
}

function sumarCreditos(materiaId,arreglo){
  let materia=arreglo.find(m=>m.id==materiaId);
  let button=document.getElementById(materiaId);
  if(button.className==="examenAprobado"){
    creditosGlobal=creditosGlobal-materia.creditos;
  }
  if(button.className==="cursoAprobado"){
    creditosGlobal=creditosGlobal+materia.creditos;
  }
  document.getElementById("creditosGlobal").innerText= "Creditos:"+creditosGlobal+"";
  documento.getElementById("arreglo").innerText= "Creditos:"+creditosGlobal+""; 
}

function cambiarEstado(materiaId){
  const button=document.getElementById(materiaId);
  if(button.className!="noDisponible"){
    let estActual=estados.indexOf(button.className);
    sumarCreditos(materiaId,matematicas);//matematicas no puede quedar hardcodeado
    button.className=estados[(estActual+1) % estados.length ];
  }
  actualizarDisponibles();
}

let creditosGlobal=0;
let contenedorHtml = document.getElementById("matematicas");
matematicas.forEach(mat=> imprimir(mat,contenedorHtml));
contenedorHtml=document.getElementById("fisica");
fisica.forEach(mat=>imprimir(mat,contenedorHtml));

actualizarDisponibles();
































// const contenedor = document.getElementById("matematicas");
// matematicas.forEach(matematicas => {
//   const button= document.createElement("button");
//   button.textContent = matematicas.nombre ;
//   contenedor.appendChild(button);
// });



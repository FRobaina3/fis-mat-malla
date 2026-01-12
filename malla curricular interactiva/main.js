

function imprimir(materia,contenedor){
  contenedor.innerHTML+="<div><button class='"+materia.id+" "+contenedor.id+" noDisponible' onclick=cambiarEstado('"+materia.id+"')>" 
 + materia.nombre + "  (" +materia.creditos +")" + "</button></div>";
  
}

//Cambia la materia de disponible a no disponible si siono=1, si es =0 la deshabilita. No controla si es valido
function habilitar(materiaId,siono){
  let matList=document.getElementsByClassName(materiaId);
  for(const estado of matList){
    if(estado.classList.contains("noDisponible") && siono==1){
      estado.classList.remove("noDisponible");
      estado.classList.add("disponible");
    }else if(!estado.classList.contains("noDisponible") && siono==0){
      estado.classList.remove("disponible" , "cursoAprobado", "examenAprobado");
      estado.classList.add("noDisponible");    
    }
  }
}

//validar previas o una previa dentro de un set fue aprobada como examen o curso
function esPreviaAprobada(examenOCurso,previa){
  let ret=false;
  if(typeof previa==="string"){
    let preList=document.getElementsByClassName(previa);
    if(preList.length>0){
      let pre=preList[0];
      if(examenOCurso==="curso"){
        ret= (pre.classList.contains("cursoAprobado") || pre.classList.contains("examenAprobado"));        
      }else if (examenOCurso ==="examen"){
        ret=  pre.classList.contains("examenAprobado");
      }
    }    
  }else if(previa instanceof Set){ 
    let unaPreviaAlcanza=false;
    for(const opcionPrev of previa){
      let opcionPreList=document.getElementsByClassName(opcionPrev);
      let opcionPre=opcionPreList[0];
      if(examenOCurso==="curso"){
        unaPreviaAlcanza = unaPreviaAlcanza || opcionPre.classList.contains("cursoAprobado") || opcionPre.classList.contains("examenAprobado");
      }else if(examenOCurso ==="examen"){
        unaPreviaAlcanza = unaPreviaAlcanza || opcionPre.classList.contains("examenAprobado");
      }
    };
    ret= unaPreviaAlcanza;
  }
  return ret;
}

//validar otras condicionesDePrevias, que consiste en validar previas curso y examen
function conjuntoDePreviasAprobado(materia){
  let cumpleCualquierCondicion=false;
  if(materia.condicionesPrevias){
    for(const cond of Object.values(materia.condicionesPrevias)){
      let i=0;
      let cumpleCondicion=true;
      while(cumpleCondicion==true && i<cond.previasCurso.length){
        let previaC=cond.previasCurso[i];
        cumpleCondicion=cumpleCondicion && esPreviaAprobada("curso",previaC);    
        i++;
      }
      i=0;
      while(cumpleCondicion==true && i<cond.previasExamen.length){
        let previaE=cond.previasExamen[i];
        cumpleCondicion=cumpleCondicion && esPreviaAprobada("examen",previaE);
        i++;
      }
      cumpleCualquierCondicion= cumpleCualquierCondicion || cumpleCondicion;
    }
    return cumpleCualquierCondicion;
  }else{ return true;}
}

function disponible(materiaId){
  let materia=materiasMap.get(materiaId);
  let res=true;
  let i=0;
  while(res==true && i<materia.previasCurso.length){
    let previaC=materia.previasCurso[i];
    res=res && esPreviaAprobada("curso", previaC);
    i++;
  }
  while(res==true && i<materia.previasExamen.length){
    let previaE=materia.previasExamen[i];
    res=res && esPreviaAprobada("examen", previaE);
    i++;  
  }
  if(materia.condicionesPrevias){
    res=res && conjuntoDePreviasAprobado(materia);
  }
  return res;
}
//Esta funcionaba
// function disponible(materiaId){
//   let materia=materiasMap.get(materiaId);
//   let res=true;
//   //Se puede optimizar de for a while (res==true)
//   for(let i=0;i<materia.previasCurso.length;i++){ //ojo con esto no se si va hasta donde tiene que ir

//     let previa=materia.previasCurso[i];
//     if(typeof previa=== "string"){

//       let preCList=document.getElementsByClassName(materia.previasCurso[i]);
//       if(preCList.length>0){
//         let preC=preCList[0];
//         res=res && (preC.classList.contains("cursoAprobado") || preC.classList.contains("examenAprobado"));
//       }

//     }else if(previa instanceof Set){ 

//       let unaPreviaAlcanza=false;
//       for(const opcionPrev of previa){
//         let opcionPreCList=document.getElementsByClassName(opcionPrev);
//         let opcionPreC=opcionPreCList[0];
//         unaPreviaAlcanza = unaPreviaAlcanza || opcionPreC.classList.contains("cursoAprobado") || opcionPreC.classList.contains("examenAprobado");
//       };
//       res=res && unaPreviaAlcanza;

//     }
//   };

//   for(let i=0;i<materia.previasExamen.length;i++){ //ojo con esto no se si va hasta donde tiene que ir
//     let previa=materia.previasExamen[i];
//     if(typeof previa==="string"){

//       let preEList=document.getElementsByClassName(materia.previasExamen[i]);
//       if(preEList.length>0){
//         let preE=preEList[0];
//         res=res && preE.classList.contains("examenAprobado");     
//       }

//     }else if(previa instanceof Set){

//       let unaPreviaAlcanza=false;
//       for(const opcionPrev of previa){
//         let opcionPreEList=document.getElementsByClassName(opcionPrev);
//         let opcionPreE=opcionPreEList[0];
//         unaPreviaAlcanza = unaPreviaAlcanza || opcionPreE.classList.contains("examenAprobado");
//       };
//       res=res && unaPreviaAlcanza;

//     }
//   };
//   return res;
// }

//O(n^2) se puede optimizar
function actualizarDisponibles(){
  materiasMap.forEach(mat=>{
   if(disponible(mat.id)){
    habilitar(mat.id,1);
   }else{
    habilitar(mat.id,0);
   }
  })
}
//NO PUEDO SUMAR UNA VEZ POR MATERIA. HAY ALGUNAS QUE SUMAN REPARTEN SU CANTIDAD TOTAL DE CREDITOS ENTRE LOS GRUPOS COMO SeyS
//Creo que tengo que sumar cada apariccion de materia aunque este repetido
function sumaCreditosSimultaneo(){ 
  //Se supone que una materia suma a todos los grupos a los que pertenece, pero como suma a lo global?

  //este metodo suma una sola vez al global
  // let aprobadas=document.getElementsByClassName("examenAprobado");
  // let setAprobadas=new Set();
  // for(const apr of aprobadas){
  //   setAprobadas.add(apr.classList[0]);
  // }
  // let sum=0
  // for(const aprId of setAprobadas){
  //   let materia=materiasMap.get(aprId);
  //   sum=sum+materia.creditos;
  // }
  // document.getElementById("creditosGlobal").innerText = "Creditos:" + sum;

  //este metodo suma repetido al global
  let aprobadas=document.getElementsByClassName("examenAprobado");
  let sum=0;
  for(const apr of aprobadas){
    let materia=materiasMap.get(apr.classList[0]);
    sum=sum+materia.creditos;
  }
  document.getElementById("creditosGlobal").innerText = "Creditos:" + sum;



}


function cambiarEstado(materiaId){
  const buttonList=document.getElementsByClassName(materiaId);
  for(const btn of buttonList){
    if( ! btn.classList.contains("noDisponible")){     
      let estActual=estados.find(m=>btn.classList.contains(m));
      btn.classList.remove(estActual);
      let estActualI=estados.indexOf(estActual);
      btn.classList.add(estados[(estActualI+1) % estados.length ]);   
    }
  }
  actualizarDisponibles();
  sumaCreditosSimultaneo();
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



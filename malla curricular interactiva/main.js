

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

function disponible(materiaId){
  let materia=materiasMap.get(materiaId);
  let res=true;
  //Se puede optimizar de for a while (res==true)
  for(let i=0;i<materia.previasCurso.length;i++){ //ojo con esto no se si va hasta donde tiene que ir
    let preCList=document.getElementsByClassName(materia.previasCurso[i]);
    if(preCList.length>0){
      let preC=preCList[0];
      res=res && (preC.classList.contains("cursoAprobado") || preC.classList.contains("examenAprobado"));
    }
  };
  for(let i=0;i<materia.previasExamen.length;i++){ //ojo con esto no se si va hasta donde tiene que ir
    let preEList=document.getElementsByClassName(materia.previasExamen[i]);
    if(preEList.length>0){
      let preE=preEList[0];
      res=res && preE.classList.contains("examenAprobado");     
    }
  };
  return res;
}

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



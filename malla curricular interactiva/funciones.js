
//Imprime una materia
function imprimir(materia,contenedor){
  contenedor.innerHTML += `<div><button class="${materia.id} ${contenedor.id} noDisponible" data-creditos="${materia.creditos}" 
  onclick="cambiarEstado('${materia.id}')">${materia.nombre} (${materia.creditos})</button></div>`;
}

function ocultarMostrarClass(clase){
  lista=getElementsByClassName(clase);
  lista.forEach(elem=>{elem.classList.toggle("oculto")});
}
function ocultarMostrarIdElemento(idElem){
  lista=getElementsById(idElem);
  lista.forEach(elem=>{elem.classList.toggle("oculto")});
}

//guarda en materiaHabilita que previa habilita materia
function agregarMateriaHabilita(prevId,materiaId){  
    if(materiaHabilitaMap.has(prevId)){
        let setHabilita= materiaHabilitaMap.get(prevId);
        setHabilita.add(materiaId);
    }else{
        materiaHabilitaMap.set(prevId,new Set([materiaId]));
    }    
}

//Asignamos las materias que habilita cada materia
function previasInvertidas(){
    for(const materia of materiasMap.values()){
        materia.previasExamen.forEach(prev=>{agregarMateriaHabilita(prev,materia.id)})
        materia.previasCurso.forEach(prev=>{agregarMateriaHabilita(prev,materia.id)})
        if('condicionesPrevias' in materia ){
            Object.keys(materia.condicionesPrevias).forEach(cond=>{
                materia.condicionesPrevias[cond].previasExamen.forEach(prev=>{agregarMateriaHabilita(prev,materia.id)})
                materia.condicionesPrevias[cond].previasCurso.forEach(prev=>{agregarMateriaHabilita(prev,materia.id)})
            })
        }
    }    
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

function creditosPorAreaAprobados(previa){
  let aprobo=true;
  for(const [area, creditos] of previa.creditosPorArea){
    let credActual=Number(document.getElementById(area).dataset.creditos);
    aprobo=aprobo && (credActual>=creditos);
  }
  return aprobo;
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
  res=res && creditosPorAreaAprobados(materia);

  return res;
}

//marca como disponible las materias que no tienen previas
function actualizarDisponiblesInicial(){
  materiasMap.forEach(mat=>{
   if(disponible(mat.id)){
    habilitar(mat.id,1);
   }else{
    habilitar(mat.id,0);
   }
  })
}
//evalua las materias aprovadas y marca cuales estan disponibles
function actualizarDisponibles(){
    console.log('corre actualizarDisponibles' )
    for (const idAprovada of materiasAprobadasMap.keys()){
        if(materiaHabilitaMap.has(idAprovada)){
            let habilitadasSet= materiaHabilitaMap.get(idAprovada);
            habilitadasSet.forEach(mat=>{ 
                if(disponible(mat)){
                    habilitar(mat,1);
                }else{
                    habilitar(mat,0);
                }
            })
        } 
    }
}

//revisa previaId es una previa obligatoria de materiaId
function esPreviaObligatoria(materiaId,previaId){
    let mat=materiasMap(materiaId);
    let obligatoria=false;
    let i=0;
    while(!obligatoria && i<mat.previasCurso.length){
        if (mat.previasCurso[i]===previaId){ obligatoria=true}
        i++;
    }
    while(!obligatoria && i<mat.previasExamen.length){
        if (mat.previasExamen[i]===previaId){ obligatoria=true}
        i++;
    }
    return obligatoria;
}



//Al marca no disponible, se recorre todas las materias que habilita y recursivamente las marca como noDisponible.
//(Las materias que tienen creditos como previas se marcan como no aprobadas, y las materias que habilita tambien. 
//Se pierde algo de informacion con esto)
function actualizarNoDisponible(materiaId){
    for(const mat of materiaHabilitaMap.get(materiaId)){
        //Si materiaId es obligatoria marcarla como noDisponible
        if(esPreviaObligatoria(mat.id,materiaId)){
            const buttonList=document.getElementsByClassName(mat);
            for(const btn of buttonList){
                if( ! btn.classList.contains("noDisponible")){                  
                    let estActual=estados.find(m=>btn.classList.contains(m));
                    btn.classList.remove(estActual);
                    btn.classList.add("noDisponible");  
                    materiasAprobadasMap.delete(mat); 
                    actualizarNoDisponible(mat);
                }
            }
        //Si materiaId esta en las opcionales        
        }else{
            //reevaluar (si tiene creditos como previa asumir que no llega)
            if(mat.creditosPorArea.size==0){
                if(! disponible(mat.id)){
                    const buttonList=document.getElementsByClassName(mat);
                    for(const btn of buttonList){
                        if( ! btn.classList.contains("noDisponible")){                  
                            let estActual=estados.find(m=>btn.classList.contains(m));
                            btn.classList.remove(estActual);
                            btn.classList.add("noDisponible");  
                            materiasAprobadasMap.delete(mat); 
                            actualizarNoDisponible(mat);
                        }
                    }
                }
            }else{
                //marcar como no disponible
                const buttonList=document.getElementsByClassName(mat);
                for(const btn of buttonList){
                    if( ! btn.classList.contains("noDisponible")){                  
                        let estActual=estados.find(m=>btn.classList.contains(m));
                        btn.classList.remove(estActual);
                        btn.classList.add("noDisponible");  
                        materiasAprobadasMap.delete(mat); 
                        actualizarNoDisponible(mat);
                    }
                }
            }
        }
    }
    
}

//cambia el estado de una materia entre disponible curso aprobado y examen aprobado
function cambiarEstado(materiaId){
  const buttonList=document.getElementsByClassName(materiaId);
  for(const btn of buttonList){
    if( ! btn.classList.contains("noDisponible")){     
      let estActual=estados.find(m=>btn.classList.contains(m));
      btn.classList.remove(estActual);
      let estActualI=estados.indexOf(estActual);
      btn.classList.add(estados[(estActualI+1) % estados.length ]);   
    }
    if( btn.classList.contains("noDisponible") || btn.classList.contains("disponible") ){
        window.requestAnimationFrame(()=>actualizarNoDisponible(materiaId));
    }else if(btn.classList.contains("cursoAprobado")){
        materiasAprobadasMap.set(materiaId,"cursoAprobado");
    }else if(btn.classList.contains("examenAprobado")){
        materiasAprobadasMap.set(materiaId,"examenAprobado");
    }
  }
   window.requestAnimationFrame(() => {
    actualizarDisponibles();
    // sumaCreditosSimultaneo();
  });

}


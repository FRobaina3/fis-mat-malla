
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

//guarda en materiaHabilitaMap que previa habilita materia
function agregarMateriaHabilita(prevId,materiaId){  
    if(materiaHabilitaMap.has(prevId)){
        let setHabilita= materiaHabilitaMap.get(prevId);
        setHabilita.add(materiaId);
    }else{
        materiaHabilitaMap.set(prevId,new Set([materiaId]));
    }    
}

//guarda en contadorHabilitaMap que un contador habilita materia.id
function agregarContadorHabilita(contador,materiaId){
  if(contadorHabilitaMap.has(contador)){
    let setHabilita=contadorHabilitaMap.get(contador);
    setHabilita.add(materiaId);
  }else{
    contadorHabilitaMap.set(contador, new Set([materiaId]));
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
    for(const [area,min] of materia.creditosPorArea ){
      agregarContadorHabilita(area,materia.id);
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
for (const [contador, setMaterias] of contadorHabilitaMap) {
  for (const mat of setMaterias) {
    if(disponible(mat)){
      habilitar(mat,1);
    }else{
      habilitar(mat,0);
    }
  }
}
}

//revisa previaId es una previa obligatoria de materiaId
function esPreviaObligatoria(materiaId,previaId){
    let mat=materiasMap.get(materiaId);

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
//Las Materias que solo tienen creditos como previa todavia no se eliminan
function actualizarNoDisponible(materiaId){
  if(materiaHabilitaMap.has(materiaId)){
    for(const matId of materiaHabilitaMap.get(materiaId)){
      //Si materiaId es obligatoria marcarla como noDisponible
      if(esPreviaObligatoria(matId,materiaId)){
        const buttonList=document.getElementsByClassName(matId);
        for(const btn of buttonList){
          if( ! btn.classList.contains("noDisponible")){                  
            let estActual=estados.find(m=>btn.classList.contains(m));
            btn.classList.remove(estActual);
            btn.classList.add("noDisponible");  
            materiasAprobadasMap.delete(matId); 
            actualizarNoDisponible(matId);
          }
        }
      //Si materiaId esta en las opcionales        
      }else{
        //reevaluar (si tiene creditos como previa asumir que no llega)
        let mat=materiasMap.get(matId);
        if(mat.creditosPorArea.size==0){//matId no es un objeto
          if(! disponible(matId)){
            const buttonList=document.getElementsByClassName(matId);
            for(const btn of buttonList){
              if( ! btn.classList.contains("noDisponible")){                  
                let estActual=estados.find(m=>btn.classList.contains(m));
                btn.classList.remove(estActual);
                btn.classList.add("noDisponible");  
                materiasAprobadasMap.delete(matId); 
                actualizarNoDisponible(matId);
              }
            }
          }
        }else{
          //marcar como no disponible
          const buttonList=document.getElementsByClassName(matId);
          for(const btn of buttonList){
            if( ! btn.classList.contains("noDisponible")){                  
              let estActual=estados.find(m=>btn.classList.contains(m));
              btn.classList.remove(estActual);
              btn.classList.add("noDisponible");  
              materiasAprobadasMap.delete(matId); 
              actualizarNoDisponible(matId);
            }
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
    sumaCreditosSimultaneo();
  });

}


//Suma los creditos de las materias exoneradas, tiene en cuenta que suman en diferentes lugares
function sumaCreditosSimultaneo(){ 

  //este metodo suma los creditos q le aparecen a la derecha cuando esta impreso
  let aprobadas=document.getElementsByClassName("examenAprobado");
  let sum=0;
  //resetea contador de creditos visible
  for(const grp of setTodosGruposYSub){
    document.getElementById(grp).dataset.creditos="0";
  }
  //suma en el contador de creditos invisible (data-creditos), de los subgrupos y del total global
  for(const apr of aprobadas){
    let creditos=Number(apr.dataset.creditos);
    sum=sum+creditos;
    let subgrupo=apr.classList[1];
    let creditosSubgrupoHtml=document.getElementById("creditos"+subgrupo);
    let credActualSub=Number(creditosSubgrupoHtml.dataset.creditos);
    let sumSub=credActualSub+creditos;
    creditosSubgrupoHtml.dataset.creditos=sumSub;
    //creditosSubgrupoHtml.innerText="Creditos: " + sumSub ;
  }
  //esto recorre todos los grupos y subgrupos y actualiza el contador de creditos visible
  for(const grp of setTodosGruposYSub){
    let aux=document.getElementById(grp);
    aux.innerText="Creditos: " +aux.dataset.creditos;
  }
  for(const subgrp of setSub){
    let subHtml=document.getElementById(subgrp);
    let creditosSub=Number(subHtml.dataset.creditos);
    let groupHtml=document.getElementById(mapSubAGrupo.get(subgrp));
    let creditosGroup=Number(groupHtml.dataset.creditos);
    groupHtml.dataset.creditos=creditosGroup+creditosSub;
  }
  let creditosGlobalHtml=document.getElementById("creditosGlobal");
  // creditosGlobalHtml.innerText = "Creditos:" + sum;
  creditosGlobalHtml.dataset.creditos = sum;
  
  //esto recorre todos los grupos y subgrupos y actualiza el contador de creditos visible
  for(const grp of setTodosGruposYSub){
    let aux=document.getElementById(grp);
    aux.innerText="Creditos: " +aux.dataset.creditos;
  }

  //Reviso si se alcanzan los minimos
  minimosAlcazadosSub();
  

}

function alcanzaMinimo(sub){
  let subhtml=document.getElementById(sub+"grupo");
  let creditosSubgrupoHtml=document.getElementById(sub)
  let minimo=creditosSubgrupoHtml.dataset.mincreditos;
  let creditosActual=Number(creditosSubgrupoHtml.dataset.creditos)
  if(creditosActual>=minimo){
    if(subhtml && subhtml.classList.contains("lista-materias")){
      subhtml.classList.remove("lista-materias");
      subhtml.classList.add("lista-materias-aprobadas")   
    }
  }else{
    if(subhtml && subhtml.classList.contains("lista-materias-aprobadas")){
      subhtml.classList.add("lista-materias");
      subhtml.classList.remove("lista-materias-aprobadas")
    }
  }
}

function minimosAlcazadosSub(){
  setSub.forEach(sub=>{
  let subhtml=document.getElementById(sub+"grupo");
  let creditosSubgrupoHtml=document.getElementById(sub)
  let minimo=creditosSubgrupoHtml.dataset.mincreditos;
  let creditosActual=Number(creditosSubgrupoHtml.dataset.creditos)
  if(creditosActual>=minimo){
    if(subhtml && subhtml.classList.contains("lista-materias")){
      subhtml.classList.remove("lista-materias");
      subhtml.classList.add("lista-materias-aprobadas")   
    }
  }else{
    if(subhtml && subhtml.classList.contains("lista-materias-aprobadas")){
      subhtml.classList.add("lista-materias");
      subhtml.classList.remove("lista-materias-aprobadas")
    }
  }
  })
  minimosAlcanzadosGrupo();
  minimoAlcanzadoGlobal();
}

function todosLosElementosLlegaronAlMinimo(setElementos){
  setElementos.forEach(Elem=>{
    let creditosElemhtml=document.getElementById(Elem);
    let minimo=Number(creditosElemhtml.dataset.mincreditos);
    let creditosActual= Number(creditosElemhtml.dataset.creditos);
    if(creditosActual>=minimo){
      return true;
    }else{
      return false;
    }
  })
}

function minimosAlcanzadosGrupo(){
  setGrupos.forEach(grp=>{
    let grupohtml=document.getElementById(grp+"grupo");
    let creditosgrphtml=document.getElementById(grp);
    let minimo=Number(creditosgrphtml.dataset.mincreditos);
    let creditosActual= Number(creditosgrphtml.dataset.creditos);
    if(creditosActual>=minimo && grupohtml.classList.contains("grupo")){
      grupohtml.classList.add("grupo-aprobado");
      grupohtml.classList.remove("grupo");     
    }else if(creditosActual<=minimo && grupohtml.classList.contains("grupo-aprobado")){
      grupohtml.classList.remove("grupo-aprobado");
      grupohtml.classList.add("grupo");     
    }
  })
}

function minimoAlcanzadoGlobal(){
  let globalHtml=document.getElementById("creditosGlobalgrupo");
  let creditosGlobalHtml=document.getElementById("creditosGlobal");
  let creditosActual=Number(creditosGlobalHtml.dataset.creditos);
  if(creditosActual>=450 && globalHtml.classList.contains("marco-superior")){
    if(todosLosElementosLlegaronAlMinimo(setGrupos)){
      globalHtml.classList.remove("marco-superior");
      globalHtml.classList.add("marco-superior-aprobado");
    }
  }else if(creditosActual<=450 && globalHtml.classList.contains("marco-superior-aprobado")){
    globalHtml.classList.add("marco-superior");
    globalHtml.classList.remove("marco-superior-aprobado");
  }       
}

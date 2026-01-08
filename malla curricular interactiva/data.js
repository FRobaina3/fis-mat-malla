const estados=["disponible" , "cursoAprobado", "examenAprobado"];
const materiasMap= new Map();
const totalCreditosMap= new Map();

//Ciencias Basicas
const matematicas=[
    //Matematica

    //estas previas son para dar el curso (no el examen)
    {id:"CDIV", //1061
    nombre:"Calculo DIV",
    creditos:13,
    previasExamen:[],
    previasCurso:[]
    },
    {id:"CDIVV", //1062
    nombre:"Calculo DIVV",
    creditos:13,
    previasExamen:[],
    previasCurso:["CDIV"]
    },  
    {id:"CV", //1063
    nombre:"Calculo Vectorial",
    creditos:10,
    previasExamen:["GAL1"],
    previasCurso:["CDIVV"]
    }, 
    {id:"GAL1", //1030 1071
    nombre:"Geometria y Algebra Lineal 1",
    creditos:9,
    previasExamen:[],
    previasCurso:[]
    }, 
    {id:"GAL2", //1031 1058 
    nombre:"Geometria y Algebra Lineal 2",
    creditos:9,
    previasExamen:[],
    previasCurso:["GAL1"]
    }, 
    {id:"AALI", //1872
    nombre:"Aplicaciones del Algebra Lineal",
    creditos:9,
    previasExamen:["GAL2","CDIV"],
    previasCurso:[]
    }, 
    {id:"PyE", //1025
    nombre:"Probabilidad y Estadistica",
    creditos:10,
    previasExamen:["CDIV"],
    previasCurso:["CDIVV", "GAL1"]
    }, 
    {id:"MD1", //1023
    nombre:"Matematica Discreta 1",
    creditos:9,
    previasExamen:[],
    previasCurso:[]
    }, 
    {id:"MD2", //1026
    nombre:"Matematica Discreta 2",
    creditos:9,
    previasExamen:["GAL1"],
    previasCurso:["MD1"]
    },
    {id:"EcDif", //1064
    nombre:"Int. a las Ecuaciones Diferenciales",
    creditos:10,
    previasExamen:["GAL1"],
    previasCurso:["CDIVV"]
    },
    {id:"FVC", //1066
    nombre:"Funciones de Variable Compleja",
    creditos:5,
    previasExamen:["CDIVV"],
    previasCurso:["CV"]
    },
    {id:"Logica", //1027
    nombre:"Logica",
    creditos:12,
    previasExamen:[],
    previasCurso:["MD1"]
    },
    {id:"TyAR", //1886
    nombre:"Topologia y Analisis Real",
    creditos:10,
    previasExamen:["CDIV", "GAL2"],
    previasCurso:["CDIVV", "EcDif"]
    },




    {id:"seys", //1457
    nombre:"Señales y Sistemas",
    creditos:4,
    previasExamen:["GAL2","CDIV" ,"CDIVV", "GAL1", "F3", "FExp1", "F1"],  //previas de materias todavia no ingresadas
    previasCurso:["ElecMag", "TeoriaDeCircuitos", "EcDif"] //previas de materias todavia no ingresadas
    }
    // {id:"",
    // nombre:"",
    // creditos:,
    // previasExamen:[],
    // previasCurso:[]
    // },
]

const fisica=[
    {id:"F1", //1151
    nombre:"Fiscia 1",
    creditos:10,
    previasExamen:[],
    previasCurso:[]
    },
    {id:"F2", //1152
    nombre:"Fisica 2",
    creditos:10,
    previasExamen:[],
    previasCurso:["CDIV","F1"]
    }, 
    {id:"F3", //1153
    nombre:"Fisica 3",
    creditos:10,
    previasExamen:[],
    previasCurso:["CDIV"]
    },    
    {id:"FExp1", //1154
    nombre:"Fisica Experimental 1",
    creditos:5,
    previasExamen:["F1"],
    previasCurso:["F2"]
    },    
    {id:"FExp2", //1155
    nombre:"Fisica Experimental 2",
    creditos:5,
    previasExamen:["FExp1"],
    previasCurso:["F3"]
    },  
    {id:"ElecMag", //1128
    nombre:"Electromagnetismo",
    creditos:10,
    previasExamen:["GAL1","CDIVV","GAL2","F1"],
    previasCurso:["CV"]
    }, 

    //============================
    //  PROBLEMAS CON LAS PREVIAS EN FISICA TERMICA, MECANICA NEWTONIANAN Y MECANICA DE LOS FLUIDOS
    //============================
    {id:"FisTer", //1123
    nombre:"Fisica Termica",
    creditos:10,
    previasExamen:["CDIV","F1"],
    previasCurso:["F2","F3"]  //ACA ES FISICA 2 O FISICA 3, NO TIENE POR QUE APROBAR LOS DOS CURSOS
    },
    {id:"MecNew", //1122
    nombre:"Mecanica Newtonianan",
    creditos:10,
    previasExamen:["GAL1","CDIV","F1"],
    previasCurso:["F2","F3","CDIVV"] //ACA TAMBIEN ES FISICA 2 O FISICA 3
    },
    {id:"MecFl", //1226
    nombre:"Mecanica de lso Fluidos",
    creditos:12,
    previasExamen:["GAL1"],
    previasCurso:["EcDif"] //FALTA ELEMENTOS DE MECANICA DE LOS FLUIDOS PERO NO PARECE COMO OPCION EN BEDELIAS
    },     
    {id:"POM", //1257
    nombre:"Propiedades Opticas de los Materiales",
    creditos:15,
    previasExamen:["ElecMag",],//ES ELECTROMAGNETISMO O VIBRAICIONES Y ONDAS. ADEMAS NECESITA TENER CANTIDAD DE CREDITOS EN CIERTAS AREAS
    previasCurso:[]
    }, 
    {id:"ProCuIn", //1158
    nombre:"Procesamiento Cunatico de la Informacion",
    creditos:10,
    previasExamen:["CDIVV", "PyE", "GAL2"],
    previasCurso:[]
    }, 
    {id:"Opt", //1129
    nombre:"Optica",
    creditos:10,
    previasExamen:["CV", "F3", "ElecMag"], //aca es F3 o electromagnetismo
    previasCurso:[]
    }, 
    {id:"VyO", //1144
    nombre:"Vibraciones y Ondas",
    creditos:10,
    previasExamen:["CDIVV","GAL1"], 
    previasCurso:["MecNew"]
    }, 
    {id:"FisMod", //1131 o 1159
    nombre:"Int. a la fisica moderna",
    creditos:10,
    previasExamen:["F3"],
    previasCurso:[]
    },
    // {id:"",
    // nombre:"",
    // creditos:,
    // previasExamen:[],
    // previasCurso:[]
    // },    

    // {id:"CV", //1063
    // nombre:"Calculo Vectorial",
    // creditos:10,
    // previasExamen:["GAL1"],
    // previasCurso:["CDIVV"]
    // },     
]

matematicas.forEach(mat=>{materiasMap.set(mat.id, mat)});
fisica.forEach(mat=>{materiasMap.set(mat.id, mat)});
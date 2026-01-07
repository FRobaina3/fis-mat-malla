const estados=["disponible" , "cursoAprobado", "examenAprobado"];


//Ciencias Basicas
const matematicas=[
    //Matematica

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
    {id:"", //1886
    nombre:"Topologia y Analisis Real",
    creditos:10,
    previasExamen:["CDIV", "GAL2"],
    previasCurso:["CDIVV", "EcDif"]
    },




    {id:"", //1457
    nombre:"Señales y Sistemas",
    creditos:4,
    previasExamen:["GAL2","CDIV" ,"CDIVV", "GAL1", "Fisica3", "FisExperimental1", "Fisica1"],  //previas de materias todavia no ingresadas
    previasCurso:["ElectroMagnetismo", "TeoriaDeCircuitos", "EcDif"] //previas de materias todavia no ingresadas
    }
    // {id:"",
    // nombre:"",
    // creditos:,
    // previasExamen:[],
    // previasCurso:[]
    // },
]

const fisica=[
    {id:"F1",
    nombre:"Fiscia 1",
    creditos:10,
    previasExamen:[],
    previasCurso:[]
    },
    {id:"CV", //1063
    nombre:"Calculo Vectorial",
    creditos:10,
    previasExamen:["GAL1"],
    previasCurso:["CDIVV"]
    },     
]

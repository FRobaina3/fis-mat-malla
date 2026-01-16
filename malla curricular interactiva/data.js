const estados=["disponible" , "cursoAprobado", "examenAprobado"];
const materiasMap= new Map();
const totalCreditosMap= new Map();

//Las previas son para tomar el curso, no para tomar el examen.
// Hay algunas materia que tienen la condicion no debe tener aprobadas:... estas condiciones no estan tenidas en cuenta
//Solo estan las materias que fueron dictadas en 2025, si no fueron dictadas o no tenian paguina del eva probablemente no las agregue
//El comentario al lado del curso es su codigo de bedelias
//el valor condicionesPrevias es un conjunto de opciones, para habilitar la materia se tiene q cumplir al menos una de estas opciones
//previaCurso es la lista de cursos que hay que tener aprobados para poder cursar
//previasExamen es la lista de examenes que hay que tener aprobados para poder cursar

//==============================
//  FALTA CONTROLAR LOS CREDITOS
//===============================
const matematicas=[
    //estas previas son para dar el curso (no el examen)
    {id:"CDIV", //1061
    nombre:"Calculo DIV",
    creditos:13,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"CDIVV", //1062
    nombre:"Calculo DIVV",
    creditos:13,
    previasExamen:[],
    previasCurso:["CDIV"],
    creditosPorArea: new Map()
    },  
    {id:"CV", //1063
    nombre:"Calculo Vectorial",
    creditos:10,
    previasExamen:["GAL1"],
    previasCurso:["CDIVV"],
    creditosPorArea: new Map()
    }, 
    {id:"GAL1", //1030 1071
    nombre:"Geometria y Algebra Lineal 1",
    creditos:9,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"GAL2", //1031 1058 
    nombre:"Geometria y Algebra Lineal 2",
    creditos:9,
    previasExamen:[],
    previasCurso:["GAL1"],
    creditosPorArea: new Map()
    }, 
    {id:"AALI", //1872
    nombre:"Aplicaciones del Algebra Lineal",
    creditos:9,
    previasExamen:["GAL2","CDIV"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"PyE", //1025
    nombre:"Probabilidad y Estadistica",
    creditos:10,
    previasExamen:["CDIV"],
    previasCurso:["CDIVV", "GAL1"],
    creditosPorArea: new Map()
    }, 
    {id:"MD1", //1023
    nombre:"Matematica Discreta 1",
    creditos:9,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"MD2", //1026
    nombre:"Matematica Discreta 2",
    creditos:9,
    previasExamen:["GAL1"],
    previasCurso:["MD1"],
    creditosPorArea: new Map()
    },
    {id:"EcDif", //1064
    nombre:"Int. a las Ecuaciones Diferenciales",
    creditos:10,
    previasExamen:["GAL1"],
    previasCurso:["CDIVV"],
    creditosPorArea: new Map()
    },
    {id:"FVC", //1066
    nombre:"Funciones de Variable Compleja",
    creditos:5,
    previasExamen:["CDIVV"],
    previasCurso:["CV"],
    creditosPorArea: new Map()
    },
    {id:"Logica", //1027
    nombre:"Logica",
    creditos:12,
    previasExamen:[],
    previasCurso:["MD1"],
    creditosPorArea: new Map()
    },
    {id:"TyAR", //1886
    nombre:"Topologia y Analisis Real",
    creditos:10,
    previasExamen:["CDIV", "GAL2"],
    previasCurso:["CDIVV", "EcDif"],
    creditosPorArea: new Map()
    },
    {id:"seys", //1457
    nombre:"Señales y Sistemas",
    creditos:4,
    previasExamen:["GAL2","CDIV" ,"CDIVV", "GAL1", "F3", "FExp1", "F1"],
    previasCurso:["ElecMag", "teocirc", "EcDif"], 
    creditosPorArea: new Map([["creditosfisica",45], ["creditosmatematicas",50]])
    }

]

const fisica=[
    // {id:"test", 
    // nombre:"prueba del set",
    // creditos:10,
    // previasExamen:[new Set("F1","CDIV")],
    // previasCurso:[],
    // creditosPorArea: new Map()
    // },
    {id:"F1", //1151
    nombre:"Fisica 1",
    creditos:10,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"F2", //1152
    nombre:"Fisica 2",
    creditos:10,
    previasExamen:[],
    previasCurso:["CDIV","F1"],
    creditosPorArea: new Map()
    }, 
    {id:"F3", //1153
    nombre:"Fisica 3",
    creditos:10,
    previasExamen:[],
    previasCurso:["CDIV"],
    creditosPorArea: new Map()
    },    
    {id:"FExp1", //1154
    nombre:"Fisica Experimental 1",
    creditos:5,
    previasExamen:["F1"],
    previasCurso:["F2"],
    creditosPorArea: new Map()
    },    
    {id:"FExp2", //1155
    nombre:"Fisica Experimental 2",
    creditos:5,
    previasExamen:["FExp1"],
    previasCurso:["F3"],
    creditosPorArea: new Map()
    },  
    {id:"ElecMag", //1128
    nombre:"Electromagnetismo",
    creditos:10,
    previasExamen:["GAL1","CDIVV","GAL2","F1"],
    previasCurso:["CV"],
    creditosPorArea: new Map()
    }, 

    //============================
    //  PROBLEMAS CON ALGUNAS PREVIAS
    //============================
    {id:"FisTer", //1123
    nombre:"Fisica Termica",
    creditos:10,
    previasExamen:["CDIV","F1"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:["F2"],
        },
        cond2:{
            previasExamen:[],
            previasCurso:["F3"],
        }
    },
    creditosPorArea: new Map()
    },
    {id:"MecNew", //1122
    nombre:"Mecanica Newtoniana",
    creditos:10,
    previasExamen:["GAL1","CDIV","F1"],
    previasCurso:["CDIVV"],
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:["F2"],
        },
        cond2:{
            previasExamen:[],
            previasCurso:["F3"],
        }
    },
    creditosPorArea: new Map()
    },
    {id:"MecFl", //1226
    nombre:"Mecanica de los Fluidos",
    creditos:12,
    previasExamen:["GAL1"],
    previasCurso:["EcDif","EMF"],
    creditosPorArea: new Map() 
    },     
    {id:"POM", //1257
    nombre:"Propiedades Opticas de los Materiales",
    creditos:15,
    previasExamen:[],
    previasCurso:["EcDif"],
    condicionesPrevias:{
        cond1:{
            previasExamen:["ElecMag"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["VyO"],
            previasCurso:[],
        }
    },
    creditosPorArea: new Map([["creditosfisica",60], ["creditosmatematicas", 60]]) //TODAVIA NO CONTROLO CREDITOS
    }, 
    {id:"ProCuIn", //1158
    nombre:"Procesamiento Cuantico de la Informacion",
    creditos:10,
    previasExamen:["CDIVV", "PyE", "GAL2"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"Opt", //1129
    nombre:"Optica",
    creditos:10,
    previasExamen:["CV"], 
    previasCurso:[],
        condicionesPrevias:{
        cond1:{
            previasExamen:["F3"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["ElecMag"],
            previasCurso:[],
        }
    },
    creditosPorArea: new Map()
    }, 
    {id:"FisMod", //1131 o 1159
    nombre:"Int. a la fisica moderna",
    creditos:10,
    previasExamen:["F3"],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"VyO", //1144
    nombre:"Vibraciones y Ondas",
    creditos:10,
    previasExamen:["CDIVV","GAL1", ], 
    previasCurso:["MecNew"],
    condicionesPrevias:{
        cond1:{
            previasExamen:["F2"],
            previasCurso:["F3"],
        },
        cond2:{
            previasExamen:["F3"],
            previasCurso:[],            
        }
    },
    creditosPorArea: new Map()
    }, 
    // {id:"",
    // nombre:"",
    // creditos:,
    // previasExamen:[],
    // previasCurso:[],
    // creditosPorArea: new Map()
    // },      
]

const quimica=[
    {id:"MetFis",//1719
    nombre:"Metalurgia Fisica",
    creditos:12,
    previasExamen:["F2", "GAL2","CDIVV"],
    previasCurso:["ICienMat"],
    creditosPorArea: new Map()
    },   
    {id:"ICienMat", //1723
    nombre:"Int. a la Ciencia de los Materiales",
    creditos:12,
    previasExamen:["F1", "GAL1","CDIV"],
    previasCurso:["F2"],
    creditosPorArea: new Map([["creditosGlobal",60]])
    },  
    {id:"PQuimGen", //1620
    nombre:"Principios de Quimica General",
    creditos:8,
    previasExamen:[], 
    previasCurso:[],
    creditosPorArea: new Map()
    }     
]

const computacionCientifica=[
    {id:"MetNum",//2041
    nombre:"Metodos Numericos",
    creditos:10,
    previasExamen:["CDIV","CDIVV","P1","GAL2"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"SimSEE",//5517
    nombre:"Simulacion de Sist. de Energia Electrica ",
    creditos:8,
    previasExamen:["teocirc"],
    previasCurso:[],
    creditosPorArea: new Map([["creditosModeladoFiscoMatematico",20], ["creditosCienciasBasicas",140], ["creditosComputacionCientifica",35]])
    },
    {id:"P1", //1373
    nombre:"Programacion 1",
    creditos:10,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"P2", //1321
    nombre:"Programacion 2",
    creditos:12,
    previasExamen:[],
    previasCurso:["P1"],
    creditosPorArea: new Map()
    }, 
    {id:"P3", //1323
    nombre:"Programacion 3",
    creditos:15,
    previasExamen:["P1","MD1"],
    previasCurso:["P2"],
    creditosPorArea: new Map()
    }, 
    {id:"P4", //1324
    nombre:"Programacion 4",
    creditos:15,
    previasExamen:["P2","CDIV","GAL1"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["MD1"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["Logica"],
            previasCurso:[],           
        }
    },
    creditosPorArea: new Map()
    }, 
    //CREO QUE NO EXISTE
    // {id:"MNEPDE",
    // nombre:"Met. Num. para Ecu. en DPE ", // METODOS NUMERICOS PARA ECUACIONES EN DERIVADAS PARCIALES ESTACIONARIAS
    // creditos:,
    // previasExamen:[],
    // previasCurso:[],
    // condicionesPrevias:{
    //     cond1:{
    //         previasExamen:[],
    //         previasCurso:[],
    //     }
    // },
    // creditosPorArea: new Map()
    // }, 

    {id:"IntME", //475
    nombre:"Int. a los Metodos Estadisticos",
    creditos:10,
    previasExamen:["PyE", "P1"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    
    {id:"MCACE", //2380
    nombre:"Met. Comp. Apl. Calculo Estructural",
    creditos:10,
    previasExamen:["P1","Elas","ResMat1","ResMat2"], 
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"ALN", //5914
    nombre:"Algebra Lineal Numerica",
    creditos:9,
    previasExamen:["MetNum", "P2"],
    previasCurso:[],
    creditosPorArea: new Map([["creditosfisica",50]])
    }, 
    {id:"ElemFini", //1884
    nombre:"Elementos Finitos",
    creditos:8,
    previasExamen:["GAL2","CDIVV", "MetNum", "P1", "CV", "CDIV", "F2", "F1"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"FuO", //1871
    nombre:"Fundamentos de Optimizacion",
    creditos:6,
    previasExamen:["CDIVV","GAL2"],
    previasCurso:["P1"],
    creditosPorArea: new Map()
    }, 
    {id:"IIO", //1650 o 1610
    nombre:"Int. Investigacion de Operaciones",
    creditos:10,
    previasExamen:["CDIV","CDIVV","GAL1", "GAL2", "PyE"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"IOGR", //1779
    nombre:"Inv. de Operacion y Gest. de riesgos",
    creditos:6,
    previasExamen:["IIO"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"ModOpt", //1624
    nombre:"Modelado y Optimizacion",
    creditos:6,
    previasExamen:["IIO"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"ModE", //1868
    nombre:"Modelos Estadisticos para la Regresion y Clasificaion",
    creditos:6,
    previasExamen:["PyE","GAL2", "CDIVV"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"COA", //1640
    nombre:"Optimizacion Continua y Aplicaciones",
    creditos:10,
    previasExamen:["IIO"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"eventos-disc", //1617
    nombre:"Simulacion a Eventos Discretos",
    creditos:10,
    previasExamen:["IIO","PyE","P1"],
    previasCurso:[],
    creditosPorArea: new Map([["creditosGlobal",220]])
    }, 
 
]

const modeladoFisicoMatematico=[
    //FALTAN MATERIAS DE QUIMICA 
    {id:"ResMat1",//2368
    nombre:"Resistencia de Materiales 1 ",
    creditos:10,
    previasExamen:["CDIVV"],
    previasCurso:["GAL2", "MecNew"],
    creditosPorArea: new Map()
    }, 
    {id:"Elas", //2366
    nombre:"Elasticidad",
    creditos:10,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["CV"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["CV","MecNew"],
            previasCurso:["CompMM1"],
        },
        cond3:{
            previasExamen:["CV"],
            previasCurso:["ResMat1"],
        },
        cond4:{
            previasExamen:[],
            previasCurso:["ResMat1", "CompMM1"],
        },
        cond5:{
            previasExamen:["CV"],
            previasCurso:["CompMM1"], 
        },
        cond6:{
            previasExamen:["MecNew"],
            previasCurso:["CompMM1"],
        },
        cond7:{
            previasExamen:["MecNew","CV"],
            previasCurso:[],
        },       
        cond8:{
            previasExamen:["MecNew"],
            previasCurso:[],
        },       
        cond9:{
            previasExamen:["MecNew"],
            previasCurso:["ResMat1"], 
        },        

    }, 
    creditosPorArea: new Map()
    }, 
    {id:"TC1",//1823
    nombre:"Transferencia de Calor 1",
    creditos:10,
    previasExamen:["FisTer"],
    previasCurso:["EMF"], 
    creditosPorArea: new Map()
    }, 
    {id:"EMF", //1805
    nombre:"Elementos de Mecanica de los Fluidos",
    creditos:14,
    previasExamen:["MecNew", "CV"],
    previasCurso:[],
    creditosPorArea: new Map()
    }, 
    {id:"SAM",//1460
    nombre:"Señales Aleatorias y Modulacion",
    creditos:8,
    previasExamen:["PyE", "teocirc"],
    previasCurso:["seys"], 
    creditosPorArea: new Map([["creditosfisica",40],["creditosmatematicas",59]])
    }, 
    {id:"seys", //1457
    nombre:"Señales y Sistemas",
    creditos:7,
    previasExamen:["GAL2","CDIV" ,"CDIVV", "GAL1", "F3", "FExp1", "F1"],
    previasCurso:["ElecMag", "teocirc", "EcDif"], 
    creditosPorArea: new Map()
    },
    {id:"teocirc", //1456
    nombre:"Teoria de circuitos",
    creditos:8,
    previasExamen:["CDIVV","F1","CDIV","GAL1"],
    previasCurso:["F3"],
    creditosPorArea: new Map([["creditosfisica",15]])
    }, 
    {id:"CompMM1",//1764
    nombre:"Comporatamiento Mecanico de los Materiales 1",
    creditos:13,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map([["creditosfisica", 25], ["creditosmatematicas",30]])
    }, 
]
const actividadesComplementarias=[
    {id:"TBEO", //1275
    nombre:"Taller basico de Estrategias y Orientacion",
    creditos:3,
    previasExamen:[], //No existe en el sistema de previas
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"SemInv",//2907
    nombre:"Seminario de iniciacion a la investigacion",
    creditos:4,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map([["creditosGlobal",250]])
    },

    //hay 3, Tutorias entre pares 1, tutoria entre pares 2, tutoria entre pares academicas progresa/fing
    //pero solo hay una paguina del eva

    {id:"TEP",//5005
    nombre:" Tutoria entre pares PROGRESA/FING",
    creditos:8,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["CDIV"],
            previasCurso:["CDIVV"],
        },
        cond2:{
            previasExamen:["F1"],
            previasCurso:[],          
        },
        cond3:{
            previasExamen:["GAL1"],
            previasCurso:["GAL2"],          
        }
    },
    creditosPorArea: new Map([["creditosGlobal",55]])
    },
    {id:"IIProd", //2416
    nombre:"Int. Ing. en Produccion",
    creditos:3,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"TIIElec",//5904
    nombre:"Taller intro. Ing. Electrica",
    creditos:6,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"TRepComGrafB", //1269
    nombre:"Taller Representacion y Comunicacion  Graf. mod. B",
    creditos:4,
    previasExamen:[],
    previasCurso:["TRepComGrafA"],
    creditosPorArea: new Map()
    },

]

const ingenieriaYSociedad=[
    {id:"AGPI", //1944
    nombre:"Admin. general para Ing.",
    creditos:5,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map([["creditosGlobal", 140]])
    },
    {id:"PAI",//1945
    nombre:"Practica Admin. para Ing.",
    creditos:5,
    previasExamen:[],
    previasCurso:["AGPI"],//1944
    creditosPorArea: new Map()
    },
    {id:"Eco", //1224
    nombre:"Economia",
    creditos:7,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"CTS",//1223
    nombre:"Ciencia, Tecnologia y Sociedad",
    creditos:8,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"ContC",//1510
    nombre:"Control de Calidad",
    creditos:8,
    previasExamen:[],
    previasCurso:["PyE"],
    creditosPorArea: new Map([["creditosGlobal",80]])
    },
    {id:"SemAT",//1236
    nombre:"Seminario encuentro arte y tecno.",
    creditos:4,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map([["creditosGlobal",90]])
    },
]
const areaDeFormacionTecnologica=[
    {id:"RNLN",//1887
    nombre:"Redes Neuronales para Lenguaje Natural",
    creditos:10,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"HE1", //2382
    nombre:"Hormigon Estructural 1",
    creditos:11,
    previasExamen:["ResMat1"],
    previasCurso:["Elas","ResMat2"], 
    creditosPorArea: new Map([["creditosquimica",5], ["creditosComputacionCientifica",30]]) //computacionCientifica no si lo agregue
    },
    {id:"IMP", //1513
    nombre:"Intro. a los Microprocesadores",
    creditos:11,
    previasExamen:["P1"],
    previasCurso:["DisLog"], 
    creditosPorArea: new Map()
    },
    {id:"CompMM2", //1765
    nombre:"Comportamiento Mecanico de Materiales 2",
    creditos:13,
    previasExamen:[],
    previasCurso:["CompMM1","ICienMat"],
    creditosPorArea: new Map([["creditosfisica",30], ["creditosmatematicas",40]])
    },
    {id:"FuAA",//5852
    nombre:"Fund. aprendizaje automatico[5852]",
    creditos:8,
    previasExamen:["P1","PyE"],
    previasCurso:["seys"],
    creditosPorArea: new Map([["creditosmatematicas",50]])
    },
    {id:"DisLog",//2512 o 1512
    nombre:"Diseño Logico",
    creditos:12,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"CD",//1462
    nombre:"Comunicaiones digitales",
    creditos:11,
    previasExamen:["seys","ElecMag","teocirc","P1"],
    previasCurso:["SAM"],
    creditosPorArea: new Map([["creditosmatematicas",70]])
    },
    {id:"redesopt",//5907
    nombre:"Redes Opticas",
    creditos:10,
    previasExamen:["SAM","RedDat"], 
    previasCurso:["CD"],
    creditosPorArea: new Map()
    },
    {id:"InsInd", //2706
    nombre:"Instrumentacion Industrial",
    creditos:8,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["EMF","FisTer","Electro1"],
            previasCurso:["CompMM1"],
        },
        cond2:{
            previasExamen:["teocirc"],
            previasCurso:["seys","SyC"], 
        }
    },
    creditosPorArea: new Map()
    },
    {id:"Puent",//2359
    nombre:"Puentes",
    creditos:10,
    previasExamen:["HE1","ResMat2"],
    previasCurso:["HE2"],
    creditosPorArea: new Map()
    },
    {id:"HE2", //2395
    nombre:"Hormigo estructural 2",
    creditos:10,
    previasExamen:[],
    previasCurso:["ResMat2","HE1"],
    creditosPorArea: new Map()
    },
    {id:"HE3", //2419
    nombre:"Hormigon estructural 3",
    creditos:12,
    previasExamen:["HE1"],
    previasCurso:["HE2"],
    creditosPorArea: new Map()
    },
    {id:"TC2",//1824
    nombre:"Transferencia de Calor 2",
    creditos:10,
    previasExamen:[],
    previasCurso:["TC1"],
    creditosPorArea: new Map()
    },
    {id:"EA2",//5717
    nombre:"Electronica Avanzada 2",
    creditos:8,
    previasExamen:["ElecMag", "teocirc","ElecFund"], 
    previasCurso:["EA1","seys","SyC"], 
    creditosPorArea: new Map()
    },
    {id:"EPST",//5849
    nombre:"Estimación y Predicción en Series Temporales",
    creditos:10,
    previasExamen:["seys"],
    previasCurso:["SAM"],
    creditosPorArea: new Map()
    },
    {id:"MedEl",//1461
    nombre:"Medidas Electricas",
    creditos:10,
    previasExamen:["DisLog","teocirc"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:["SAM"],
        },
        cond2:{
            previasExamen:["seys"],
            previasCurso:[],            
        }
    },
    creditosPorArea: new Map()
    },
    {id:"MF1",//1856
    nombre:"Maquinas para Fluidos 1",
    creditos:12,
    previasExamen:["FisTer","EMF"],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"MF2",//1859
    nombre:"Maquinas para Fluidos 2",
    creditos:12,
    previasExamen:["FisTer","MecFl"],
    previasCurso:["MF1"],
    creditosPorArea: new Map()
    },
    {id:"PDSA",//5839
    nombre:"Procesamiento digital de señales de audio",
    creditos:8,
    previasExamen:["P1","seys"],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"ArqComp", //1466
    nombre:"Arquitecura de Computadoras",
    creditos:10,
    previasExamen:["P1"],
    previasCurso:["P2","MD1","Logica"],
    creditosPorArea: new Map()
    },
    {id:"ICI",//2707
    nombre:"Int. al Control Industrial",
    creditos:8,
    previasExamen:["GAL2"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["teocirc","TC1"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["Electro1"],
            previasCurso:[],           
        }
    },
    creditosPorArea: new Map()
    },
    {id:"SyC",//5905
    nombre:"Sistemas y control",
    creditos:12,
    previasExamen:["teocirc"],
    previasCurso:["EcDif","FExp1","FVC","seys"],
    creditosPorArea: new Map([["creditosfisica", 45], ["creditosmatematicas",59]])
    },
    {id:"ResMat2",//1312
    nombre:"Resistencia de Materiales 2",
    creditos:10,
    previasExamen:[],
    previasCurso:["Elas","ResMat1"],
    creditosPorArea: new Map()
    },
    {id:"IIP",//Q59B
    nombre:"Int. a la Ing. de Procesos",
    creditos:5,
    previasExamen:["CDIV","F1","PQuimGen"],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"DCP", //Q94
    nombre:"Dinamica y Control de Procesos",
    creditos:10,
    previasExamen:["MetNum","IIP"],//fenomenos de transporte en ing de procesos q22
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"FluDinB",//Q66B
    nombre:"Fluidodinamica [Q66B]",
    creditos:12,
    previasExamen:["IIP","F3"],
    previasCurso:["FisTer"], //fenomenos de transporte...
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map()
    },
    {id:"CNL", //5913
    nombre:"Analisis y Control de Sistemas No Lineales",
    creditos:10,
    previasExamen:["EcDif"],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"ApAuto",//1866
    nombre:"Aprendizaje Automatico",
    creditos:12,
    previasExamen:["P4","PyE"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["Logica"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["DisLog"],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map([["creditosfisica",50], ["creditosmatematicas", 50]])
    },
    {id:"BDIng",// 1892
    nombre:"Bases de Datos para Ing.",
    creditos:10,
    previasExamen:["P2","P1"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map([["creditosmatematicas",50],["creditosfisica",50]])
    },
    {id:"EA1", //5716
    nombre:"Electronica Avanzada 1",
    creditos:10,
    previasExamen:["ElecMag","teocirc"],
    previasCurso:["ElecFund"],
    creditosPorArea: new Map([["creditosmatematicas",54], ["creditosfisica",40]])
    },
    {id:"ElecFund",//5715
    nombre:"Electronica Fundamental",
    creditos:11,
    previasExamen:["CDIVV","F1","GAL1","GAL2","CDIV","F3"],
    previasCurso:["ElecMag","FExp1","teocirc"],
    creditosPorArea: new Map([["creditosfisica",20],["creditosmatematicas",50]])
    },
    {id:"Electro",//5850
    nombre:"Electrotecnica",
    creditos:10,
    previasExamen:["F3","GAL2","GAL1","CDIVV","CDIV","F1"],
    previasCurso:["teocirc","MecNew","ElecMag"],
    creditosPorArea: new Map([["creditosfisica",35]])
    },
    {id:"Electro1",//2108
    nombre:"Electrotecnica 1",
    creditos:9,
    previasExamen:["F3"],
    previasCurso:["CDIVV"],
    creditosPorArea: new Map()
    },
    {id:"Electro2",//2109
    nombre:"Electrotecnica 2",
    creditos:9,
    previasExamen:[],
    previasCurso:["Electro1"],
    creditosPorArea: new Map()
    },
    {id:"En1-C",//1850
    nombre:"Energia 1-Combustion",
    creditos:10,
    previasExamen:["FisTer"],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"En1", //1809
    nombre:"Energia 1",
    creditos:10,
    previasExamen:["FisTer"], 
    previasCurso:["En1-C"],
    creditosPorArea: new Map()
    },
    {id:"FBD",//1911
    nombre:"Fundamentos de Bases de Datos",
    creditos:15,
    previasExamen:["P2","P1"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["DisLog"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["Logica"],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map([["creditosfisica", 50],["creditosmatematicas",50]])
    },
    {id:"FRA",//1857
    nombre:"Fundmanetos de la Robotica Autonoma",
    creditos:7,
    previasExamen:["P2","P1"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["DisLog"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["ArqComp"],
            previasCurso:[],            
        }
    },
    creditosPorArea: new Map([["creditosfisica",50],["creditosmatematicas",50]])
    },
    {id:"FRI",//1788
    nombre:"Fundmanetos de la Robotica Industrial",
    creditos:8,
    previasExamen:["MecNew","P1"],
    previasCurso:[],
    creditosPorArea: new Map([["creditosfisica",50], ["creditosmatematicas",50]])
    },
    {id:"IElec",//5507
    nombre:"Instalaciones Electricas",
    creditos:8,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["teocirc"],
            previasCurso:["Electro"],
        },
        cond2:{
            previasExamen:["Electro1"],
            previasCurso:["Electro2"],           
        }
    },
    creditosPorArea: new Map()
    },
    {id:"IntroPLN",//1828
    nombre:"Int. al procesamiento del Lenguaje Natural",
    creditos:12,
    previasExamen:["P3","TL","PyE","P4"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["DisLog"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["Logica"],
            previasCurso:[],
        },
        
    },
    creditosPorArea: new Map([["creditosmatematicas",50],["creditosfisica",50]])
    },
    {id:"RedComp",//1446
    nombre:"Redes de Computadoras",
    creditos:12,
    previasExamen:["P3"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["ArqComp"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["DisLog"],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map([["creditosmatematicas",50],["creditosfisica",50]])
    },
    {id:"RedDat",//5824
    nombre:"Redes de Datos 1",
    creditos:8,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:["DisLog"],
        },
        cond2:{
            previasExamen:["P1"],
            previasCurso:["P2"],
        },
    },
    creditosPorArea: new Map()
    },
    {id:"RedElec", //5508
    nombre:"Redes Electricas",
    creditos:10,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["Electro1"],
            previasCurso:["Electro2"],
        },
        cond2:{
            previasExamen:["teocirc"],
            previasCurso:["Electro"],
        },
    },
    creditosPorArea: new Map()
    },
    {id:"RBC",//1884
    nombre:"Robotica Basada en Comportamiento",
    creditos:15,
    previasExamen:["P2","P1"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["DisLog"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["ArqComp"],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map([["creditosmatematicas",50],["creditosfisica",50]])
    },
    {id:"SisOp", //1537
    nombre:"Sistemas Operativos x_x",
    creditos:12,
    previasExamen:["P1","P2","MD1"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["ArqComp"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["DisLog"],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map([["creditosmatematicas", 50], ["creditosfisica", 50]])
    },
    {id:"SubMT",//5514
    nombre:"Subestaciones en Media Tension",
    creditos:8,
    previasExamen:[],
    previasCurso:["RedElec","IElec"],
    condicionesPrevias:{
        cond1:{
            previasExamen:["Electro"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["Electro2"],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map()
    },
    {id:"TAA",//5720
    nombre:"Taller de Aprendizaje Automatico",
    creditos:4,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:["ApAuto"],
        },
        cond2:{
            previasExamen:["FuAA"],
            previasCurso:[],
        },
        cond3:{
            previasExamen:["FuAA"],//reconocimento de patrones 5842 en ves de FuAA
            previasCurso:[],
        },
    },
    creditosPorArea: new Map()
    },
    {id:"TAyAGL",//1633
    nombre:"Teo. Algoritmos y Aplicaciones de Gestion Logistica",
    creditos:8,
    previasExamen:[],
    previasCurso:["ModOpt"],
    creditosPorArea: new Map()
    },
    {id:"TL",//1325
    nombre:"Teoria de Lenguajes",
    creditos:12,
    previasExamen:["P3"],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["Logica"],
            previasCurso:[],
        },
        cond2:{
            previasExamen:["DisLog"],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map([["creditosfisica",50], ["creditosmatematicas",50]])
    },
    {id:"TrEE",//5520
    nombre:"Transporte de Energia Electrica",
    creditos:8,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:["teocirc"],
            previasCurso:["RedElec"],
        },
        cond2:{
            previasExamen:["Electro1"],
            previasCurso:["RedElec"],
        },
    },
    creditosPorArea: new Map()
    },

    // {id:"",
    // nombre:"",
    // creditos:,
    // previasExamen:[],
    // previasCurso:[],
    // condicionesPrevias:{
    //     cond1:{
    //         previasExamen:[],
    //         previasCurso:[],
    //     },
    // },
    // creditosPorArea: new Map()
    // },
]
const Talleres=[
    {id:"TPAudioVid",//1990
    nombre:"Taller Proces. Audio/Video con Pure Data/Gem",
    creditos:4,
    //La condicion de esta es NO TENER unos tallers. no tengo para represenar esto
    previasExamen:[],
    previasCurso:[], 
    creditosPorArea: new Map()
    },   
    {id:"FExp3", //1156
    nombre:"Fisica Experimental 3",
    creditos:6,
    previasExamen:[],
    previasCurso:["FExp1", "FExp2"],
    creditosPorArea: new Map([["creditosfisica", 55]])
    },   
    {id:"TAA", //5720
    nombre:"Taller de apredizaje automatico",
    creditos:6,
    previasExamen:[],
    previasCurso:[],
    condicionesPrevias:{
        cond1:{
            previasExamen:[],
            previasCurso:["ApAuto"],
        },
        cond1:{
            previasExamen:["FuAA"],
            previasCurso:[],
        },
    },
    creditosPorArea: new Map()
    },   
    {id:"TIngFisMat",//1889
    nombre:"Taller de ingenieria Fisico-Matematica",
    creditos:6,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map([["creditosGlobal",200]])
    },
    {id:"TIIElec",//5904
    nombre:"Taller intro. Ing. Electrica",
    creditos:4,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"TRepComGrafA", //1266
    nombre:"Taller Representacion y Comunicacion  Graf. mod. A",
    creditos:4,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map()
    },
    {id:"TallFour", //1459
    nombre:"Taller Fourier",
    creditos:8,
    previasExamen:[],
    previasCurso:["seys","teocirc","FExp1","ElecMag"],
    creditosPorArea: new Map([["creditosfisica",35],["creditosmatematicas",50]])
    },
    // {id:"",
    // nombre:"",
    // creditos:,
    // previasExamen:[],
    // previasCurso:[],
    // condicionesPrevias:{
    //     cond1:{
    //         previasExamen:[],
    //         previasCurso:[],
    //     },
    // },
    // creditosPorArea: new Map()
    // },
]
const pasantia=[
    {id:"Pasan",//18887
    nombre:"Pasantia",
    creditos:10,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map([["creditosCienciasDeLaIngenieria",20], 
                            ["creditosIngenieriaAplicada",20], ["creditosCienciasBasicas",150]])
    },  
]
const proyectoFinal=[
    {id:"Proy",//1885
    nombre:"Proyecto Final",
    creditos:35,
    previasExamen:[],
    previasCurso:[],
    creditosPorArea: new Map([["creditosGlobal",280],["creditosCienciasDeLaIngenieria", 50],
        ["creditosCienciasBasicas",170],["creditosAreaDeFormacionTecnologica",40]])
    },   
]


//Hay materias repetidas con el mismo id. en materiasMap, se guarda una unica aparicion. 
const repetidasId=new Set();
const repetidasNombre=new Set();
matematicas.forEach(mat=>agregarMapYRepetidas(mat));
fisica.forEach(mat=>agregarMapYRepetidas(mat));
quimica.forEach(mat=>agregarMapYRepetidas(mat))
computacionCientifica.forEach(mat=>{materiasMap.set(mat.id,mat)})
modeladoFisicoMatematico.forEach(mat=>agregarMapYRepetidas(mat))
actividadesComplementarias.forEach(mat=>agregarMapYRepetidas(mat))
ingenieriaYSociedad.forEach(mat=>agregarMapYRepetidas(mat))
areaDeFormacionTecnologica.forEach(mat=>agregarMapYRepetidas(mat))
Talleres.forEach(mat=>agregarMapYRepetidas(mat))
pasantia.forEach(mat=>agregarMapYRepetidas(mat))
proyectoFinal.forEach(mat=>agregarMapYRepetidas(mat))

function agregarMapYRepetidas(mat){
    if(materiasMap.has(mat.id)){
        repetidasId.add(mat.id);
        repetidasNombre.add(mat.nombre);
    }else{
        materiasMap.set(mat.id,mat)
    }
}
  let setTodosGruposYSub=new Set(["creditosGlobal","creditosCienciasBasicas","creditosmatematicas", "creditosfisica","creditosquimica","creditosbiologia"
    ,"creditosCienciasDeLaIngenieria","creditosComputacionCientifica","creditosModeladoFiscoMatematico","creditosContenidosComplementarios",
    "creditosActividadesComplementarias","creditosIngenieriaYSociedad","creditosIngenieriaAplicada", "creditosAreaDeFormacionTecnologica",
    "creditosTalleres","creditosPasantia","creditosProyectoFinal"
  ])
  let setGrupos=new Set(["creditosCienciasBasicas","creditosCienciasDeLaIngenieria",
    "creditosContenidosComplementarios","creditosIngenieriaAplicada"]);
  let setSub=new Set(["creditosmatematicas", "creditosfisica","creditosquimica","creditosbiologia",
    "creditosComputacionCientifica","creditosModeladoFiscoMatematico","creditosActividadesComplementarias",
    "creditosIngenieriaYSociedad", "creditosAreaDeFormacionTecnologica","creditosTalleres","creditosPasantia","creditosProyectoFinal"
  ])
  let mapSubAGrupo=new Map([["creditosmatematicas","creditosCienciasBasicas"],["creditosfisica","creditosCienciasBasicas"], 
    ["creditosquimica","creditosCienciasBasicas"],["creditosbiologia","creditosCienciasBasicas"],
    ["creditosComputacionCientifica","creditosCienciasDeLaIngenieria"],["creditosModeladoFiscoMatematico","creditosCienciasDeLaIngenieria"],
    ["creditosActividadesComplementarias","creditosContenidosComplementarios"], ["creditosIngenieriaYSociedad","creditosContenidosComplementarios"],
    ["creditosAreaDeFormacionTecnologica","creditosIngenieriaAplicada"],["creditosTalleres","creditosIngenieriaAplicada"],
    ["creditosPasantia","creditosIngenieriaAplicada"],["creditosProyectoFinal","creditosIngenieriaAplicada"]
  ]);

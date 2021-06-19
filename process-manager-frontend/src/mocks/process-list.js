export default allProcessesMock = [
    {
        "id": 1,
        "name": "Processo 1",
        "description": "Processo de teste 1, status Criado",
        "status": "Criado",
        "expectedReportDate": "30/06/2021 12:00",
        "users": [],
        "reports": [],
        "createdBy": {
            "id": 2,
            "cpf": "21745651020",
            "name": "Maria da Silva",
            "profile": {
                "id": 2,
                "description": "Triagem"
            }
        }
    },
    {
        "id": 2,
        "name": "Processo 2",
        "description": "Processo de teste 2, status Rodando",
        "status": "Executando Processo",
        "expectedReportDate": "30/06/2021 09:00",
        "users": [],
        "reports": [],
        "createdBy": {
            "id": 2,
            "cpf": "21745651020",
            "name": "Maria da Silva",
            "profile": {
                "id": 2,
                "description": "Triagem"
            }
        }
    },
    {
        "id": 3,
        "name": "Processo 3",
        "description": "Processo de teste 3, status Aguardando Report",
        "status": "Aguardando parecer",
        "expectedReportDate": "20/06/2021 10:00",
        "users": [],
        "reports": [],
        "createdBy": {
            "id": 2,
            "cpf": "21745651020",
            "name": "Maria da Silva",
            "profile": {
                "id": 2,
                "description": "Triagem"
            }
        }
    },
    {
        "id": 4,
        "name": "Processo 4",
        "description": "Processo de teste 4, status Executado",
        "status": "Sucesso",
        "expectedReportDate": "17/06/2021 12:00",
        "users": [
            {
                "id": 3,
                "cpf": "06698638072",
                "name": "José Pereira",
                "profile": {
                    "id": 3,
                    "description": "Operador"
                }
            },
            {
                "id": 1,
                "cpf": "11094463655",
                "name": "Igor Gonçalves Ribeiro Silva",
                "profile": {
                    "id": 1,
                    "description": "Administrador"
                }
            }
        ],
        "reports": [
            {
                "id": 1,
                "description": "Processo executado com sucesso.",
                "reportDate": "2021-06-19T15:27:48.236+00:00",
                "writer": {
                    "id": 3,
                    "cpf": "06698638072",
                    "name": "José Pereira",
                    "profile": {
                        "id": 3,
                        "description": "Operador"
                    }
                }
            }
        ],
        "createdBy": {
            "id": 2,
            "cpf": "21745651020",
            "name": "Maria da Silva",
            "profile": {
                "id": 2,
                "description": "Triagem"
            }
        }
    },
    {
        "id": 5,
        "name": "Processo 5",
        "description": "Processo de teste 5, status Insucesso",
        "status": "Insucesso",
        "expectedReportDate": "17/06/2021 12:00",
        "users": [
            {
                "id": 3,
                "cpf": "06698638072",
                "name": "José Pereira",
                "profile": {
                    "id": 3,
                    "description": "Operador"
                }
            }
        ],
        "reports": [
            {
                "id": 2,
                "description": "Processo não foi executado com sucesso.",
                "reportDate": "2021-06-19T15:27:48.236+00:00",
                "writer": {
                    "id": 3,
                    "cpf": "06698638072",
                    "name": "José Pereira",
                    "profile": {
                        "id": 3,
                        "description": "Operador"
                    }
                }
            }
        ],
        "createdBy": {
            "id": 2,
            "cpf": "21745651020",
            "name": "Maria da Silva",
            "profile": {
                "id": 2,
                "description": "Triagem"
            }
        }
    },
    {
        "id": 6,
        "name": "Processo 6",
        "description": "Processo de teste 6, status Cancelado",
        "status": "Cancelado",
        "expectedReportDate": "17/06/2021 12:00",
        "users": [
            {
                "id": 3,
                "cpf": "06698638072",
                "name": "José Pereira",
                "profile": {
                    "id": 3,
                    "description": "Operador"
                }
            }
        ],
        "reports": [
            {
                "id": 3,
                "description": "Processo cancelado por falta de insumos.",
                "reportDate": "2021-06-19T15:27:48.236+00:00",
                "writer": {
                    "id": 3,
                    "cpf": "06698638072",
                    "name": "José Pereira",
                    "profile": {
                        "id": 3,
                        "description": "Operador"
                    }
                }
            }
        ],
        "createdBy": {
            "id": 2,
            "cpf": "21745651020",
            "name": "Maria da Silva",
            "profile": {
                "id": 2,
                "description": "Triagem"
            }
        }
    }
]
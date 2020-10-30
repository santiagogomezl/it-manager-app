
const STORE = [
    [
        {
            id: 1,
            firstName: 'Santiago',
            lastName: 'Gomez',
            email: 'sgomez@company.com',
            tradeId: 7,
            roleId: 6,
            workstationId: 1
        },
        {
            id: 2,
            firstName: 'Bob',
            lastName: 'Selba',
            email: 'bselba@company.com',
            tradeId: 7,
            roleId: 5,
            workstationId: 2
        },
        {
            id: 3,
            firstName: 'Vanessa',
            lastName: 'Roman',
            email: 'veroman@company.com',
            tradeId: 1,
            roleId: 5,
            workstationId: 3,
        },
        {
            id: 4,
            firstName: 'Bret',
            lastName: 'Chandler',
            email: 'bchandler@company.com',
            tradeId: 2,
            roleId: 4,
            workstationId: 4,
        },
        {
            id: 5,
            firstName: 'Patricia',
            lastName: 'DeSilva',
            email: 'pdesilva@company.com',
            tradeId: 3,
            roleId: 3,
            workstationId: 5
        },
        {
            id: 6,
            firstName: 'Matt',
            lastName: 'Chan',
            email: 'mchan@company.com',
            tradeId: 4,
            roleId: 1,
            workstationId: 6
        },
        {
            id: 7,
            firstName: 'James',
            lastName: 'Smith',
            email: 'jsmith@company.com',
            tradeId: 5,
            roleId: 5,
            workstationId: 7
        },
        {
            id: 8,
            firstName: 'Eddie',
            lastName: 'Nunez',
            email: 'enunez@company.com',
            tradeId: 6,
            roleId: 2,
            workstationId: 8
        },
        {
            id: 9,
            firstName: 'Isabel',
            lastName: 'Sanchez',
            email: 'isanchez@company.com',
            tradeId: 1,
            roleId: 5,
            workstationId: 9
        },
        {
            id: 10,
            firstName: 'David',
            lastName: 'Combs',
            email: 'dcombs@company.com',
            tradeId: 8,
            roleId: 6,
            workstationId: 10
        }
    ],
    [
        {
            id:1,
            name: 'Paint'
        },
        {
            id:2,
            name: 'Drywall'
        },
        {
            id:3,
            name: 'Ceiling'
        },
        {
            id:4,
            name: 'T-Bar'
        },
        {
            id:5,
            name: 'Specialties'
        },
        {
            id:6,
            name: 'Accounting'
        },
        {
            id:7,
            name: 'IT'
        },
        {
            id:8,
            name: 'Executive'
        }
    ],
    [
        {
            id:1,
            title:'Foreman'
        },
        {
            id:2,
            title: 'Lead Foreman'
        },
        {
            id:3,
            title:'Estimator'
        },
        {
            id:4,
            title: 'Project Engineer'
        },
        {
            id:5,
            title:'Assistant'
        },
        {
            id:6,
            title: 'Administrator'
        }
    ],
    [
        {
            id: 1,
            hostName: 'HQ-PC-01',
            os:'Windows 10',
            version: 10.1904,
            memory: 16,
            freeSpace: 42,
            hotfixId:[
                'KB01',
                'KB02',
                'KB03'
            ],
            hotfixInfo:[
                'Security Update',
                'Update',
                'Memory Upgrade'
            ],
            hotfixDate:[
                '0.0.0',
                '0.0.0',
                '0.0.0'
            ]
        },
        {
            id: 2,
            hostName: 'HQ-PC-02',
            os:'Windows 10',
            version: 10.1890,
            memory: 16,
            freeSpace: 120,
            hotfixId:[
                'KB04',
            ],
            hotfixInfo:[
                'Security Update',
            ],
            hotfixDate:[
                '0.0.0',
            ]
        },
        {
            id: 3,
            hostName: 'HQ-LTP-01',
            os:'Windows 7',
            version: 7.1204,
            memory: 8,
            freeSpace: 80,
            hotfixId:[
                'KB05',
                'KB06',
            ],
            hotfixInfo:[
                'Antivirus Update',
                'Graphic Card Driver Update',
            ],
            hotfixDate:[
                '0.0.0',
                '0.0.0'
            ]
        },
        {
            id: 4,
            hostName: 'HQ-LTP-02',
            os:'Windows 10',
            version: 10.1904,
            memory: 16,
            freeSpace: 210,
            hotfixId:[
                'KB07',
            ],
            hotfixInfo:[
                'Microsoft Office Update',
            ],
            hotfixDate:[
                '0.0.0',
            ]
        },
        {
            id: 5,
            hostName: 'HQ-LTP-03',
            os:'Windows 10',
            version: 10.1904,
            memory: 16,
            freeSpace: 120,
            hotfixId:[
               
            ],
            hotfixInfo:[

            ],
            hotfixDate:[
                
            ]
        },
        {
            id: 6,
            hostName: 'HQ-LTP-04',
            os:'Windows 10',
            version: 10.1890,
            memory: 8,
            freeSpace: 180,
            hotfixId:[
                'KB08',
                'KB09',
            ],
            hotfixInfo:[
                'Security Update',
                'Printer Driver Update'
            ],
            hotfixDate:[
                '0.0.0',
                '0.0.0'
            ]
        },
        {
            id: 7,
            hostName: 'HQ-PC-03',
            os:'Windows 10',
            version: 10.1904,
            memory: 32,
            freeSpace: 120,
            hotfixId:[
                'KB10',
            ],
            hotfixInfo:[
                'Security Update',
            ],
            hotfixDate:[
                '0.0.0',
            ]
        },
        {
            id: 8,
            hostName: 'HQ-PC-04',
            os:'Windows 10',
            version: 10.1904,
            memory: 16,
            freeSpace: 42,
            hotfixId:[
                'KB11',
                'KB12',
                'KB13'
            ],
            hotfixInfo:[
                'Security Update',
                'Update',
                'Memory Upgrade'
            ],
            hotfixDate:[
                '0.0.0',
                '0.0.0',
                '0.0.0'
            ]
        },
        {
            id: 9,
            hostName: 'HQ-LTP-05',
            os:'Windows 10',
            version: 10.1904,
            memory: 16,
            freeSpace: 42,
            hotfixId:[
                'KB14',
                'KB15',
                'KB16'
            ],
            hotfixInfo:[
                'Security Update',
                'Update',
                'Memory Upgrade'
            ],
            hotfixDate:[
                '0.0.0',
                '0.0.0',
                '0.0.0'
            ]
        },
        {
            id: 10,
            hostName: 'HQ-LTP-06',
            os:'Windows 10',
            version: 10.1904,
            memory: 16,
            freeSpace: 42,
            hotfixId:[
                'KB01',
                'KB02',
                'KB03'
            ],
            hotfixInfo:[
                'Security Update',
                'Update',
                'Memory Upgrade'
            ],
            hotfixDate:[
                '0.0.0',
                '0.0.0',
                '0.0.0'
            ]
        }
    ],
    [
        {
            id:1,
            userId:1,
            taskDetails: 'Upgrade OS',
            statusCode:1,
            dueDate: '2020-11-05'
        },
        {
            id:2,
            userId:1,
            taskDetails: 'Install Printer',
            statusCode:2,
            dueDate: '2020-11-05'
        },
        {
            id:3,
            userId:4,
            taskDetails: 'Upgrade License',
            statusCode:2,
            dueDate: '2020-11-05'
        }
    ]
    
]

export default STORE
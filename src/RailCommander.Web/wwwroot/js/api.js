"use strict";


export default {
    loadLayoutAsync: async () => {
        return {
            blocks: [
                {
                    id: 1,
                    sections: [
                        {
                            type: 'straight',
                            x: 1,
                            y: 1
                        }, {
                            type: 'straight',
                            x: 2,
                            y: 1
                        }, {
                            type: 'curve-right',
                            x: 3,
                            y: 1
                        }, {
                            type: 'curve-left',
                            x: 4,
                            y: 2,
                            angle: 270
                        }, {
                            type: 'turnout-left',
                            x: 4,
                            y: 3,
                            angle: 270
                        }, {
                            type: 'turnout-right',
                            x: 4,
                            y: 4,
                            angle: 90
                        }, {
                            type: 'straight',
                            x: 3,
                            y: 5,
                            angle: 135
                        }
                    ]
                }
            ]
        }
    }
}
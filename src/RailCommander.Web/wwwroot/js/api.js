"use strict";


export default {
    loadLayoutAsync: async () => {
        
        var data = await fetch("/api/layout");
        var layout = await data.json();

        function handleSectionClick() {
            if (this.type == 'turnout-left' || this.type == 'turnout-right') {
                this.position = this.position == 'normal' ? 'reverse' : 'normal';
            }
        }

        layout.blocks.forEach(b => {
            b.sections.forEach(s => {
                s.clicked = handleSectionClick;
            })
        });

        return layout;
    }
}
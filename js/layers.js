 addLayer("s", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                    // You can add more variables here to add them to your layer.
            points: new Decimal(1),             // "points" is the internal name for the main resource of the layer.
        }},

        name: "shenanigans",
        color: "#420420",                       // The color for this layer, which affects many elements
        resource: "shenanigans",            // The name of this layer's main prestige resource
        row: 0,                                 // The row this layer is on (0 is the first row)

        baseResource: "shenanigans",                 // The name of the resource your prestige gain is based on
        baseAmount() {return player.points},    // A function to return the current value of that resource

        requires: new Decimal(1),            // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
        
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.5,                          // "normal" prestige gain is (currency^exponent)

        gainMult() {                            // Returns your multiplier to your gain of the prestige resource
            let mult = new Decimal(1);
            return mult
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return true},             // Returns a bool for if this layer's node should be visible in the tree.


    upgrades: {
        rows: 1,
        cols: 2,
        11: {
            title: "Every 60 seconds in real life a minute passes.",
            description: "Boosts your plot gain by ALOT.",
            cost: new Decimal(1),
        },
        12: {
            title: "Vibing.",
            description: "Boosts your plot gain by unspent shenanigans.",
            cost: new Decimal(10),
            unlocked() { 
                return (hasUpgrade("s", 11) || hasUpgrade([this.layer], 11));
            },
            effect() {
                let ret = player[this.layer].points.add(1).root(2);
                return ret;
            },
            effectDisplay() {
                return format(this.effect())+"x";
            }
        },
})

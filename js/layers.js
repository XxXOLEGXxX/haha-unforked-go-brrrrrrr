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
            return new Decimal(1)               // Factor in any bonuses multiplying gain here
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return true},             // Returns a bool for if this layer's node should be visible in the tree.


    upgrades: {
        rows: 1,
        cols: 1,
        11: {
            title: "Every 60 seconds in real life a minute passes.",
            description: "Speeds up your unknown plot energy gain.",
            cost: new Decimal(1),
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(11)?1.1:(player[this.layer].upgrades.includes(11)?0.75:0.5)) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
    },
})

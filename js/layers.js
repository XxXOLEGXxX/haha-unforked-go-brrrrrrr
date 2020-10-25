 addLayer("s", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                    // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
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

        tabFormat: {
            "Shenanigans": {
                buttonStyle() {return  {'color': 'white'}},
                content:
                    ["main-display",
                    "prestige-button",
                    ["blank", "5px"], // Height
                    "upgrades", "milestones"],
	    },
            "Impatience": {
                buttonStyle() {return  {'border-color': 'red', 'color': 'red'}},
                content:
                    ["main-display",
                    ["blank", "5px"], // Height
                    "buyables"],
	    },
	},

    upgrades: {
        rows: 3,
        cols: 3,
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
                return hasUpgrade([this.layer], 11);
            },
            effect() {
                let ret = player[this.layer].points.add(1).root(2);
                if (hasUpgrade("s", 21)) ret = ret.pow(upgradeEffect("s", 21))
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23))
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31))
                return ret;
            },
            effectDisplay() {
                return format(this.effect())+"x";
            },
        },
        21: {
            title: "Tiny desk exponent.",
            description: "Adds ^1.01 to the previous upgrade.",
            cost: new Decimal(20),
            unlocked() { 
                return hasUpgrade([this.layer], 12);
            },
            effect() {
                let ret = new Decimal(1.01)
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23))
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31))
                return ret;
            },
            effectDisplay() {
                return format(this.effect());
            },
        },
        22: {
            title: "Supreme Hexagonity.",
            description: "Unlocks a bunch of things and buffs 6th upgrade.",
            cost: new Decimal(999),
            unlocked() { 
                return hasUpgrade([this.layer], 21);
            },
        },
        23: {
            title: "Another exponent...?",
            description: "Adds another ^1.01 to both ''Tiny desk exponent'' and ''Exponent'' upgrades.",
            cost: new Decimal(100),
            unlocked() { 
                return hasUpgrade([this.layer], 21);
            },
            effect() {
                let ret = new Decimal(1.01)
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31))
                return ret;
            },
            effectDisplay() {
                return format(this.effect());
            },
        },
        31: {
            title: "But enough grinding, have at you!",
            description: "Exponents all the upgrades (excluding the first) based on unspent points.",
            cost: new Decimal(250),
            unlocked() { 
                return hasUpgrade([this.layer], 23);
            },
            effect() {
                let rero = 64
                if (hasUpgrade("s", 23)) rero = rero.div(2)
                let ret = player.points.add(1).root(rero);
                if (hasUpgrade("s", 32)) ret = ret.tetrate(upgradeEffect("s", 32))
                return ret;
            },
        },
        32: {
            title: "Tetrate-inator.",
            description: "Tetrates the upgrade left to it by 1.420.",
            cost: new Decimal(400),
            unlocked() { 
                return hasUpgrade([this.layer], 23);
	    },
            effect() {
                let ret = new Decimal(1.42)
                return ret;
            },
        },
    },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "Boredom.",
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() { return player[this.layer].unlocked },
            buy() {
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
	    },
            effect() {
	        let eff = player[this.layer].buyables[this.id].mul(0.01).add(1)
	        return eff;
	    },
	    display() { // Everything else displayed in the buyable button after the title
                    let ret = {}
		    return "Amount " + player[this.layer].buyables[this.id] + "\n\
		    Cost: Boosts the finished work's effect.\n\
		    Knowing that you're being forced to grind the plots, you're getting more bored and it somehow magically boosts your plot gain by " + buyableEffect([this.layer], [this.id]) + "x times."
	    },
	},
    },
	hotkeys: [
		{ key: "s", desc: "S: Reset for shenanigans", onPress() { doReset(this.layer) } },
	],
})

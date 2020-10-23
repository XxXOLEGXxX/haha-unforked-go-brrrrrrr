addLayer("apt", {
        name: "anti-planck time", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "APT", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#424242",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "anti-planck times", // Name of prestige currency
        baseResource: "mysterious shits", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "t", description: "Reset for anti-planck times", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
   upgrades: {
        rows: 1
        cols: 1
        11: {
            title: "Time Acceleration.",
            description: "Increases your anti-planck time generation exponentially, based on your anti-planck times.",
            effect(): mult = new Decimal(1^1,1)
        }
        etc
    }
})

addLayer("apl", {
        name: "anti-planck length", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "APL", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#F4F2F0",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "anti-planck lengths", // Name of prestige currency
        baseResource: "mysterious shits 2", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "l", description: "Reset for anti-planck lengths", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
})

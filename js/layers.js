addLayer("s", {
        startData() { return {
            unlocked: true,
            points: new Decimal(0),
            upgradeTime: new Decimal(0),
        };},

        name: "shenanigans",
        color: "#420420",
        resource: "shenanigans",
        row: 0,

        baseResource: "shenanigans",
        baseAmount() {return player.points;},

        requires: new Decimal(1),
        type: "normal",
        exponent: 0.5,

        gainMult() {
            let mult = new Decimal(1);
            return mult;
        },
        gainExp() {
            return new Decimal(1);
        },

        update(diff){
            if(hasUpgrade(this.layer, 13) && upgradeEffect(this.layer, 13) > new Decimal(1)) player[this.layer].upgradeTime = player[this.layer].upgradeTime.add(diff)
            if(player[this.layer].upgradeTime > new Decimal(60)) player[this.layer].upgradeTime = new Decimal(60)
	},

        layerShown() {return true;},

        tabFormat: {
            "Shenanigans": {
                buttonStyle() {return  {'color': 'white'};},
                content:
                    ["main-display",
                    "prestige-button",
                    ["blank", "5px"], // Height
                    "upgrades", "milestones", "clickables"],
        },
            "Impatience": {
                buttonStyle() {return  {'border-color': 'red', 'color': 'red'};},
                content:
                    ["main-display",
                    ["blank", "5px"], // Height
                    "buyables"],
        },
    },

    upgrades: {
        rows: 3,
        cols: 4,
        11: {
            title: "Every 60 seconds in real life a minute passes.",
            description: "Boosts your plot gain by ALOT.",
            cost: new Decimal(1),
        },
        12: {
            title: "Vibing.",
            description: "Boosts your plot gain by unspent shenanigans.",
            cost: new Decimal(10),
            unlocked(){ 
                return hasUpgrade([this.layer], 11);
            },
            effect() {
                let ret = player[this.layer].points.add(1).root(2);
                if (hasUpgrade("s", 21)) ret = ret.pow(upgradeEffect("s", 21));
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                return ret;
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
        },
        13: {
            title: "Degrading Upgrade.",
            description: "Boosts your plot gain by 5x and decreases linearly (caps at 1x).",
            cost: new Decimal(1200),
            unlocked(){ 
                return hasUpgrade([this.layer], 22);
            },
            effect() {
            return new Decimal(5).sub(player[this.layer].upgradeTime.div(15));
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
        },
        14: {
            title: "wip.",
            description: "wip.",
            cost: new Decimal(1800),
            unlocked(){ 
                return hasUpgrade([this.layer], 22);
            },
        },
        21: {
            title: "Tiny desk exponent.",
            description: "Adds ^1.01 to the previous upgrade.",
            cost: new Decimal(20),
            unlocked(){ 
                return hasUpgrade([this.layer], 12);
            },
            effect() {
                let ret = new Decimal(1.01);
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
            },
        },
        22: {
            title: "Supreme Hexagonity.",
            description: "Unlocks a bunch of things and buffs 6th upgrade.",
            cost: new Decimal(999),
            unlocked(){ 
                return hasUpgrade([this.layer], 21);
            },
        },
        23: {
            title: "Another exponent...?",
            description: "Adds another ^1.01 to both ''Tiny desk exponent'' and ''Exponent'' upgrades.",
            cost: new Decimal(100),
            unlocked(){ 
                return hasUpgrade([this.layer], 21);
            },
            effect() {
                let ret = new Decimal(1.01);
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
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
                let ret = {};
                if (hasUpgrade("s", 22)) ret = player.points.add(1).root(32);
        else ret = player.points.add(1).root(64);
                if (hasUpgrade("s", 32)) ret = ret.tetrate(upgradeEffect("s", 32));
                return ret;
            },
        },
        32: {
            title: "Tetrate-inator.",
            description: "Tetrates the upgrade left to it by 1.420.",
            cost: new Decimal(400),
            unlocked(){ 
                return hasUpgrade([this.layer], 23);
        },
            effect() {
                let ret = new Decimal(1.42);
                return ret;
            },
            effectDisplay() {
                return "^^1.42";
            },
        },
        33: {
            title: "wip.",
            description: "wip.",
            cost: new Decimal(1e9001),
            unlocked(){ 
                return hasUpgrade([this.layer], 22);
            },
        },
        34: {
            title: "wip.",
            description: "wip.",
            cost: new Decimal(1e9001),
            unlocked(){ 
                return hasUpgrade([this.layer], 22);
            },
        },
    },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "Boredom.",
            unlocked(){ return player[this.layer].unlocked; }, 
            canAfford() { return player[this.layer].unlocked; },
            buy() {
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
        },
            effect() {
            let eff = player[this.layer].buyables[this.id].mul(0.01).add(1);
            return eff;
        },
        display() { // Everything else displayed in the buyable button after the title
                    let ret = {};
            return "Amount: " + player[this.layer].buyables[this.id] + "\n\ Knowing that you're being forced to grind the plots, you're getting more bored and it somehow magically boosts your plot gain by " + buyableEffect([this.layer], [this.id]) + "x times.";
	    },
	},
    },
clickables: {
        rows: 1,
        cols: 1,
        masterButtonPress() {
        if (player[this.layer].upgradeTime < new Decimal(60));
        if (player[this.layer].upgradeTime = new Decimal(60)) return player[this.layer].upgradeTime = new Decimal(0);
        },
        masterButtonText() {
        if (player[this.layer].upgradeTime < new Decimal(60)) return "Wait for " + Math.round(new Decimal(60).sub(player[this.layer].upgradeTime)) " more second(s).";
        if (player[this.layer].upgradeTime = new Decimal(60)) return "Press me!";
	},// **optional** text to display on the Master Button
        showMasterButton() {
        return hasUpgrade([this.layer], 14);
        },
    },
	hotkeys: [
		{ key: "s", desc: "S: Reset for shenanigans", onPress() { doReset(this.layer); } },
	],
});

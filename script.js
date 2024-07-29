class Smoothie {
    constructor(name, size, base, ingredients) {
        this.name = name;
        this.size = size;
        this.base = base;
        this.ingredients = ingredients;
        this.prices = {
            small: 5,
            medium: 7,
            large: 9,
            milk: 1,
            yogurt: 1.5,
            juice: 2,
            water: 0.5,
            almond_milk: 1.5,
            banana: 0.5,
            strawberry: 0.75,
            blueberry: 1,
            spinach: 0.5,
            mango: 1,
            pineapple: 1,
            kale: 0.75
        };
    }

    getTotalPrice() {
        let total = this.prices[this.size] + this.prices[this.base];
        for (const [ingredient, quantity] of Object.entries(this.ingredients)) {
            total += this.prices[ingredient] * quantity;
        }
        return total;
    }

    getDescription() {
        const ingredientList = Object.entries(this.ingredients)
            .filter(([_, quantity]) => quantity > 0)
            .map(([ingredient, quantity]) => `${quantity} ${ingredient}`)
            .join(', ');

        return `${this.name} ordered a ${this.size} smoothie with ${this.base} base and the following ingredients: ${ingredientList}. Total price: $${this.getTotalPrice().toFixed(2)}`;
    }
}

function updateTotal() {
    const size = document.getElementById('size').value;
    const base = document.getElementById('base').value;
    const ingredients = {
        banana: parseInt(document.getElementById('banana').value),
        strawberry: parseInt(document.getElementById('strawberry').value),
        blueberry: parseInt(document.getElementById('blueberry').value),
        spinach: parseInt(document.getElementById('spinach').value),
        mango: parseInt(document.getElementById('mango').value),
        pineapple: parseInt(document.getElementById('pineapple').value),
        kale: parseInt(document.getElementById('kale').value)
    };

    const smoothie = new Smoothie('', size, base, ingredients);
    document.getElementById('totalPrice').innerText = `Total Price: $${smoothie.getTotalPrice().toFixed(2)}`;
}

function selectPremade() {
    const premade = document.getElementById('premade').value;
    const premadeOptions = {
        tropical: { banana: 1, strawberry: 1, mango: 1, pineapple: 1, spinach: 0 },
        berry: { banana: 0, strawberry: 2, blueberry: 2, mango: 0, pineapple: 0, spinach: 0 },
        green: { banana: 1, strawberry: 0, blueberry: 0, mango: 0, pineapple: 0, spinach: 2, kale: 1 }
    };

    if (premadeOptions[premade]) {
        for (const [ingredient, quantity] of Object.entries(premadeOptions[premade])) {
            document.getElementById(ingredient).value = quantity;
        }
    } else {
        document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
    }

    updateTotal();
}

function orderSmoothie() {
    const name = document.getElementById('name').value;
    const size = document.getElementById('size').value;
    const base = document.getElementById('base').value;
    const ingredients = {
        banana: parseInt(document.getElementById('banana').value),
        strawberry: parseInt(document.getElementById('strawberry').value),
        blueberry: parseInt(document.getElementById('blueberry').value),
        spinach: parseInt(document.getElementById('spinach').value),
        mango: parseInt(document.getElementById('mango').value),
        pineapple: parseInt(document.getElementById('pineapple').value),
        kale: parseInt(document.getElementById('kale').value)
    };

    const smoothie = new Smoothie(name, size, base, ingredients);
    document.getElementById('orderSummary').innerText = smoothie.getDescription();
}
